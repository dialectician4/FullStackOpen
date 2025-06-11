require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const Person = require('./models/contact');

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

app.get("/info", (request, response) => {
	Person.find({}).then(db_results => {
		const ppl_ct = db_results.length;
		response.status(200).send(
			`<div>Phonebook has info for ${ppl_ct} people<br><br>${Date()}</div>`,
		);
	}).catch(e => response.status(400));
});

app.get("/api/persons", (request, response) => {
	Person.find({}).then(db_results => {
		response.json(db_results);
	}).catch(e => response.status(400));
});

app.post("/api/persons", (request, response) => {
	const body = request.body;
	if (!body.name || !body.number) {
		console.log("Failed request attempted", request.body);
		return response.status(400).json({
			error: "name or number missing from request",
		});
	}
	Person.find({ name: body.name }).then(db_results => {
		if (db_results.length === 0) {
			const newEntry = new Person({
				name: body.name,
				number: body.number,
			});
			newEntry.save()
				.then(savedEntry => response.json(savedEntry))
				.catch(e => {
					console.log(`Error saving entry: ${e}`);
					response.status(404).json({ error: e });
				}
				);
		} else {
			console.log('Existing note found with the same name, please call proper endpoint to update existing entry');
			response.status(404).json({ error: 'update request made to wrong endpoint' });
		}
	}).catch(e => response.status(400));
});

app.get("/api/persons/:id", (request, response) => {
	Person.findById(request.params.id).then(entry => {
		if (entry) {
			response.json(entry);
		} else {
			response.status(404).end();
		}
	}
	).catch(error => {
		console.log(error);
		response.status(400).send({ error: 'malformed id' });
	});
});

app.delete("/api/persons/:id", (request, response) => {
	Person.findByIdAndDelete(request.params.id)
		.then(result => response.status(204).end())
		.catch(error => {
			console.log(error);
			response.status(400).send({ error: 'malformed id' });
		});
});

app.put("/api/persons/:id", (request, response) => {
	const { name, number } = request.body;
	Person.findById(request.params.id).then(entry => {
		if (!entry) {
			return response.status(404).end()
		}
		entry.number = number;
		return entry.save().then(updatedEntry => response.json(updatedEntry))
	}).catch(error => {
		console.log(e);
		response.status(400).send({ error: 'malformed id' })
	})
})


const app_outer = express();
app_outer.use("/phonebook", app);

const PORT = process.env.PORT || 3001;
app_outer.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
