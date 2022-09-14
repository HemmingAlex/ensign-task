import "./App.css";
import React, { useState } from "react";
import Axios from "axios";

function App() {
  const [addContact, setAddContact] = useState({
    salutation: "",
    foreName: "",
    surname: "",
    telephone: 0,
  });

  const [contacts, setContacts] = useState([]);

  const handleChange = (e, field, identity) => {
    if (identity) {
      let store = contacts.map((data, ind) => {
        if (data.id === identity)
          return (data = { ...data, [field]: e.target.value });
        else return (data = data);
      });
      setContacts(store);
    } else {
      let addStore = addContact;
      addStore = { ...addStore, [field]: e.target.value };
      setAddContact(addStore);
    }
  };

  const handleUpdate = (id, e) => {
    e.preventDefault();
    let edit;
    contacts.map((data) => {
      if (data.id === id) {
        edit = data;
      }
    });
    Axios.put(`https://localhost:7075/api/Contacts/${id}`, edit)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const handleDelete = (id) => {
    Axios.delete(`https://localhost:7075/api/Contacts/${id}`)
      .then(function (response) {
        // handle success
        console.log(response);
        deleted = deleted +1
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
let deleted = 0;
  const submitHandler = (e) => {
    e.preventDefault();
    Axios.post("https://localhost:7075/api/Contacts", addContact)
      .then(function (response) {
        // handle success
        console.log(response);
        setContacts([...contacts, response]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        alert(error)
      })
      .then(function () {
        // always executed, normally for redux things
      });
  };

  React.useEffect(() => {
    Axios.get("https://localhost:7075/api/Contacts")
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed, normally for redux things
      });
  }, [deleted]);

  return (
    <div className="App">
      <header className="App-header">
        Contacts:
        {contacts.map((input, index) => (
          <div>
            <form className="text-blue-600">
              <label>
                salutation:
                <input
                  className="ml-3"
                  type="text"
                  name="salutation"
                  value={contacts[index].salutation}
                  onChange={(e) => handleChange(e, "salutation", input.id)}
                />
                <button
                  className=" bg-green-500 p-3 rounded m-4"
                  onClick={(e) => handleUpdate(input.id, e)}
                >
                  Edit Field
                </button>
              </label>
              <br />
              <label>
                foreName:
                <input
                  className="ml-3"
                  type="text"
                  name="foreName"
                  value={contacts[index].foreName}
                  onChange={(e) => handleChange(e, "foreName", input.id)}
                />
                <button
                  className=" bg-green-500 p-3 rounded m-4"
                  onClick={(e) => handleUpdate(input.id, e)}
                >
                  Edit Field
                </button>
              </label>
              <br />
              <label>
                surname:
                <input
                  className="ml-3"
                  type="text"
                  name="surname"
                  value={contacts[index].surname}
                  onChange={(e) => handleChange(e, "surname", input.id)}
                />
                <button
                  className=" bg-green-500 p-3 rounded m-4"
                  onClick={(e) => handleUpdate(input.id, e)}
                >
                  Edit Field
                </button>
              </label>
              <br />
              <label>
                telephone:
                <input
                  className="ml-3"
                  type="number"
                  name="telephone"
                  value={contacts[index].telephone}
                  onChange={(e) => handleChange(e, "telephone", input.id)}
                />
                <button
                  className=" bg-green-500 p-3 rounded m-4"
                  onClick={(e) => handleUpdate(input.id, e)}
                >
                  Edit Field
                </button>
              </label>
              <br />
            </form>
            <button
              className=" bg-green-500 p-3 rounded m-4"
              onClick={() => handleDelete(input.id)}
            >
              Delete Contact
            </button>
          </div>
        ))}
        Add another conatct.
        <form onSubmit={submitHandler} className="text-blue-600">
          <label>
            salutation:
            <input
              className="m-4"
              type="text"
              name="salutation"
              value={addContact.salutation}
              onChange={(e) => handleChange(e, "salutation", null)}
            />
          </label>
          <br />
          <label>
            foreName:
            <input
              className="m-4"
              type="text"
              name="foreName"
              value={addContact.foreName}
              onChange={(e) => handleChange(e, "foreName", null)}
            />
          </label>
          <br />
          <label>
            surname:
            <input
              className="m-4"
              type="text"
              name="surname"
              value={addContact.surname}
              onChange={(e) => handleChange(e, "surname", null)}
            />
          </label>
          <br />
          <label>
            telephone:
            <input
              className="m-4"
              type="number"
              name="telephone"
              value={addContact.telephone}
              onChange={(e) => handleChange(e, "telephone", null)}
            />
          </label>
          <br />
          <input className="ml-3 mb-8" type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default App;
