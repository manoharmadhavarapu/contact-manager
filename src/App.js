//import logo from './logo.svg';
// import './App.css';
import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import ContactList from "./components/Contacts/ContactList/ContactList";
import AddContact from "./components/Contacts/AddContact/AddContact";
import ViewContact from "./components/Contacts/ViewContact/ViewContact";
import EditContact from "./components/Contacts/EditContact/EditContact";

function App() {
  return (
    <React.Fragment className="App">
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Navigate to={'/contacts/list'} />} />
        <Route path="/contacts/list" element={<ContactList/>} />
        <Route path="/contacts/add" element={<AddContact/>} />
        <Route path="/contacts/view/:contactId" element={<ViewContact/>} />
        <Route path="/contacts/edit/:contactId" element={<EditContact/>} />
      </Routes>

    </React.Fragment>
  );
}

export default App;
