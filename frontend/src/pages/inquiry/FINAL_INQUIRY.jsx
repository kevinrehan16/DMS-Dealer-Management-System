import React, { useState, useCallback } from "react";
import { Row, Col, Form, Button, InputGroup, Table, Badge, Dropdown } from "react-bootstrap";
import { FaUserPlus, FaSearch, FaEdit, FaEye, FaTrash, FaMotorcycle, FaUser, FaCalendarAlt, FaEllipsisV } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import "../../assets/css/Inquiry.css";

import { useInquiry } from "../../hooks/HooksInquiry/useInquiry";

import ModalCreditApplication from "../../components/common/InquiryModals/ModalCreditApplication";
import ModalInquiry from "../../components/common/InquiryModals/ModalInquiry";
// import ModalCustomers from "../../components/common/InquiryModals/ModalCustomers";

import { formatAmount } from '../../utils/formatters';
import SkeletonRowLoading from "../../components/common/Loading/SkeletonRowLoading";

import { can } from "../../utils/permission";
import { debounce } from "lodash";

export default function Inquiry() {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [actionInquiryId, setActionInquiryId] = useState(null);
  
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");


  const [showModalInquiry, setShowModalInquiry] = useState(false);
  const handleCloseInquiry = () => setShowModalInquiry(false);

  const [searchInfo, setSearchInfo] = useState("");
  const [userFilterBy, setUserFilterBy] = useState("");
  const [filters, setFilters] = useState(
    { 
      search: '', 
      filterBy: '',
      status: 'NEW'
    }
  );

  const debouncedSearch = useCallback(
    debounce((value) => {
      setFilters(prev => ({ ...prev, search: value }));
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInfo(value); // Update agad ang textbox para hindi "laggy"
    debouncedSearch(value); // Tawagin ang debounced function
  };
  
  const handleTypeChange = (e) => {
    const value = e.target.value;
    setUserFilterBy(value);
    setFilters(prev => ({ ...prev, filterBy: value }));
  };

  const { data: inquiries = [], isLoading, isError, error, refetch, isFetching } = useInquiry(filters);

  const handleShowModalInquiry = (customerID) => {
    setSelectedCustomerId(customerID);
    setShowModalInquiry(true);
  }

  const [showModalCreditApplication, setshowModalCreditApplication] = useState(false);
  const handleShowModalCreditApplication = (customer_id, applicationId) => {
    setSelectedCustomerId(customer_id);
    setSelectedApplicationId(applicationId);
    setshowModalCreditApplication(true);
  } 
  const handleCloseModalCreditApplication = () => setshowModalCreditApplication(false);

  return (
    <div>
      <div className="inquiry-header d-flex align-items-center justify-content-between mb-3">
        <h4 className='m-0 d-flex align-items-center gap-2'>
          <FaUser className='fs-4'/> INQUIRY
        </h4>

        <Col md={5} lg={4}>
          <InputGroup size="md" className="shadow-sm">
            <InputGroup.Text className="bg-secondary text-white border-end-1">
              <FaCalendarAlt size={12} />
            </InputGroup.Text>
            <Form.Control 
              type="date" 
              className="border-start-0" 
              value={filters.from_date}
              onChange={(e) => setFilters({...filters, from_date: e.target.value})}
            />
            <InputGroup.Text className="bg-secondary border-start-0 border-end-0 text-white small">
              to
            </InputGroup.Text>
            <Form.Control 
              type="date" 
              className="border-start-0"
              value={filters.to_date}
              onChange={(e) => setFilters({...filters, to_date: e.target.value})}
            />
          </InputGroup>
        </Col>
      </div>

      <div className="inquiry-page">
        <Row>
          <Col md={11}>
            <Form onSubmit={(e) => e.preventDefault()} className="filter-form">
              <Row className="align-items-end">
                <Col md={4}>
                  <Form.Group controlId="search">
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Search customer..."
                        value={searchInfo}
                        onChange={handleSearchChange}
                      />
                      <InputGroup.Text>
                        {/* Spinner icon kung nag-fe-fetch pa sa background */}
                        {isFetching ? <CircularProgress size={16} /> : <FaSearch />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>

                <Col md={2}>
                  <Form.Group controlId="branch">
                    <Form.Select>
                      <option value="">--Filter by Branch--</option>
                      <option value="Manila">Manila</option>
                      <option value="Cebu">Cebu</option>
                      <option value="Davao">Davao</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={2}>
                  <Form.Group controlId="filterBy">
                    <Form.Select value={userFilterBy} onChange={handleTypeChange}>
                      <option value="">--Filter by Source--</option>
                      <option value="walk-in">Walk-In</option>
                      <option value="referral">Referral</option>
                      <option value="hth">HTH</option>
                      <option value="advertisement">Advertisement</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

              </Row>
            </Form>
          </Col>
          <Col md={1} className="d-flex justify-content-end">
            {can('create inquiry') && (
              <Button type="submit" variant="primary" className="mt-auto d-flex align-items-center gap-1" onClick={()=>handleShowModalInquiry(null)}><FaUserPlus /> Inquiry</Button>
            )}
          </Col>
        </Row>
        <div className="table-section mt-4">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th width='20%'>Customer Name</th>
                <th width='12%'>Mobile #</th>
                <th width='9%' className="text-center">Source</th>
                <th width='25%'>Motor</th>
                <th width='14%' className="text-end">Cash Price</th>
                <th width='14%' className="text-end">Mo. Installment</th>
                <th width='8%' className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, index) => (
                  <SkeletonRowLoading key={index} columns={8} />
                ))
              ) : (
                inquiries && inquiries.map((inquiry, index) => (
                  <tr key={index}>
                    <td>
                      <div className="fw-bold text-dark">{inquiry.customer.firstName} {inquiry.customer.lastName}</div>
                      <div className="text-muted extra-small" style={{ fontSize: '11px' }}><b>Inquiry ID</b>: {inquiry.inquiry_id}</div>
                    </td>
                    <td>{inquiry.customer.mobile}</td>
                    <td className="text-center">
                      <Badge 
                          bg="info" 
                          className="rounded-pill text-uppercase"
                          style={{ fontSize: '10px', width: '100%', textAlign: 'center' }}
                      >
                        {inquiry.sourceInquiry || 'WALK-IN'}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <FaMotorcycle className="me-2 text-secondary" size={18} />
                        <div>
                          <div className="fw-medium">{inquiry.motorBrand} {inquiry.motorModel}</div>
                          <small className="text-muted"><b>Color</b>: {inquiry.motorColor}</small>
                        </div>
                      </div>
                    </td>
                    <td className="text-end font-monospace">₱ {formatAmount(inquiry.motorCashprice)}</td>
                    <td className="text-end">
                      <div className="fw-medium text-dark font-monospace">₱ {formatAmount(inquiry.motorMonthlyinstallment)}</div>
                      <div className="text-muted extra-small" style={{ fontSize: '11px' }}><FaCalendarAlt className="mb-1 text-secondary" size={11} /> {inquiry.motorInstallmentterm} Months</div>
                    </td>
                    <td className="text-center">
                      {/* <Button 
                        variant="info" 
                        size="sm" 
                        className="d-inline-block me-1 text-white"
                        onClick={()=>handleShowModalInquiry(inquiry.id)}
                      >
                        <FaEye />
                      </Button>
                      <Button variant="warning" size="sm" className="d-inline-block me-1 text-white" onClick={()=>handleShowModalCreditApplication(inquiry.customer.id, inquiry.customer.credit_application.id)}>
                        <FaEdit />
                      </Button>
                      <Button variant="danger" size="sm" className="d-inline-block me-1 text-white">
                        <FaTrash />
                      </Button> */}

                      <Dropdown 
                        drop="start"
                        onToggle={(isOpen) => {
                          if (isOpen) {
                            setActionInquiryId(inquiry.id);
                          }
                          else{
                            setActionInquiryId(null);
                          }
                        }}
                      >
                        <Dropdown.Toggle 
                          variant="link" 
                          className={`${actionInquiryId === inquiry.id ? 'text-warning fw-bold' : 'text-muted'} p-0 hide-caret`}
                        >
                          <FaEllipsisV />
                        </Dropdown.Toggle>
                        <Dropdown.Menu  className="shadow-sm border-0">
                          <Dropdown.Item 
                            as="button"
                            onClick={()=>{handleShowModalInquiry(inquiry.id); setActionInquiryId(0)}}
                          >
                            <FaEye className="me-2 mb-1 text-info" /> View Inquiry
                          </Dropdown.Item>
                          <Dropdown.Item 
                            as="button"
                            onClick={()=>{handleShowModalCreditApplication(inquiry.customer.id, inquiry.customer.credit_application.id); setActionInquiryId(0)}}
                          >
                            <FaEdit className="me-2 mb-1 text-warning" /> Apply Credit Application
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item href="#/void" className="text-danger" onClick={() => {setActionInquiryId(null)}}>
                            <FaTrash className="me-2 mb-1 text-danger" /> Remove Inquiry
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Global reusable modal */}
      {/* Inquiry's modal */}
      {showModalCreditApplication &&
        <ModalCreditApplication
          show={showModalCreditApplication}
          handleClose={handleCloseModalCreditApplication}
          customerId={selectedCustomerId}
          applicationId={selectedApplicationId}
      />}

      
      <ModalInquiry
        show={showModalInquiry}
        handleClose={handleCloseInquiry}
        title="New Inquiry"
        customerID={selectedCustomerId}
      />

    </div>
  );
}
