// src/pages/inquiry/Inquiry.jsx
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, InputGroup, Table } from "react-bootstrap";
import { FaUserPlus, FaSearch, FaEdit, FaUserCheck, FaIdCard, FaSave, FaTimes } from "react-icons/fa";
import "../../assets/css/Inquiry.css";
import GlobalModal from "../../components/common/GlobalModal";
import ModalInquiry from "../../components/common/ModalInquiry";
import axios from "axios";

export default function Inquiry() {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const [ShowModalInquiry, setShowModalInquiry] = useState(false);
  const handleShowInquiry = () => setShowModalInquiry(true);
  const handleCloseInquiry = () => setShowModalInquiry(false);

  const [showModalCustomer, setShowModalCustomer] = useState(false);
  const handleShow = () => setShowModalCustomer(true);
  const handleClose = () => setShowModalCustomer(false);

  const [showModalNewCustomer, setShowModalNewCustomer] = useState(false);
  const handleShowNewCustomer = () => setShowModalNewCustomer(true);
  const handleCloseNewCustomer = () => setShowModalNewCustomer(false);

  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Dummy customer data
  const [customers, setCustomers] = useState();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ search, branch, filterBy, dateFrom, dateTo });
  };

  const [formCustomerData, setFormCustomerData] = useState({
    customerid: '',
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
      customerid: '',
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

  const handleSaveNewCustomer = async () => {
    try {
      const response = await axios.post(`${API_URL}/customers`, formCustomerData, {
        headers:{
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      clearFormCustomerData();
      fetchCustomers();
      console.log("New customer saved:", response.data);
    } catch (error) {
      console.error("Error saving new customer:", error);
    }
  }

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${API_URL}/customers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      setCustomers(response.data.customers);

      // console.log("Fetched customers:", response.data.customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleSaveInquiry = () => {
    console.log("Inquiry saved!");
    handleClose();
  };

  const formatMobile = (value) => {
    const digits = value.replace(/\D/g, '');

    // Strip known prefixes
    let normalized = digits;
    if (normalized.startsWith('63')) normalized = normalized.slice(2);
    else if (normalized.startsWith('0')) normalized = normalized.slice(1);

    // Format into chunks
    const part1 = normalized.slice(0, 3); // e.g. 915
    const part2 = normalized.slice(3, 6); // e.g. 316
    const part3 = normalized.slice(6, 10); // e.g. 9518

    let formatted = '+63';
    if (part1) formatted += '-' + part1;
    if (part2) formatted += '-' + part2;
    if (part3) formatted += '-' + part3;

    return formatted;
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <div className="inquiry-header">
        <h4>INQUIRY</h4>
      </div>

      <div className="inquiry-page">
        <Row>
          <Col md={11}>
            <Form onSubmit={handleSearch} className="filter-form">
              <Row className="align-items-end">
                <Col md={4}>
                  <Form.Group controlId="search">
                    <Form.Label>Search</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Search customer..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <InputGroup.Text>
                        <FaSearch />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>

                <Col md={2}>
                  <Form.Group controlId="branch">
                    <Form.Label>Branch</Form.Label>
                    <Form.Select value={branch} onChange={(e) => setBranch(e.target.value)}>
                      <option value="">All</option>
                      <option value="Manila">Manila</option>
                      <option value="Cebu">Cebu</option>
                      <option value="Davao">Davao</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={2}>
                  <Form.Group controlId="filterBy">
                    <Form.Label>Filter By</Form.Label>
                    <Form.Select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                      <option value="">All</option>
                      <option value="walkin">Walk-In</option>
                      <option value="referral">Referral</option>
                      <option value="hth Type">HTH</option>
                      <option value="advertisement">Advertisement</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Label>Date Range</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      max={new Date().toISOString().split("T")[0]}
                    />
                    <Form.Control
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </InputGroup>
                </Col>

              </Row>
            </Form>
          </Col>
          <Col md={1} className="d-flex justify-content-end">
            <Button type="submit" variant="primary" className="mt-auto d-flex align-items-center gap-1" onClick={handleShowInquiry}><FaUserPlus /> Inquiry</Button>
            {/* <Button type="submit" variant="primary" className="mt-auto d-flex align-items-center gap-1" onClick={handleShow}>
              <FaUserPlus /> Inquiry
            </Button> */}
          </Col>
        </Row>
        <div className="table-section mt-4">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Branch</th>
                <th>Inquiry</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </Table>
        </div>
      </div>

      {/* 🔹 Global reusable modal */}
      {/* 🔹 Inquiry's modal */}
      <ModalInquiry
        show={ShowModalInquiry}
        handleClose={handleCloseInquiry}
        title="New Inquiry"
        onOpenGlobalModal={handleShow}
      />

      {/* 🔹 Customers' modal */}
      <GlobalModal
        show={showModalCustomer}
        handleClose={handleClose}
        onSave=""
        title="Select Customer"
        size="lg"
        footer={
          <>
            <Button variant="danger" onClick={handleClose} className="d-flex align-items-center justify-content-evenly">
              <FaTimes /> Close
            </Button>
          </>
        }

      >
        {/* Modal content goes here */}
        <Row>
          <Col md={9} sm={9}>
            <Form>
              <Form.Group className="mb-3 position-relative">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search customer information..."
                  />
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Form>
          </Col>
          <Col md={3} sm={3}>
            <Button variant="success" className="d-flex align-items-center justify-content-center gap-1 w-100" onClick={handleShowNewCustomer}>
              <FaUserPlus /> Customer
            </Button>
          </Col>
        </Row>
        <div className="table-section">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th width="20%">Customer ID</th>
                <th width="60%">Customer Name</th>
                <th width="20%">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers && customers.map((customer, index) => (
                <tr key={customer.id}>
                  <td>{customer.customerid}</td>
                  <td>{customer.firstName} {customer.lastName}</td>
                  <td className="d-flex gap-2">
                    <Button variant="success" size="sm" className="align-items-center justify-content-center" title="Select this customer">
                      <FaUserCheck />
                    </Button>
                    <Button variant="info" size="sm" className="align-items-center justify-content-center" title="View this customer">
                      <FaIdCard className="text-white" />
                    </Button>
                    <Button variant="primary" size="sm" className="align-items-center justify-content-center" title="Edit this customer">
                      <FaEdit />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </GlobalModal>

      {/* 🔹 New Customer's modal */}
      <GlobalModal 
        show={showModalNewCustomer} 
        handleClose={handleCloseNewCustomer}
        title="Create New Customer"
        size="md"
        footer={
          <>
            <Button variant="primary" onClick={handleSaveNewCustomer} className="d-flex align-items-center justify-content-evenly">
              <FaSave /> Save
            </Button>
            <Button variant="danger" onClick={handleCloseNewCustomer} className="d-flex align-items-center justify-content-evenly">
              <FaTimes /> Close
            </Button>
          </>
        }

      >
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="formCustomerid" className="mb-2">
                <Row>
                  <Col xs={3} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Customer ID</Form.Label>
                  </Col>
                  <Col xs={9}>
                    <Form.Control
                      type="text"
                      className="uppercase_text"
                      name="customerid"
                      value={formCustomerData.customerid}
                      onChange={handleInputCustomerChange}
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formTitle" className="mb-2">
                <Row>
                  <Col xs={3} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Title</Form.Label>
                  </Col>
                  <Col xs={9}>
                    <Form.Control 
                      as='select' 
                      name='title' 
                      value={formCustomerData.title} 
                      onChange={handleInputCustomerChange} 
                      required
                    >
                      <option value=''>Select Title</option>
                      <option value='mr'>Mr.</option>
                      <option value='mrs'>Mrs.</option>
                      <option value='ms'>Ms.</option>
                    </Form.Control>
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
                      className="capitalize_text"
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
                      className="capitalize_text"
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
                      className="capitalize_text"
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
                      className="lowercase_text"
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
                      className="uppercase_text"
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
                      value={formCustomerData.mobile.startsWith('+63') ? formCustomerData.mobile : '+63' + formCustomerData.mobile}
                      onChange={e => {
                        const formatted = formatMobile(e.target.value);
                        setFormCustomerData({ ...formCustomerData, mobile: formatted });
                      }}
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </GlobalModal>

    </div>
  );
}
