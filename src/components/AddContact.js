import React, { Component } from "react";

class AddContact extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      phone: "",
    };
  }
// this will work on any change in input fields
  handleChange = (inputType, e) => {
    if (inputType === "name") {
      this.setState({
        name: e.target.value,
      });
      return;
    }
    this.setState({
      phone: e.target.value,
    });
  };
// this will work on clicking on Add contact button
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone } = this.state;
    const { addContact } = this.props;
    if (name && phone) {
      addContact(name, phone);
      this.setState({
        name: "",
        phone: "",
      });
    }
  };

  render() {
    const { name, phone } = this.state;
    return (
      <div id="add-contacts-container">
        <h2>Add Contact</h2>
        <form>
          <div className="input-box">
            <input className="input"
              placeholder="Name"
              value={name}
              required
              onChange={(e) => this.handleChange("name", e)}
            />
            <input className="input"
              placeholder="Mobile No."
              value={phone}
              required
              onChange={(e) => this.handleChange("phone", e)}
            />
            <button id="btn" onClick={this.handleSubmit}>
              Add Contact
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddContact;