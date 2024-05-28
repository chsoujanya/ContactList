import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from 'react-bootstrap';

const EditContact = ({ contact, onClose, onSave, updateContactCounts }) => {
  const [formData, setFormData] = useState(contact);
  const [initialValues, setInitialValues] = useState({ gender: '', type: '' });

  useEffect(() => {
    setFormData(contact);
    setInitialValues({ gender: contact.gender, type: contact.type });
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phonenumber.toString().length !== 10) {
      alert("Enter valid phone number");
    } else {
      if (initialValues.gender !== formData.gender || initialValues.type !== formData.type) {
        updateContactCounts(initialValues.gender, initialValues.type, 'delete');
        updateContactCounts(formData.gender, formData.type, 'add');
      }
      onSave(formData);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </Form.Group>
          <Form.Group controlId="phonenumber">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              type="number"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
          </Form.Group>
          <Form.Group controlId="gender">
            <Form.Label>Gender:</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="type">
            <Form.Label>Type:</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
            </Form.Control>
          </Form.Group>
          <h1> </h1>
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditContact;
