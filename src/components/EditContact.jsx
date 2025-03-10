import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditContact = ({ updateContactHandler }) => {
  const location = useLocation();
  const navigate = useNavigate();


  console.log("000000000000000000000000000000",location)
  console.log("State inside location:", location.state);
  // Ensure location.state exists before accessing contact
  const contactData = location.state?.contact || { id: "", Name: "", Email: "" };

  const [contact, setContact] = useState(contactData);

  const update = (e) => {
    e.preventDefault();
    if (contact.Name.trim() === "" || contact.Email.trim() === "") {
      alert("All fields are mandatory!");
      return;
    }

    updateContactHandler(contact); // ✅ Call handler to update the contact
    navigate("/"); // ✅ Navigate back after updating
  };

  return (
    <div className="ui main">
      <h2 style={{ marginTop: "50px" }}>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter the name please!"
            value={contact.Name}
            onChange={(e) => setContact({ ...contact, Name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter the email please!"
            value={contact.Email}
            onChange={(e) => setContact({ ...contact, Email: e.target.value })}
          />
        </div>
        <button className="ui button blue" onClick={
          update
        }>Update</button>
      </form>
    </div>
  );
};

export default EditContact;
