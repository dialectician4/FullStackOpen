import { useState, useEffect } from 'react'
import entryservice from './services/requests'

//import axios from 'axios'
//const api_url = "http://localhost:3001/persons";

const PersonEntry = ({ name, number, delete_handler }) => (<div>{name} {number}<button onClick={delete_handler}>delete</button></div>);
const DisplayPersons = ({ persons, search_filter, delete_handler }) => {
  return (
    <div>
      {persons
        .filter((person) => person.name.toUpperCase().includes(search_filter.toUpperCase()))
        .map((person) => {
          //return <PersonEntry key={person.name} name={person.name} number={person.number} id={person.id} />
          return <PersonEntry key={person.name} delete_handler={() => delete_handler({ ...person })} {...person} />
        })}
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

const SuccessNotification = ({message}) => {
  if (message === null) {
    return null
  }
  const successStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontsize: 20,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={successStyle}>
      {message}
    </div>
  )
}

const ErrorNotification = ({message}) => {
  if (message === null) {
    return null
  }
  const successStyle = {
    color: 'red',
    fontStyle: 'italic',
    fontsize: 20,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={successStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const get_persons = () => {
    entryservice.get_entries()
      .then(init_results => setPersons(init_results))
    //.then(_ => console.log("page initialization successful"))
  }
  useEffect(get_persons, []);


  const handleNameChange = (event) => (setNewName(event.target.value));
  const handleNumberChange = (event) => (setNewNumber(event.target.value));
  const handleSearchChange = (event) => (setSearch(event.target.value));
  const handleDelete = ({ id, name }) => {
    if (confirm(`Delete ${name}?`)) {
      entryservice
        .delete_entry(id)
        .then(_ => get_persons());
    };
  };

  const AddPerson = (event) => {
    event.preventDefault();
    const dupicate_name = persons.map((person) => person.name).includes(newName);
    if (dupicate_name) {
      if (confirm(`${newName} is already added to phonebook, replace old number with new number?`)) {
        const current_person = persons.filter(person => person.name === newName)[0];
        const updated_person = { ...current_person, number: newNumber };
        const update_id = updated_person.id;
        entryservice
          .update_entry(update_id, updated_person)
          .then(update_return => setPersons(persons.map(person => person.id === update_id ? update_return : person)))
          .then(_ => {
            setSuccessMessage(`Number for ${current_person.name} has been updated!`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`Could not locate entry for ${current_person.name} to update on server.`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000)
          })
      }
    } else {
      const new_person = { name: newName, number: newNumber };
      //console.log("new person", new_person);
      entryservice
        .create_entry(new_person)
        .then(response => {
          setPersons(persons.concat(response));
          setNewName("");
          setNewNumber("");
        })
        .then(_ => {
          setSuccessMessage(`Added ${newName}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((e) => {
          alert(`Error adding ${new_person.name} to address book: ${e}`)
        }
        );
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
      <h2>Search Filter</h2>
      <SearchFilter search_input={search} handle_search={handleSearchChange} />
      <h2>Add a New Entry</h2>
      <form onSubmit={AddPerson}>
        <InputBox text={'name'} state_val={newName} on_change={handleNameChange} />
        <InputBox text={'number'} state_val={newNumber} on_change={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} search_filter={search} delete_handler={handleDelete} />
    </div>
  )
}

export default App
