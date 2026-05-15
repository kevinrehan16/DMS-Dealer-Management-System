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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="page-header d-flex align-items-center justify-content-between mb-3">
        <h4 className='m-0 d-flex align-items-center gap-2'>
          <FaCashRegister className='fs-4'/> CASHIER
        </h4>

        {/* Right: Actions */}
        <div className="d-flex gap-2 align-items-center">
          <Button size="sm"  variant="outline-primary" className="border-0 fw-bold d-flex align-items-center gap-2">
            <FaFileExport /> Export
          </Button>
          <Button size="sm"  variant="primary" className="shadow-sm fw-bold px-4 rounded-3 d-flex align-items-center gap-2">
            <FaPlus /> NEW PAYMENT
          </Button>
        </div>
      </div>

      <div className="content-page">
        <Row>
          <Col md={11}>
            <Form className="filter-form">
              <Row className="align-items-end">
                <Col md={4}>
                  <Form.Group controlId="search">
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Search customer..."
                      />
                      <InputGroup.Text>
                        <FaSearch />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>

              </Row>
            </Form>
          </Col>
          <Col md={1} className="d-flex justify-content-end">
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

      <PaymentModal 
      show={showPaymentModal}
      handleClose={()=>setShowPaymentModal(false)}
      />
    </div>
  )
}

export default Cashier
