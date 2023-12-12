const ContactList = ({ contacts, editContact, deleteContact }) => {
    return (
        <ul className='text-gray-200 text-xl'>
            {contacts.map((contact) => (
                <li key={contact.id}>
                    <div className='flex space-x-12 pb-8'>
                        <div>{contact.name}</div>
                        <div>{contact.email}</div>
                        <div>{contact.phone}</div>
                        <div className='space-x-4'>
                            <button onClick={() => editContact(contact.id)}>Edit</button>
                            <button onClick={() => deleteContact(contact.id)}>Delete</button>
                        </div>
                    </div>

                </li>
            ))}
        </ul>
    );
};

export default ContactList;
