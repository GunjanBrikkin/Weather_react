import "./App.css";
import Header from "../components/Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactDetail from "../components/ContactDetail";
import DeleteThatRecord from "./deleteSurePage";
import api from "../api/contacts"
import { all } from "axios";
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm,setSearchTearm] = useState("");
  const [searchResult,setSearchResult] = useState([]);

  //Retrive contacts 
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  const addContactHandler = async (contact) => {
    console.log("contact", contact);
    const request = {
      id:uuid(),
      ...contact,
    }
    const response = await api.post("/contacts",request);
    console.log("response is",response)
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    console.log("contact",contact);
    console.log("hiiii")
    if (!contact.id) {
      console.error("Contact ID is missing!");
      return;
    }
    
    try {
      const response = await api.put(`/contacts/${contact.id}`, contact);
      console.log("Updated Contact:", response.data);
      setContacts((hereee)=>   // hereee represents tghe contacts
      hereee.map((e)=>(
        e.id===contact.id? response.data : e // note contact is new value , contacts is array object 
      ))
      )
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const removeConatctList = async (id) => {
    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  // Load contacts from localStorage when the component mounts
  useEffect(() => {
    // const retriveContacts =
    //   JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    // if (retriveContacts.length > 0) {
    //   setContacts(retriveContacts);
    // }
    const getAllConntacts = async () => {
      const allConatacts = await retriveContacts();
      if(allConatacts) setContacts(allConatacts)
    };
    getAllConntacts()
  }, []);

  const searchHandler = (searchTerm) => {
    setSearchTearm(searchTerm);
    if(searchTerm!==""){
      const newContactList = contacts.filter((contact)=>{
        return Object.values(contact).join("").toLowerCase().includes(searchTerm.toLowerCase())
      });
      setSearchResult(newContactList);
    }else{
      setSearchResult(contacts);
    }
    console.log(searchTerm)
  } 

  useEffect(() => {
   // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  
  return (
    <div className="ui container">
      <Router>
        <Header />

        <Routes>
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            path="/"
            exact
            element={
              <ContactList
                contacts={searchTerm.length<1?contacts:searchResult}
                getContactId={removeConatctList}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            }
          />
          <Route path="/contact/:id" element={<ContactDetail />} />
          <Route path="/conact/deleteSurePage" element={<DeleteThatRecord clickHandler={removeConatctList}/>} />
          <Route path="/edit" element={<EditContact updateContactHandler={updateContactHandler} />} />
        </Routes>

        {/* <AddContact addContactHandler={addContactHandler} /> */}
        {/* <ContactList contacts={contacts} getContactId={removeConatctList} /> */}
      </Router>
    </div>
  );
}

export default App;
