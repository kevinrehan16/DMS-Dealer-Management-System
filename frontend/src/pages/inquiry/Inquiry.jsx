import React, { useEffect, useState } from "react";
import { useInquiry } from '../../context/InquiryContext/InquiryContext';
import { Row, Col, Form, Button, InputGroup, Table, Spinner } from "react-bootstrap";
import { FaUserPlus, FaSearch, FaEdit, FaUserCheck, FaIdCard, FaSave, FaTimes, FaEye, FaTrash } from "react-icons/fa";
import "../../assets/css/Inquiry.css";
import GlobalModal from "../../components/common/GlobalModal";
import ModalCreditApplication from "../../components/common/InquiryModals/ModalCreditApplication";
import ModalInquiry from "../../components/common/InquiryModals/ModalInquiry";

import { formatAmount, formatMobile } from '../../utils/formatters';

import axios from "axios";

export default function Inquiry() {
  const { handleCustomerSelect } = useInquiry();
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const [error, setError] = useState({});

  const [showModalInquiry, setShowModalInquiry] = useState(false);
  const handleShowInquiry = () => setShowModalInquiry(true);
  const handleCloseInquiry = () => setShowModalInquiry(false);

  const [showModalCustomer, setShowModalCustomer] = useState(false);
  const handleShow = () => setShowModalCustomer(true);
  const handleClose = () => setShowModalCustomer(false);

  const [showModalNewCustomer, setShowModalNewCustomer] = useState(false);
  const handleShowNewCustomer = () => setShowModalNewCustomer(true);
  const handleCloseNewCustomer = () => {
    clearFormCustomerData();
    setError({});
    setShowModalNewCustomer(false);
  }

  const [showModalCreditApplication, setshowModalCreditApplication] = useState(false);
  const handleShowModalCreditApplication = (customer_id) => {
    setSelectedCustomerId(customer_id);
    setshowModalCreditApplication(true);
  } 
  const handleCloseModalCreditApplication = () => setshowModalCreditApplication(false);

  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Dummy customer data
  const [customers, setCustomers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ search, branch, filterBy, dateFrom, dateTo });
  };

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

      // console.log("Fetched inquiries:", response.data.inquiries);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/inquiries`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        params: {
          search: search,
          filterBy: filterBy // send search query to backend
        }
      });
      setInquiries(response.data.inquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [search, filterBy]);

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
                      <option value="walk-in">Walk-In</option>
                      <option value="referral">Referral</option>
                      <option value="hth">HTH</option>
                      <option value="advertisement">Advertisement</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Row>
                    <Col>
                      <Form.Group controlId="dateFrom">
                        <Form.Label>From</Form.Label>
                        <Form.Control
                          type="date"
                          value={dateFrom}
                          onChange={(e) => setDateFrom(e.target.value)}
                          max={new Date().toISOString().split("T")[0]}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="dateTo">
                        <Form.Label>To</Form.Label>
                        <Form.Control
                          type="date"
                          value={dateTo}
                          onChange={(e) => setDateTo(e.target.value)}
                          max={new Date().toISOString().split("T")[0]}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
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
                <th width='9%'>Inquiry ID</th>
                <th width='15%'>Customer Name</th>
                <th width='17%'>Address</th>
                <th width='12%'>Mobile #</th>
                <th width='17%'>Brand/Model/Color</th>
                <th width='8%'>Cash Price</th>
                <th width='12%'>Mo. Installment</th>
                <th width='10%'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </td>
                </tr>
              ) : (
                inquiries && inquiries.map((inquiry, index) => (
                  <tr key={index}>
                    <td>{inquiry.inquiry_id}</td>
                    <td>{inquiry.customer.firstName} {inquiry.customer.lastName}</td>
                    <td>{inquiry.customer.addresssbrgy ? inquiry.customer.addresssbrgy + ', ' : ''} {inquiry.customer.addressscity ? inquiry.customer.addressscity : ''}</td>
                    <td>{inquiry.customer.mobile}</td>
                    <td>{inquiry.motorBrand} / {inquiry.motorModel} / {inquiry.motorColor}</td>
                    <td className="text-end">{formatAmount(inquiry.motorCashprice)}</td>
                    <td className="text-end">{formatAmount(inquiry.motorMonthlyinstallment)}</td>
                    <td className="text-center">
                      <Button variant="info" size="sm" className="d-inline-block me-1 text-white">
                        <FaEye />
                      </Button>
                      <Button variant="warning" size="sm" className="d-inline-block me-1 text-white" onClick={()=>handleShowModalCreditApplication(inquiry.customer.id)}>
                        <FaEdit />
                      </Button>
                      <Button variant="danger" size="sm" className="d-inline-block me-1 text-white">
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>

      {/* 🔹 Global reusable modal */}
      {/* 🔹 Inquiry's modal */}
      <ModalCreditApplication
        show={showModalCreditApplication}
        handleClose={handleCloseModalCreditApplication}
        customerId={selectedCustomerId}
      />

      <ModalInquiry
        show={showModalInquiry}
        handleClose={handleCloseInquiry}
        title="New Inquiry"
        onOpenGlobalModal={handleShow}
        refreshInquiries={fetchInquiries}
      />

      {/* 🔹 Customers' modal */}
      <GlobalModal
        show={showModalCustomer}
        handleClose={handleClose}
        onSave=""
        title="Select Customer"
        size="md"
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
          <Col md={8} sm={8}>
            <Form>
              <Form.Group className="mb-3 position-relative">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search information..."
                  />
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Form>
          </Col>
          <Col md={4} sm={4}>
            <Button variant="success" className="d-flex align-items-center justify-content-center gap-1 w-100" onClick={handleShowNewCustomer}>
              <FaUserPlus /> Customer
            </Button>
          </Col>
        </Row>
        <div className="table-section">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th width="30%">Customer ID</th>
                <th width="35%">Customer Name</th>
                <th width="25%">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers && customers.map((customer, index) => (
                <tr key={customer.id}>
                  <td>{customer.customer_id}</td>
                  <td>{customer.firstName} {customer.lastName}</td>
                  <td className="d-flex gap-2">
                    <Button variant="success" size="sm" className="align-items-center justify-content-center" 
                    onClick={() => { handleCustomerSelect(customer); handleClose(); }}
                    title="Select this customer">
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
                      className={error.title ? 'is-invalid' : ''}
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
      </GlobalModal>

    </div>
  );
}
