import { useEffect, useState } from "react";
import phoneService from './services/Phones'
import Message from "./Message";

const Filter = ({input, onChange}) => {
  return (
    <>
      filter shown with <input value={input}
        onChange= {onChange}/>    
    </>
  )
}

  const Persons = ({personsToShow, deleteNumber}) => {
    return (
      <ul>
        {personsToShow.map(person => <li key={person.id}>
        {person.name} {person.number}
          <button onClick={() => deleteNumber(person.id, person.name)}>Delete</button>
        </li>)}
      </ul>
    )
  }


const PersonForm =({addNumbers,newNumber,handleNewNumber,newName,handleNewName}) => {
  return (
      <form onSubmit={addNumbers}>
        <div>
          name: <input value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
          number:<input value={newNumber}
          onChange={handleNewNumber}
          /> 
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}


const App = () => {

  useEffect(() => {
    phoneService.getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
      })
  },[])

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState("")

const deleteNumber = (id,name) => {
  if(window.confirm(`Are you sure you want to delete ${name}?`)){
    phoneService
      .exterminate(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        })
  }
}

  const addNumbers = (event) => {
    event.preventDefault(); 
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const maybeNewPersons = persons.concat(newPerson)   
    const listOfNames = maybeNewPersons.map(person => person.name)
    const isDuplicate = listOfNames.some((item, index) => {
      return listOfNames.indexOf(item) !== index
    });

    if(isDuplicate) {
      if(window.confirm(`${newPerson.name} has already been added
      to the phonebook. Replace the old number with a new one?`)){
        const number = persons.find(p => p.name === newPerson.name)
        const numberID = number.id
        phoneService
          .update(numberID , newPerson)
          .then(returnedNumber => {
            setPersons(
            persons.map(person => 
            person.id !== numberID ? person : returnedNumber
            ))
            setMessage(`${returnedNumber.name} has been successfully updated`)
            setTimeout(()=> {
              setMessage('')
            },3000)
          })
          .catch(() => {
            setMessage(`${newPerson.name} has already been removed`)
            setTimeout(() => {
              setMessage('')
            },3000)
          })
      }
      else {
      setPersons(persons)
      alert(`${newName} has already been added to the phonebook!`)
      }
    }

    else {
      phoneService
        .create(newPerson)
        .then(returnedNumber => {
          setPersons(persons.concat(returnedNumber))
          setNewName('')
          setNewNumber('')
          setMessage(`${returnedNumber.name} has been successfully ADDED!`)
          setTimeout(() => {
            setMessage('')
          },3000)
        })
    }
  }


  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter === "" ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) 
  


  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message}/>
      <Filter input={newFilter} onChange={handleNewFilter}/> 
      <h2>add a new</h2>
      <PersonForm addNumbers={addNumbers} newNumber={newNumber} handleNewName={handleNewName} newName={newName} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deleteNumber={deleteNumber}/>
    </div>
  )
}

export default App;
