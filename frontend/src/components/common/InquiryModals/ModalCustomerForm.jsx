import React, {useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { FaSave, FaTimes } from "react-icons/fa";

import axios from 'axios';
import { formatAmount, formatMobile } from '../../../utils/formatters';

const ModalCustomerForm = ({show, handleClose, fetchCustomers}) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const [error, setError] = useState({});
  const [formCustomerData, setFormCustomerData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    gender: '',
    birthdate: '',
    mobile: ''
  });
  
  const clearFormCustomerData = () => {
    setFormCustomerData({
      title: '',
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      gender: '',
      birthdate: '',
      mobile: ''
    })
  }

  const handleInputCustomerChange = (e) => {
    setFormCustomerData({
      ...formCustomerData, [e.target.name]: e.target.value
    })
  }

  const handleCloseNewCustomer = () => {
    clearFormCustomerData();
    setError({});
    handleClose();
  }

  const handleSaveNewCustomer = async () => {
    try {
      const response = await axios.post(`${API_URL}/customers`, formCustomerData, {
        headers:{
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      fetchCustomers();
      clearFormCustomerData();
      setError({});
      console.log("New customer saved:", response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors);
      }
      console.error("Error saving new customer:", error);
    }
  }

  return (
    <div>
      <Modal show={show} onHide={handleCloseNewCustomer} size='md' backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form>
                <Form.Group controlId="formTitle" className="mb-2">
                  <Row>
                    <Col xs={3} className="d-flex align-items-center">
                      <Form.Label className="mb-0">Title</Form.Label>
                    </Col>
                    <Col xs={9}>
                      <Form.Select 
                        as='select' 
                        name='title' 
                        value={formCustomerData.title} 
                        onChange={handleInputCustomerChange} 
                        className={error.title ? 'is-invalid' : ''}
                        required
                      >
                        <option value=''>Select Title</option>
                        <option value='mr'>Mr.</option>
                        <option value='mrs'>Mrs.</option>
                        <option value='ms'>Ms.</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formFirstName" className="mb-2">
                  <Row>
                    <Col xs={3} className="d-flex align-items-center">
                      <Form.Label className="mb-0">First Name</Form.Label>
                    </Col>
                    <Col xs={9}>
                      <Form.Control
                        type="text"
                        className={`capitalize_text ${error.firstName ? 'is-invalid' : ''}`}
                        name="firstName"
                        value={formCustomerData.firstName}
                        onChange={handleInputCustomerChange}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formLastName" className="mb-2">
                  <Row>
                    <Col xs={3} className="d-flex align-items-center">
                      <Form.Label className="mb-0">Last Name</Form.Label>
                    </Col>
                    <Col xs={9}>
                      <Form.Control
                        type="text"
                        className={`capitalize_text ${error.lastName ? 'is-invalid' : ''}`}
                        name="lastName"
                        value={formCustomerData.lastName}
                        onChange={handleInputCustomerChange}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formMiddleName" className="mb-2">
                  <Row>
                    <Col xs={3} className="d-flex align-items-center">
                      <Form.Label className="mb-0">Middle Name</Form.Label>
                    </Col>
                    <Col xs={9}>
                      <Form.Control
                        type="text"
                        className={`capitalize_text ${error.middleName ? 'is-invalid' : ''}`}
                        name="middleName"
                        value={formCustomerData.middleName}
                        onChange={handleInputCustomerChange}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-2">
                  <Row>
                    <Col xs={3} className="d-flex align-items-center">
                      <Form.Label className="mb-0">Email</Form.Label>
                    </Col>
                    <Col xs={9}>
                      <Form.Control
                        type="email"
                        className={`lowercase_text ${error.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={formCustomerData.email}
                        onChange={handleInputCustomerChange}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formGender" className="mb-2">
                  <Row>
                    <Col xs={3} className="d-flex align-items-center">
                      <Form.Label className="mb-0">Gender</Form.Label>
                    </Col>
                    <Col xs={9}>
                      <Form.Control 
                        as='select' 
                        name='gender' 
                        value={formCustomerData.gender} 
                        onChange={handleInputCustomerChange}
                        className={`${error.gender ? 'is-invalid' : ''}`}
                        required
                      >
                        <option value=''>Select Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                      </Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formBirthdate" className="mb-2">
                  <Row>
                    <Col xs={3} className="d-flex align-items-center">
                      <Form.Label className="mb-0">Birthdate</Form.Label>
                    </Col>
                    <Col xs={9}>
                      <Form.Control
                        type="date"
                        name="birthdate"
                        className={`uppercase_text ${error.birthdate ? 'is-invalid' : ''}`}
                        max={new Date().toISOString().split("T")[0]}
                        value={formCustomerData.birthdate}
                        onChange={handleInputCustomerChange}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formMobile" className="mb-2">
                  <Row>
                    <Col xs={3} className="d-flex align-items-center">
                      <Form.Label className="mb-0">Mobile #</Form.Label>
                    </Col>
                    <Col xs={9}>
                      <Form.Control
                        type="text"
                        name="mobile"
                        value={formCustomerData.mobile.startsWith('+63') ? formCustomerData.mobile : '+63' + 
                          formCustomerData.mobile}
                        onChange={e => {
                          const formatted = formatMobile(e.target.value);
                          setFormCustomerData({ ...formCustomerData, mobile: formatted });
                        }}
                        className={`${error.mobile ? 'is-invalid' : ''}`}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveNewCustomer} className="d-flex align-items-center justify-content-evenly">
            <FaSave /> Save
          </Button>
          <Button variant="danger" onClick={handleCloseNewCustomer} className="d-flex align-items-center justify-content-evenly">
            <FaTimes /> Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default React.memo(ModalCustomerForm);
