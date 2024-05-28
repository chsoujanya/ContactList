import React, { useEffect, useState } from 'react';
import { ContactsData } from '../DummyData/ContactsData';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import EditContactModal from './EditContactModal';
import AddContactModal from './AddContactModal';
import Navbar from 'react-bootstrap/Navbar';
import './styles.css';
import { MdEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { IoAddOutline } from "react-icons/io5";
import { RiContactsBook3Line } from "react-icons/ri";

const Home = () => {
    const [contacts, setContacts] = useState([]);
    const [editingContact, setEditingContact] = useState(null);
    const [showAddContactModal, setShowAddContactModal] = useState(false);
    const [maleCount, setMaleCount] = useState(0);
    const [femaleCount, setFemaleCount] = useState(0);
    const [personalCount, setPersonalCount] = useState(0);
    const [businessCount, setBusinessCount] = useState(0);

    useEffect(() => {
        setContacts(ContactsData);
        let males = 0, females = 0, personals = 0, businesses = 0;
        ContactsData.forEach(contact => {
            if (contact.gender === 'Male') males++;
            if (contact.gender === 'Female') females++;
            if (contact.type === 'Personal') personals++;
            if (contact.type === 'Business') businesses++;
        });
        setMaleCount(males);
        setFemaleCount(females);
        setPersonalCount(personals);
        setBusinessCount(businesses);
    }, []);

    const updateContactCounts = (gender, type, action) => {
        if (action === 'add') {
            if (gender === 'Male') {
                setMaleCount(prevCount => prevCount + 1);
            } else if (gender === 'Female') {
                setFemaleCount(prevCount => prevCount + 1);
            }

            if (type === 'Personal') {
                setPersonalCount(prevCount => prevCount + 1);
            } else if (type === 'Business') {
                setBusinessCount(prevCount => prevCount + 1);
            }
        } else if (action === 'delete') {
            if (gender === 'Male') {
                setMaleCount(prevCount => prevCount - 1);
            } else if (gender === 'Female') {
                setFemaleCount(prevCount => prevCount - 1);
            }

            if (type === 'Personal') {
                setPersonalCount(prevCount => prevCount - 1);
            } else if (type === 'Business') {
                setBusinessCount(prevCount => prevCount - 1);
            }
        }
    };

    const handleEditContact = (editContact) => {
        setEditingContact(editContact);
    }

    const handleSave = (updatedContact) => {
        setContacts(contacts.map(contact => (contact.id === updatedContact.id ? updatedContact : contact)));
        setEditingContact(null);
    };

    const handleDelete = (contactId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this contact?');
        if (isConfirmed) {
            const contactToDelete = contacts.find(contact => contact.id === contactId);
            setContacts(contacts.filter(contact => contact.id !== contactId));
            updateContactCounts(contactToDelete.gender, contactToDelete.type, 'delete');
        }
    };

    const handleClose = () => {
        setEditingContact(null);
    };

    const handleAddContact = () => {
        setShowAddContactModal(true);
    };

    const handleCloseAddContactModal = () => {
        setShowAddContactModal(false);
    };

    return (
        <div style={{ backgroundColor: '#e8ecf4' }}>
            <Navbar className="custom-navbar fixed-top">
                <Container>
                    <Navbar.Brand className="navbar-brand contacts-list">CONTACTS LIST</Navbar.Brand>
                    <Button onClick={handleAddContact} className="text-white"><IoAddOutline size={25}/>Add contact</Button>
                </Container>
            </Navbar>
            
            <Container style={{  paddingTop: '70px' }}>
                <Row>
                    <Col md={4} xs={12} className="custom-col">
                        <h5 className = 'font-times'>COUNT: </h5>
                        <p><RiContactsBook3Line /> Male Contacts: {maleCount}</p>
                        <p><RiContactsBook3Line /> Female Contacts: {femaleCount}</p>
                        <p><RiContactsBook3Line /> Personal Contacts: {personalCount}</p>
                        <p><RiContactsBook3Line /> Business Contacts: {businessCount}</p>
                    </Col>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>Gender</th>
                                    <th>Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((currentContact) => (
                                    <tr key={currentContact.id}>
                                        <td>{currentContact.name}</td>
                                        <td>{currentContact.phonenumber}</td>
                                        <td>{currentContact.gender}</td>
                                        <td>{currentContact.type}</td>
                                        <td>
                                            <Button variant='secondary' onClick={() => handleEditContact(currentContact)}> <MdEdit size={25}/> </Button>{' '}
                                            <Button variant='secondary' onClick={() => handleDelete(currentContact.id)}><RiDeleteBinFill size={25}/></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

            {editingContact && (
                <EditContactModal
                    contact={editingContact}
                    onClose={handleClose}
                    onSave={handleSave}
                    updateContactCounts={updateContactCounts}
                />
            )}
            {showAddContactModal && (
                <AddContactModal
                    onClose={handleCloseAddContactModal}
                    onSave={(newContact) => {
                        setContacts([...contacts, newContact]);
                        updateContactCounts(newContact.gender, newContact.type, 'add');
                        handleCloseAddContactModal();
                    }}
                />
            )}
        </div>
    );
};

export default Home;
