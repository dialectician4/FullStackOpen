const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

const password = process.argv[2];

const url =
	`mongodb+srv://edwinsantoskov:${password}@cluster0.56ahvld.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const contactSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", contactSchema);

if (process.argv.length == 5) {
	const contact = new Person({
		name: process.argv[3],
		number: process.argv[4],
	});
	contact.save().then((result) => {
		console.log(
			`Added ${result.name} number ${result.number} to phonebook`,
		);
		mongoose.connection.close();
	});
} else if (process.argv.length == 3) {
	Person.find({}).then((results) => {
		console.log("phonebook:");
		results.forEach((contact) =>
			console.log(`${contact.name} ${contact.number}`)
		);
		mongoose.connection.close();
	});
} else {
	console.log(
		"Please include either only password or password, name, and number as args",
	);
	mongoose.connection.close();
}
