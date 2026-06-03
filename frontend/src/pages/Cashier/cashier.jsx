import React, { useState, useEffect } from 'react'
import "../../assets/css/Cashier.css"

import { Row, Col, Form, InputGroup, Button, Table, Badge, Dropdown } from 'react-bootstrap';
import { 
  FaSearch, FaCashRegister, FaFileInvoiceDollar, FaEllipsisV, 
  FaPrint, FaFileExport, FaMoneyBill, FaPlus, FaMotorcycle 
} from 'react-icons/fa';

import { useCashier } from '../../hooks/HookCashier/useCashier';
import { formatAmount } from '../../utils/formatters' 

import SkeletonRowLoading from '../../components/common/Loading/SkeletonRowLoading'
import PaymentModal from '../../components/common/CashierModals/PaymentModal';

function Cashier() {
  const { data: paymentsData, isLoading } = useCashier();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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
              <small className="text-muted" style={{ fontSize: '11px' }}>Payment records management</small>
            </div>
          </div>
          {/* Right: Actions */}
          <div className="animate__animated animate__fadeIn d-flex gap-2 align-items-center justify-content-end">
            <div className="d-flex gap-2 align-items-center">
              <Button size="md"  variant="outline-secondary" className="border-0 fw-bold d-flex align-items-center gap-2">
                <FaFileExport /> Export
              </Button>
              <Button size="md"  variant="primary" className="shadow-sm fw-bold px-4 rounded-3 d-flex align-items-center gap-2">
                <FaPlus /> NEW PAYMENT
              </Button>
            </div>
            
          </div>
          
        </div>
      </div>

      <div className="flex-grow-1 p-3 d-flex flex-column overflow-hidden">
        <div className="bg-white rounded-3 shadow-sm border d-flex flex-column h-100 overflow-hidden">
          <div className="px-3 py-2 bg-light border-bottom">
            <Row className="g-2 align-items-center">
              {/* SEARCH INPUT */}
              <Col md={11} className="d-flex">
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
              <Col md={1}>
                <Button 
                onClick={()=>setShowPaymentModal(true)}
                type="submit" 
                variant="primary" 
                className="mt-auto d-flex align-items-center gap-1">
                  <FaMoneyBill /> Payment
                </Button>
              </Col>
            </Row>
            <div className="table-section mt-3">
              <Table striped bordered hover style={{ fontSize: '0.875rem' }}>
                <thead className="bg-light border-bottom">
                  <tr>
                    <th width="12%">OR NUMBER</th>
                    <th width="18%">CUSTOMER</th>
                    <th width="25%">UNIT DETAILS</th>
                    <th width="14%" className="text-center">PAYMENT TYPE</th>
                    <th width="12%" className="text-end">AMOUNT PAID</th>
                    <th width="10%" className="text-center">STATUS</th>
                    <th width="9%" className="text-center">ACTIONS</th>
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
                        <td className="fw-bold text-primary small">{p.or_number}</td>
                        <td>
                          <div className="fw-medium">
                            {p.inquiry.customer.firstName} {p.inquiry.customer.lastName}
                          </div>
                          <div className="text-muted extra-small" style={{ fontSize: "11px" }}>
                            <b>Branch</b>: {p.branch_code}
                          </div>
                        </td>
                        <td>
                          <div className="small fw-medium">
                            <FaMotorcycle className="mb-1 me-1" /> {p.inquiry.motorModel}
                          </div>
                          <div className="text-muted extra-small" style={{ fontSize: "11px" }}>
                            <b>Brand</b>: {p.inquiry.motorBrand} &nbsp;&nbsp;|&nbsp;&nbsp; <b>Color</b>: {p.inquiry.motorColor}
                          </div>
                        </td>
                        <td className="text-center">
                          <Badge bg="info" className="bg-opacity-20 text-white fw-normal px-2 py-1">
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
                          <Dropdown drop="start">
                            <Dropdown.Toggle variant="link" className="text-muted p-0 hide-caret">
                              <FaEllipsisV />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="shadow-sm border-0">
                              <Dropdown.Item href="#/print">
                                <FaPrint className="me-2 text-muted" /> Print Receipt
                              </Dropdown.Item>
                              <Dropdown.Item href="#/view">
                                <FaFileInvoiceDollar className="me-2 text-muted" /> View Statement
                              </Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item href="#/void" className="text-danger">
                                Void Transaction
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
      </div>

      <PaymentModal 
      show={showPaymentModal}
      handleClose={()=>setShowPaymentModal(false)}
      />
    </div>
  )
}

export default Cashier
