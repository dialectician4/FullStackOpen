import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  const handleNameChange = (event) => (setNewName(event.target.value));
  const handleNumberChange = (event) => (setNewNumber(event.target.value));
  const handleSearchChange = (event) => (setSearch(event.target.value));

  const AddPerson = (event) => {
    event.preventDefault();
    const dupicate_name = persons.map((person) => person.name).includes(newName);
    if (dupicate_name) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat([{ name: newName, number: newNumber }]));
      setNewName("");
      setNewNumber("");
      //console.log("event contents", newName);
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
