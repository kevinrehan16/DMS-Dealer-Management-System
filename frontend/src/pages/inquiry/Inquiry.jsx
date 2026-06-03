import React, { useState, useCallback } from "react";
import { Row, Col, Form, Button, InputGroup, Table, Badge, Dropdown } from "react-bootstrap";
import { 
  FaUserPlus, FaSearch, FaEdit, FaEye, FaTrash, FaFilter, 
  FaMotorcycle, FaUser, FaCalendarAlt, FaEllipsisV, FaMobileAlt, FaEnvelopeSquare 
} from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import { debounce } from "lodash";

import "../../assets/css/Inquiry.css";
import { useInquiry } from "../../hooks/HooksInquiry/useInquiry";
import ModalCreditApplication from "../../components/common/InquiryModals/ModalCreditApplication";
import ModalInquiry from "../../components/common/InquiryModals/ModalInquiry";
import { formatAmount, formatShowMobile } from '../../utils/formatters';
import SkeletonRowLoading from "../../components/common/Loading/SkeletonRowLoading";
import { can } from "../../utils/permission";



export default function Inquiry() {
  // --- ORIGINAL LOGIC STATES ---
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [actionInquiryId, setActionInquiryId] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  
  const [showModalInquiry, setShowModalInquiry] = useState(false);
  const [showModalCreditApplication, setshowModalCreditApplication] = useState(false);
  
  const [searchInfo, setSearchInfo] = useState("");
  const [userFilterBy, setUserFilterBy] = useState("");
  const [filters, setFilters] = useState({ 
    search: '', filterBy: '', status: 'NEW', from_date: '', to_date: '' 
  });

  // --- ORIGINAL FUNCTIONS ---
  const handleCloseInquiry = () => setShowModalInquiry(false);
  const handleCloseModalCreditApplication = () => setshowModalCreditApplication(false);

  const debouncedSearch = useCallback(debounce((value) => {
      setFilters(prev => ({ ...prev, search: value }));
    }, 500), []);

  const handleSearchChange = (e) => {
    setSearchInfo(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setUserFilterBy(value);
    setFilters(prev => ({ ...prev, filterBy: value }));
  };

  const handleShowModalInquiry = (customerID) => {
    setSelectedCustomerId(customerID);
    setShowModalInquiry(true);
  }

  const handleShowModalCreditApplication = (customer_id, applicationId) => {
    setSelectedCustomerId(customer_id);
    setSelectedApplicationId(applicationId);
    setshowModalCreditApplication(true);
  }

  const { data: inquiries = [], isLoading, isFetching } = useInquiry(filters);
  
  const [filterType, setFilterType] = useState('ALL');

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', width: '100%', backgroundColor: '#f8f9fa', overflow: 'hidden' }}>
      
      {/* HEADER SECTION */}
      <div className="bg-white border-bottom shadow-sm px-3 py-2">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="icon-box-float text-dark">
              <FaUser size={20}/>
            </div>
            <div>
              <h5 className="fw-bold mb-0 text-dark">Inquiry</h5>
              <small className="text-muted" style={{ fontSize: '11px' }}>Operational Lead Management</small>
            </div>
          </div>

          <Row>
            <Col md={12}>
              <div 
                className="d-flex align-items-center bg-white rounded px-3 border border-secondary-subtle w-100" 
                style={{ height: '38px' }}
              >
                <FaCalendarAlt className="text-primary me-2" size={30}/>
                <Form.Control 
                  type="date" 
                  className="bg-transparent border-0 shadow-none p-0 small" 
                  style={{ width: '100%', fontSize: '14px', cursor: 'pointer' }} 
                  value={filters.from_date} 
                  onChange={(e) => setFilters({...filters, from_date: e.target.value})}
                />
                <span className="text-muted mx-2">|</span>
                <Form.Control 
                  type="date" 
                  className="bg-transparent border-0 shadow-none p-0 small" 
                  style={{ width: '100%', fontSize: '14px', cursor: 'pointer' }} 
                  value={filters.to_date} 
                  onChange={(e) => setFilters({...filters, to_date: e.target.value})}
                />
              </div>
            </Col>
          </Row>

          {can('create inquiry') && (
            <Button variant="primary" className="rounded px-4 fw-medium shadow-sm d-flex align-items-center gap-2 border-0" 
              onClick={()=>handleShowModalInquiry(null)}>
              <FaUserPlus /> NEW INQUIRY
            </Button>
          )}
        </div>
      </div>

      {/* FILTER & TABLE AREA */}
      <div className="flex-grow-1 p-3 d-flex flex-column overflow-hidden">
        <div className="bg-white rounded-3 shadow-sm border d-flex flex-column h-100 overflow-hidden">
          
          <div className="px-3 py-2 bg-light border-bottom">
            <Row className="g-2 align-items-center"> {/* added align-items-center to be sure */}
              {/* SEARCH INPUT */}
              <Col md={4} className="d-flex">
                <InputGroup className="bg-white rounded border shadow-none" style={{ height: '38px' }}>
                  <InputGroup.Text className="bg-transparent border-0 pe-1">
                    {isFetching ? <CircularProgress className="text-primary" size={14} /> : <FaSearch className="text-primary" size={14} />}
                  </InputGroup.Text>
                  <Form.Control 
                    className="border-0 shadow-none small" 
                    placeholder="Search..." 
                    value={searchInfo} 
                    onChange={handleSearchChange} 
                    style={{ fontSize: '14px' }}
                  />
                </InputGroup>
              </Col>

              {/* BRANCH SELECT */}
              <Col md={2} className="d-flex">
                <Form.Select 
                  className="rounded border-secondary-subtle shadow-none small" 
                  style={{ fontSize: '14px', height: '38px' }}
                >
                  <option value="">All Branches</option>
                </Form.Select>
              </Col>

              {/* SOURCE SELECT */}
              <Col md={2} className="d-flex">
                <Form.Select 
                  className="rounded border-secondary-subtle shadow-none small" 
                  style={{ fontSize: '14px', height: '38px' }} 
                  value={userFilterBy} 
                  onChange={handleTypeChange}
                >
                  <option value="">--All Source--</option>
                  <option value="walk-in">Walk-In</option>
                  <option value="referral">Referral</option>
                  <option value="hth">HTH</option>
                  <option value="advertisement">Advertisement</option>
                </Form.Select>
              </Col>

              {/* DATE RANGE */}
              <Col md={4}>
                <div className="d-flex align-items-center justify-content-evenly gap-2 bg-white p-1 rounded shadow-sm border">
                  <FaFilter className="text-primary ms-1" size={15}/>
                  <button 
                      className={`btn btn-sm px-4 rounded ${filterType === 'ALL' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                      onClick={() => setFilterType('ALL')}
                  >
                      All Units
                  </button>
                  <button 
                      className={`btn btn-sm px-4 rounded ${filterType === 'Brand New' ? 'btn-success' : 'btn-outline-success'}`}
                      onClick={() => setFilterType('Brand New')}
                  >
                      Brand New
                  </button>
                  <button 
                      className={`btn btn-sm px-4 rounded ${filterType === 'Used/Repo' ? 'btn-danger' : 'btn-outline-danger'}`}
                      onClick={() => setFilterType('Used/Repo')}
                  >
                      Used/Repo
                  </button>
                </div>
              </Col>
            </Row>
          </div>

          <div className="table-responsive flex-grow-1" style={{ overflowY: 'auto' }}>
            <Table hover className="align-middle mb-0" style={{ minWidth: '1100px' }}>
              <thead className="bg-dark text-white sticky-top" style={{ zIndex: 10 }}>
                <tr className="small text-uppercase fw-bold" style={{ fontSize: '12px' }}>
                  <th width="18%" className="text-warning ps-3 py-3">Customer Information</th>
                  <th width="18%" className="ps-2 py-3">Contact Details</th>
                  <th width="24%" className="ps-3 py-3">Motorcycle Unit</th>
                  <th width="10%" className="text-center py-3">Lead Source</th>
                  <th width="12%" className="text-end ps-3 py-3 ">Cash Price</th>
                  <th width="12%" className="text-end ps-3 py-3">Monthly/Term</th>
                  <th width="8%" className="text-center py-3 ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  [...Array(5)].map((_, i) => <SkeletonRowLoading key={i} columns={7} />)
                ) : (
                  inquiries.map((inquiry, index) => (
                    <tr key={index} className="border-bottom">
                      <td className="ps-3 py-2">
                        <div className="fw-bold text-primary mb-0" style={{ fontSize: '14px' }}>{inquiry.customer.firstName} {inquiry.customer.lastName}</div>
                        <div className="text-secondary fw-medium" style={{ fontSize: '11px' }}>ID-{inquiry.inquiry_id}</div>
                      </td>
                      <td className="text-dark small" style={{ whiteSpace: 'nowrap' }}>
                        <div style={{ fontSize: '14px' }}> <FaMobileAlt size={10} /> {formatShowMobile(inquiry.customer.mobile)}</div>
                        <div className="text-secondary fw-medium" style={{ fontSize: '10px' }}><FaEnvelopeSquare /> {inquiry.customer.email}</div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className={`rounded p-2 me-2 d-flex align-items-center justify-content-center border ${inquiry.unit_type === 'Brand_New' ? 'border-success-subtle bg-success-subtle text-success' : 'border-danger-subtle bg-danger-subtle text-danger'}`}>
                            <FaMotorcycle size={14} />
                          </div>
                          <div style={{ lineHeight: '1.2' }}>
                            <div className="fw-bold text-dark mb-0" style={{ fontSize: '12px' }}>{inquiry.motorBrand} {inquiry.motorModel}</div>
                            <div className="text-muted" style={{ fontSize: '10px' }}>{inquiry.motorColor}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <Badge bg="none" className="text-primary border border-primary-subtle bg-primary-subtle rounded-pill px-3 py-1 fw-semibold" style={{ fontSize: '10px', width: '100%' }}>
                          {inquiry.sourceInquiry || 'WALK-IN'}
                        </Badge>
                      </td>
                      <td className="text-end fw-bold font-monospace text-dark">₱ {formatAmount(inquiry.motorCashprice)}</td>
                      <td className="text-end">
                        <div className="fw-bold text-success font-monospace mb-0">₱ {formatAmount(inquiry.motorMonthlyinstallment)}</div>
                        <div className="text-muted small" style={{ fontSize: '10px' }}>{inquiry.motorInstallmentterm} Months</div>
                      </td>
                      <td className="text-center pe-2">
                        <Dropdown 
                          drop="start" 
                          onToggle={(isOpen) => {
                            if (isOpen) {
                              setActionInquiryId(inquiry.id);
                            } else {
                              setActionInquiryId(prev => (prev === inquiry.id ? null : prev));
                            }
                          }}
                        >
                          <Dropdown.Toggle variant="link" className="p-1 hide-caret shadow-none"
                            onMouseEnter={() => setHoverId(inquiry.id)} onMouseLeave={() => setHoverId(null)}
                            style={{ color: (actionInquiryId === inquiry.id || hoverId === inquiry.id) ? '#ffc107' : '#adb5bd' }}>
                            <FaEllipsisV />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="shadow border-0 rounded-3">
                            <Dropdown.Item 
                              onClick={() => handleShowModalInquiry(inquiry.id)} 
                              className="small py-2 px-3"
                            >
                              <FaEye className="me-2 mb-1 text-info"/> View Inquiry
                            </Dropdown.Item>
                            <Dropdown.Item 
                              onClick={() => handleShowModalCreditApplication(inquiry.customer.id, inquiry.customer.credit_application.id)} 
                              className="small py-2 px-3"
                            >
                              <FaEdit className="me-2 mb-1 text-primary"/> Apply Credit Application
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item 
                              className="small py-2 px-3 text-danger"
                            >
                              <FaTrash className="me-2 mb-1"/> Remove Inquiry
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
          {/* Ilagay ito sa ilalim ng iyong table container */}
          <div className="d-flex justify-content-between align-items-center px-3 py-2 bg-white border-top shadow-sm rounded-bottom-4">
            
            {/* Left Side: Summary Info */}
            <div className="text-muted small">
              Showing <span className="fw-bold text-dark">1</span> to <span className="fw-bold text-dark">10</span> of <span className="fw-bold text-dark">150</span> inquiries
            </div>

            {/* Right Side: Pagination Controls */}
            <nav aria-label="Inquiry pagination">
              <ul className="pagination pagination-sm mb-0 gap-1">
                
                {/* Previous Button */}
                <li className="page-item disabled">
                  <button className="page-link rounded-2 border-0 bg-light text-muted px-3" tabIndex="-1">
                    Previous
                  </button>
                </li>

                {/* Page Numbers */}
                <li className="page-item active shadow-sm" aria-current="page">
                  <button className="page-link rounded-2 border-0 px-3 fw-bold" 
                    style={{ background: 'linear-gradient(45deg, #ffc107, #e0a800)', color: '#000' }}>
                    1
                  </button>
                </li>
                
                <li className="page-item">
                  <button className="page-link rounded-2 border-0 text-dark px-3 hover-bg-light">
                    2
                  </button>
                </li>
                
                <li className="page-item d-none d-md-block">
                  <button className="page-link rounded-2 border-0 text-dark px-3 hover-bg-light">
                    3
                  </button>
                </li>

                <li className="page-item disabled">
                  <span className="page-link border-0 bg-transparent">...</span>
                </li>

                <li className="page-item">
                  <button className="page-link rounded-2 border-0 text-dark px-3 hover-bg-light">
                    15
                  </button>
                </li>

                {/* Next Button */}
                <li className="page-item">
                  <button className="page-link rounded-2 border-0 bg-light text-dark px-3 fw-medium" 
                    style={{ border: '1px solid #dee2e6' }}>
                    Next
                  </button>
                </li>

              </ul>
            </nav>
          </div>
        </div>
      </div>

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
        title={selectedCustomerId ? "Update Inquiry" : "New Inquiry"}
        customerID={selectedCustomerId}
      />
    </div>
  );
}