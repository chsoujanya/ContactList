import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddContactModal = ({ onClose, onSave }) => {
    const [newContact, setNewContact] = useState({ name: '', phonenumber: '', gender: 'Male', type: 'Personal' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewContact({ ...newContact, [name]: value });
    };

    const handleSave = () => {
        if(newContact.phonenumber.toString().length !== 10)
        {
            alert("Enter a valid phone number.");
            return;
        }
        if (!newContact.name || !newContact.phonenumber) {
            alert('Please fill in all required fields.');
            return;
        }
        const id = new Date().getTime(); 
        onSave({ ...newContact, id });
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" name="name" value={newContact.name} onChange={handleChange} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone Number:</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="phonenumber" 
                            value={newContact.phonenumber} 
                            onChange={handleChange} 
                            pattern="[0-9]*$" 
                        />
                        
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Gender:</Form.Label>
                        <Form.Control as="select" name="gender" value={newContact.gender} onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Type:</Form.Label>
                        <Form.Control as="select" name="type" value={newContact.type} onChange={handleChange}>
                            <option value="Personal">Personal</option>
                            <option value="Business">Business</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            
            <Modal.Footer>
                <Button variant="primary" onClick={handleSave}>Save</Button>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddContactModal;
