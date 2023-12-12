import { useState } from 'react';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {

  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  const addContact = (newContact) => {
    setContacts([...contacts, { ...newContact, id: Date.now() }]);
  };

  const editContact = (id) => {
    const contactToEdit = contacts.find((contact) => contact.id === id);
    setEditingContact(contactToEdit);
  };

  const cancelEdit = () => {
    setEditingContact(null);
  };

  const updateContact = (updatedContact) => {
    const index = contacts.findIndex((contact) => contact.id === updatedContact.id);
    const updatedContacts = [...contacts];
    updatedContacts[index] = updatedContact;
    setContacts(updatedContacts);
    setEditingContact(null);
  };


  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div className="pt-10 bg-gray-500 h-screen">
      <header className="max-w-7xl m-auto">
        <div className='text-center text-2xl mb-5 text-white'>
          <h3>Contacts Management App</h3>
        </div>
        {editingContact ? (
          <div>
            <h2>Edit Contact</h2>
            <ContactForm addContact={updateContact} initialContact={editingContact} />
            <button onClick={cancelEdit}>Cancel Edit</button>
          </div>
        ) : (
          <ContactForm addContact={addContact} />
        )}
      </header>

      <main className='max-w-7xl m-auto pt-12'>
        <ContactList contacts={contacts} editContact={editContact} deleteContact={deleteContact} />
      </main>
    </div>
  );
}

export default App;


