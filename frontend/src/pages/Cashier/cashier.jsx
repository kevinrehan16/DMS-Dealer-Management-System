import React, { useState } from 'react'
import "../../assets/css/Cashier.css"

import { Row, Col, Form, InputGroup, Button, Table, Badge, Dropdown } from 'react-bootstrap';
import { 
  FaSearch, FaCashRegister, FaFileInvoiceDollar, FaEllipsisV, FaCalendarAlt,
  FaPrint, FaFileExport, FaMoneyBill, FaPlus, FaMotorcycle 
} from 'react-icons/fa';

import { useCashier } from '../../hooks/HookCashier/useCashier';
import { formatAmount } from '../../utils/formatters' 

import SkeletonRowLoading from '../../components/common/Loading/SkeletonRowLoading'
import PaymentModal from '../../components/common/CashierModals/PaymentModal';

function Cashier() {
  const { data: paymentsData, isLoading } = useCashier();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [actionCashierId, setActionCashierId] = useState(null);
  const [hoverId, setHoverId] = useState(null);

  const payments = paymentsData?.data || [];

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', width: '100%', backgroundColor: '#f8f9fa', overflow: 'hidden' }}>

      {/* HEADER SECTION */}
      <div className="bg-white border-bottom shadow-sm px-3 py-2">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="icon-box-float text-dark">
              <FaCashRegister size={20}/>
            </div>
            <div>
              <h5 className="fw-bold mb-0 text-dark">CASHIER</h5>
              <small className="text-muted" style={{ fontSize: '11px' }}>Smart Cashier & Payment Management</small>
            </div>
          </div>
          {/* Right: Actions */}
          <div className="animate__animated animate__fadeIn d-flex gap-2 align-items-center justify-content-end">
            <div className="d-flex gap-2 align-items-center">
              <Button size="md"  variant="outline-secondary" className="border-0 fw-bold d-flex align-items-center gap-2">
                <FaFileExport /> Export
              </Button>
              <Button 
                size="md" 
                variant="primary" 
                className="shadow-sm fw-bold px-4 rounded-3 d-flex align-items-center gap-2"
                onClick={() => setShowPaymentModal(true)}
              >
                <FaPlus /> NEW PAYMENT
              </Button>
            </div>
            
          </div>
          
        </div>
      </div>

      <div className="flex-grow-1 p-3 d-flex flex-column overflow-hidden">
        <div className="bg-white rounded-3 shadow-sm border d-flex flex-column h-100 overflow-hidden">
          <div className="px-2 py-2 bg-light border-bottom">
            <Row className="g-2 align-items-center">
              {/* SEARCH INPUT */}
              <Col md={4} className="d-flex">
                <InputGroup className="bg-white rounded border shadow-none" style={{ height: '38px' }}>
                  <InputGroup.Text className="bg-transparent border-0 pe-1">
                    <FaSearch className="text-primary" size={14} />
                  </InputGroup.Text>
                  <Form.Control 
                    className="border-0 shadow-none small" 
                    placeholder="Search..." 
                    style={{ fontSize: '14px' }}
                  />
                </InputGroup>
              </Col>
              <Col md={2}>
                <Form.Select 
                  size="md" 
                  style={{ fontSize: '14px', height: '38px' }}
                >
                  <option value="">--Filter by Status--</option>
                  <option value="RESERVATION">Reservation</option>
                  <option value="DOWNPAYMENT">Down Payment</option>
                  <option value="MONTHLY_INSTALLMENT">Monthly Installment</option>
                  <option value="PARTIAL_PAYMENT">Partial Payment</option>
                  <option value="FULL_CASH">Full-Cash</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                </Col>
                <Col md={4}>
                  <div 
                    className="d-flex align-items-center bg-white rounded px-3 border border-secondary-subtle w-100" 
                    style={{ height: '38px' }}
                  >
                    <FaCalendarAlt className="text-primary me-2" size={30}/>
                    <Form.Control 
                      type="date" 
                      className="bg-transparent border-0 shadow-none p-0 small" 
                      style={{ width: '100%', fontSize: '14px', cursor: 'pointer' }} 
                      // value={filters.from_date} 
                      // onChange={(e) => setFilters({...filters, from_date: e.target.value})}
                    />
                    <span className="text-muted mx-2">|</span>
                    <Form.Control 
                      type="date" 
                      className="bg-transparent border-0 shadow-none p-0 small" 
                      style={{ width: '100%', fontSize: '14px', cursor: 'pointer' }} 
                      // value={filters.to_date} 
                      // onChange={(e) => setFilters({...filters, to_date: e.target.value})}
                    />
                  </div>
                </Col>
            </Row>
          </div>
          <div className="table-responsive flex-grow-1" style={{ overflowY: 'auto' }}>
            <Table hover className="align-middle mb-0" style={{ minWidth: '1100px' }}>
              <thead className="bg-dark text-white sticky-top" style={{ zIndex: 10 }}>
                <tr className="small text-uppercase fw-bold" style={{ fontSize: '12px' }}>
                  <th width="12%" className="ps-3 py-3">OR NUMBER</th>
                  <th width="18%" className="ps-3 py-3">CUSTOMER INFORMATION</th>
                  <th width="25%" className="ps-3 py-3">MOTORCYCLE UNIT</th>
                  <th width="14%" className="text-center ps-2 py-3">PAYMENT TYPE</th>
                  <th width="12%" className="text-end ps-3 py-3">AMOUNT PAID</th>
                  <th width="10%" className="text-center ps-2 py-3">STATUS</th>
                  <th width="9%" className="text-center ps-2 py-3">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  [...Array(5)].map((_, index) => (
                    <SkeletonRowLoading key={index} columns={7} />
                  ))
                ) : payments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center text-muted py-4">
                      No payments found.
                    </td>
                  </tr>
                ) : (
                  /* Dito tinanggal ang extra { } dahil redundant na ito sa loob ng ternary */
                  payments.map((p) => (
                    <tr key={p.id}>
                      <td className="fw-bold text-info small ps-3 py-2">{p.or_number}</td>
                      
                      <td className="ps-3 py-2">
                        <div className="fw-bold text-primary mb-0" style={{ fontSize: '14px' }}>{p.inquiry.customer.firstName} {p.inquiry.customer.lastName}</div>
                        <div className="text-secondary fw-medium" style={{ fontSize: '11px' }}>ID-{p.inquiry.inquiry_id}</div>
                      </td>
                      <td className="text-dark small ps-3 py-2" style={{ whiteSpace: 'nowrap' }}>
                        <div className="d-flex align-items-center">
                          <div className={`rounded p-2 me-2 d-flex align-items-center justify-content-center border ${p.inquiry.unit_type === 'Brand_New' ? 'border-success-subtle bg-success-subtle text-success' : 'border-danger-subtle bg-danger-subtle text-danger'}`}>
                            <FaMotorcycle size={14} />
                          </div>
                          <div style={{ lineHeight: '1.2' }}>
                            <div className="fw-bold text-dark mb-0" style={{ fontSize: '12px' }}>{p.inquiry.motorBrand} {p.inquiry.motorModel}</div>
                            <div className="text-muted" style={{ fontSize: '10px' }}>{p.inquiry.motorColor}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <Badge bg="info" className="bg-opacity-20 text-white fw-normal px-2 py-1 rounded-pill">
                          {p.payment_type.replace(/_/g, ' ')}
                        </Badge>
                      </td>
                      <td className="text-end fw-medium text-dark font-monospace">
                        ₱ {formatAmount(p.amount_collected)}
                      </td>
                      <td className="text-center">
                        <Badge bg="success" className="rounded-pill px-3" style={{ fontSize: '10px' }}>
                          {p.status}
                        </Badge>
                      </td>
                      <td className="text-center">
                        <Dropdown 
                          drop="start" 
                          onToggle={(isOpen) => {
                            if (isOpen) {
                              setActionCashierId(p.id);
                            } else {
                              setActionCashierId(prev => (prev === p.id ? null : prev));
                            }
                          }}
                        >
                          <Dropdown.Toggle variant="link" className="p-1 hide-caret shadow-none"
                            onMouseEnter={() => setHoverId(p.id)} onMouseLeave={() => setHoverId(null)}
                            style={{ color: (actionCashierId === p.id || hoverId === p.id) ? '#ffc107' : '#adb5bd' }}>
                            <FaEllipsisV />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="shadow border-0 rounded-3">
                            <Dropdown.Item 
                              className="small py-2 px-3"
                            >
                              <FaPrint className="me-2 mb-1 text-muted" /> Print Receipt
                            </Dropdown.Item>
                            <Dropdown.Item 
                              className="small py-2 px-3"
                            >
                              <FaFileInvoiceDollar className="me-2 mb-1 text-muted" /> View Statement
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item 
                              className="small py-2 px-3 text-danger"
                            >
                              <FaMoneyBill className="me-2 mb-1"/> Void Transaction
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
      </div>

      <PaymentModal 
      show={showPaymentModal}
      handleClose={()=>setShowPaymentModal(false)}
      />
    </div>
  )
}

export default Cashier
