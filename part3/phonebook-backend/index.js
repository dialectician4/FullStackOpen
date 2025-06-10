const express = require("express");
const morgan = require("morgan");
const Person = require('./models/contact');

//const mongoose = require('mongoose');
//
//// Mongo setup
//const password = process.argv[2];
//const url =
//	`mongodb+srv://edwinsantoskov:${password}@cluster0.56ahvld.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;
//mongoose.set("strictQuery", false);
//mongoose.connect(url);
//const contactSchema = new mongoose.Schema({
//	name: String,
//	number: String,
//});
//contactSchema.set('toJSON', {
//	transform: (document, returnedObject) => {
//		returnedObject.id = returnedObject._id.toString()
//		delete returnedObject._id
//		delete returnedObject.__v
//	}
//})
//
//const Person = mongoose.model("Person", contactSchema);

// App setup
const app = express();
app.use(express.json());
app.use(express.static("dist"));

app.use(morgan("tiny", {
	skip: function(req, res) {
		return req.method === "POST";
	},
}));

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(
	":method :url :status :res[content-length] - :response-time ms :body",
	{
		skip: function(req, res) {
			return req.method !== "POST";
		},
	},
));

let people = [
	{
		"id": "1",
		"name": "Arto Hellas",
		"number": "040-123456",
	},
	{
		"id": "2",
		"name": "Ada Lovelace",
		"number": "39-44-5323523",
	},
	{
		"id": "3",
		"name": "Dan Abramov",
		"number": "12-43-234345",
	},
	{
		"id": "4",
		"name": "Mary Poppendieck",
		"number": "39-23-6423122",
	},
];

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
	Person.find({}).then(people => {
		response.json(people)
	})
	//response.json(people);
});

app.get("/info", (request, response) => {
	const ppl_ct = people.length;
	response.send(
		`<div>Phonebook has info for ${ppl_ct} people<br><br>${Date()}</div>`,
	);
});

app.get("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	const entry = people.find((entry) => entry.id === id);
	// console.log('return note ', note);
	if (entry) {
		response.json(entry);
	} else {
		response.status(404).end();
	}
});

app.delete("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	people = people.filter((note) => note.id !== id);
	response.status(204).end();
});

const generateId = () => {
	const maxId = people.length > 0
		? Math.max(...people.map((n) => Number(n.id)))
		: 0;
	return String(maxId + 1);
};

const generateRandId = (range) => {
	return Math.floor(Math.random() * range);
};
const getIdFrom1000 = (active_ids) => {
	const new_id = generateRandId(1000);
	if (!active_ids.includes(new_id)) {
		return new_id;
	}
	return getIdFrom1000(active_ids);
};

// TODO: Add new with POST/api/persons
app.post("/api/persons", (request, response) => {
	const body = request.body;
	if (!body.name || !body.number) {
		console.log("Failed request attempted", request.body);
		return response.status(400).json({
			error: "name or number missing from request",
		});
	}
	const existing_names = people.map((entry) => entry.name);
	if (existing_names.includes(body.name)) {
		return response.status(404).json({
			error: `name must be unique, ${body.name} already in phonebook`,
		});
	}
	const existing_ids = people.map((entry) => entry.id);
	const new_entry_id = getIdFrom1000(existing_ids);

	const new_entry = {
		name: body.name,
		number: body.number,
		id: new_entry_id,
	};
	people = people.concat(new_entry);

	response.json(new_entry);
});

// const app = http.createServer((request, response) => {
// 	response.writeHead(200, {'Context-Type': 'application/json'});
// 	response.end(JSON.stringify(people));
// });

const app_outer = express();
app_outer.use("/phonebook", app);

const PORT = process.env.PORT || 3001;
app_outer.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
// console.log(`Server running on port ${PORT}`);

// console.log('hello world');
