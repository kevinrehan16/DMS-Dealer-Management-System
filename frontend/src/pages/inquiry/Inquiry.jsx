import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, Form, Button, InputGroup, Table, Spinner } from "react-bootstrap";
import { FaUserPlus, FaSearch, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import "../../assets/css/Inquiry.css";

import ModalCreditApplication from "../../components/common/InquiryModals/ModalCreditApplication";
import ModalInquiry from "../../components/common/InquiryModals/ModalInquiry";

import { formatAmount } from '../../utils/formatters';
import { fetchWithRetry } from "../../utils/network";
import ModalCustomers from "../../components/common/InquiryModals/ModalCustomers";

export default function Inquiry() {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log({ search, branch, filterBy, dateFrom, dateTo });
  };

  const [showModalInquiry, setShowModalInquiry] = useState(false);
  const handleShowInquiry = () => setShowModalInquiry(true);
  const handleCloseInquiry = () => setShowModalInquiry(false);

  const [showModalCustomer, setShowModalCustomer] = useState(false);
  const handleShowCustomer = () => setShowModalCustomer(true);
  const handleCloseCustomer = () => setShowModalCustomer(false);
  
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchWithRetry(`${API_URL}/inquiries`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        params: {
          search: search,
          filterBy: filterBy,
        },
      }, 3, 1000, "Inquiries");

      setInquiries(response.data.inquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  }, [API_URL, token, search, filterBy]);

  const [showModalCreditApplication, setshowModalCreditApplication] = useState(false);
  const handleShowModalCreditApplication = (customer_id) => {
    setSelectedCustomerId(customer_id);
    setshowModalCreditApplication(true);
  } 
  const handleCloseModalCreditApplication = () => setshowModalCreditApplication(false);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

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
        onOpenGlobalModal={handleShowCustomer}
        refreshInquiries={fetchInquiries}
      />

      <ModalCustomers
        show={showModalCustomer}
        handleClose={handleCloseCustomer}
      />

    </div>
  );
}
