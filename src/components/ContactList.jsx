import ContactCard from "../components/ContactCard";
import { Link } from "react-router-dom";
import { useRef } from "react";

const ContactList = (probs) => {
  const inputE1 = useRef("")
  console.log("probs in ContactList",probs);

  const deleteConactHandler = (id) => {
    probs.getContactId(id);
  };

  const renderContactList = probs.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        key={contact.id}
        clickHandler={deleteConactHandler}
      ></ContactCard>
    );
  });

  const getSearchTerm = () => {
    console.log(inputE1.current.value)
    probs.searchKeyword(inputE1.current.value);
  }
  return (
    <div className="main">
      <h2 style={{ marginTop: "50px" }}>
        Contact List
        <Link to="/add">
          <button
            className="ui button blue right"
            style={{ marginLeft: "125px" }}
          >
            Add Contact
          </button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input weigth" >
          <input type="text" placeholder="Search Contacts" className="prompt"  value={probs.term} onChange={getSearchTerm} ref={inputE1}/>
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">{renderContactList.length>0?renderContactList:"No Contact Available !!"}</div>
    </div>
  );
};

export default ContactList;
