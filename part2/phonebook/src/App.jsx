import { useState, useEffect } from 'react'
import axios from 'axios'

const api_url = "http://localhost:3001/persons";

const PersonEntry = ({ name, number }) => (<div>{name} {number}</div>);
const DisplayPersons = ({ persons, search_filter }) => {
  return (
    <div>
      {persons
        .filter((person) => person.name.toUpperCase().includes(search_filter.toUpperCase()))
        .map((person) => <PersonEntry key={person.name} name={person.name} number={person.number} />)}
    </div>
  )
}

const InputBox = ({ text, state_val, on_change }) => (
  <div>
    {text}: <input
      value={state_val}
      onChange={on_change}
    />
  </div>
);


const SearchFilter = ({ search_input, handle_search }) => {
  return (
    <div>
      filter shown with<input
        value={search_input}
        onChange={handle_search} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  const get_init_state = () => {
  axios
    .get(api_url)
    .then( response => setPersons(response.data))
    .then(res => console.log("page initialization successful"))
  }
  useEffect(get_init_state, []);
  

  const handleNameChange = (event) => (setNewName(event.target.value));
  const handleNumberChange = (event) => (setNewNumber(event.target.value));
  const handleSearchChange = (event) => (setSearch(event.target.value));
  // axios.post(api_url, {cat: "mia", bat: "mia"}).then(res => console.log("response: ", res.data));

  const AddPerson = (event) => {
    event.preventDefault();
    const dupicate_name = persons.map((person) => person.name).includes(newName);
    if (dupicate_name) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const new_person = { name: newName, number: newNumber };
      console.log("new person", new_person);
      axios.post(api_url, new_person)
        .then( response => {
          setPersons(persons.concat(response.data));
      	  setNewName("");
      	  setNewNumber("");
	})
	// .catch(
	//   alert(`Error adding ${new_person.name} to address book`)
	// );
      // console.log("event contents", newName);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Search Filter</h2>
      <SearchFilter search_input={search} handle_search={handleSearchChange} />
      <h2>Add a New Entry</h2>
      <form onSubmit={AddPerson}>
        <InputBox text={'name'} state_val={newName} on_change={handleNameChange} />
        <InputBox text={'number'} state_val={newNumber} on_change={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
        <div>
          debug: name: {newName}, number: {newNumber}
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} search_filter={search} />
    </div>
  )
}

export default App
