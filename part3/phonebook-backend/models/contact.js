const mongoose = require('mongoose');

// Mongo setup
//const password = process.argv[2];
//const url =
//`mongodb+srv://edwinsantoskov:${password}@cluster0.56ahvld.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;
const url = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);
mongoose.connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message));
const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});
contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Person = mongoose.model('Person', contactSchema);

module.exports = Person;
