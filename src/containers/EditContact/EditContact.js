import React from "react";
import { useParams } from "react-router-dom";
import { FormComponent } from "../../components";
import { useGlobalContext } from "../../context/context";

const EditContact = () => {
  const { contacts } = useGlobalContext();
  const { id } = useParams();
  const contactData = contacts.filter((contact) => contact.id === id)[0];
  return <FormComponent editObject={contactData} />;
};

export default EditContact;
