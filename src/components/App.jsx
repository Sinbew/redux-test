import { useState, useEffect } from 'react';
import { Section } from './Section/Section';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  useEffect(
    () => localStorage.setItem('contacts', JSON.stringify(contacts)),
    [contacts]
  );

  const addUserData = contact => {
    if (
      contacts.some(
        obj => obj.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert(`Sorry, ${contact.name} is already in contacts`);
    } else if (contacts.some(obj => obj.number === contact.number)) {
      alert(`Sorry, ${contact.number} is already in contacts`);
    } else {
      setContacts(prevState => [...prevState, contact]);
    }
  };

  const handlerFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const filterContacts = () => {
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  };

  const deleteContact = id => {
    setContacts(prev => prev.filter(contact => id !== contact.id));
  };

  return (
    <>
      <Section title="Phonebook">
        <Form addContact={addUserData}> </Form>
      </Section>

      <Section title="Contacts">
        <Filter filter={filter} handlerFilter={handlerFilter} />
        <ContactsList
          contacts={filterContacts()}
          deleteContact={deleteContact}
        />
      </Section>
    </>
  );
};
