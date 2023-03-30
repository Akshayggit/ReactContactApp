import React from "react";
import "./App.css";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

 
  // for fetching contacts through Api
  async componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      users: data,
    });

    console.log("current state", this.state);
  }


  // for deleting the contact
  handleDeleteContact = async (id) => {
    let { users } = this.state;
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    await fetch(url, {
      method: "DELETE",
    });

    let updatedUsers = users.filter((user) => user.id !== id);

    this.setState({
      users: updatedUsers,
    });
  };

 
  // for updating the contacts
  handleUpdateContact = async (name, phone, id) => {
    const { users } = this.state;
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        id,
        phone,
        name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log("Data from updation of contact", json));


    let updatedUsers = users.map((user) => {
      if (user.id === id) {
        user.name = name;
        user.phone = phone;
      }
      return user;
    });

    this.setState({
      users: updatedUsers,
    });
  };


  // for adding new contact
  handleAddContact = async (name, phone) => {
    let id = Date.now(); //genarating a unique id using date
    const { users } = this.state;
    const url = "https://jsonplaceholder.typicode.com/users";
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name,
        phone,
      }),
      headers: { 
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log("ADD CONTACT", json));

    let updatedUsers = [{ name, phone, id }].concat(users);

    this.setState({
      users: updatedUsers,
    });
  };

  //Our react contact app web page
  render() {
    const { users } = this.state;
    return (
      <>
      {/* header section */}
        <div className="header">
          <h1> Contact Manager </h1>
        </div>
        <hr />
      {/* Add contact section */}
        <AddContact addContact={this.handleAddContact} />
      {/* contacts list */}
        <div id="contact-list-container">
          <h2>Contact list</h2>
          <ul>
            {users.length === 0 ? (
              <h1>Loading....</h1>
            ) : (
              users.map((user) => {
                return (
                  <ContactList
                    name={user.name}
                    contact={user.phone}
                    key={user.id}
                    id={user.id}
                    handleDelete={this.handleDeleteContact}
                    handleUpdate={this.handleUpdateContact}
                  />
                );
              })
            )}
          </ul>
        </div>
      </>
    );
  }
}

export default App;