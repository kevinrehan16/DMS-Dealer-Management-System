import React, { useState, useEffect } from 'react'
import "../../assets/css/Cashier.css"

import { Row, Col, Form, InputGroup, Button, Table, Card, Badge, Dropdown } from 'react-bootstrap';
import { 
  FaSearch, FaCashRegister, FaFileInvoiceDollar, FaEllipsisV, 
  FaPrint, FaFileExport, FaFilter, FaPlus, FaMotorcycle, FaUserAlt 
} from 'react-icons/fa';

import { useCashier, useCreatePayment } from '../../hooks/HookCashier/useCashier';

import SkeletonRowLoading from '../../components/common/Loading/SkeletonRowLoading'

function Cashier() {
  const { data: paymentsData, isLoading } = useCashier();

  const payments = paymentsData?.data || [];

  // const [payments] = useState([
  //   { id: 1, or_no: 'OR-2024-001', customer: 'Juan Dela Cruz', model: 'HONDA PCX 160 CBS', brand: 'HONDA', color: 'Blue', type: 'Monthly', amount: 211162.67, status: 'Posted', branch: 'BTKS' },
  //   { id: 2, or_no: 'OR-2024-002', customer: 'Maria Clara', model: 'HONDA CLICK 125i', brand: 'HONDA', color: 'Blue', type: 'Downpayment', amount: 8000.00, status: 'Posted', branch: 'BTKS' },
  //   { id: 3, or_no: 'OR-2024-003', customer: 'Ricardo Dalisay', model: 'YAMAHA NMAX', brand: 'HONDA', color: 'Blue', type: 'Monthly', amount: 15400.00, status: 'Pending', branch: 'MNL' },
  //   { id: 4, or_no: 'OR-2024-004', customer: 'Elena Gilbert', model: 'HONDA ADV 160', brand: 'HONDA', color: 'Blue', type: 'Reservation', amount: 2000.00, status: 'Posted', branch: 'BTKS' },
  //   { id: 5, or_no: 'OR-2024-005', customer: 'Steve Rogers', model: 'HONDA BEAT', brand: 'HONDA', color: 'Blue', type: 'Full Cash', amount: 68500.00, status: 'Posted', branch: 'CEB' },
  //   { id: 6, or_no: 'OR-2024-006', customer: 'Tony Stark', model: 'HONDA CBR 650R', brand: 'HONDA', color: 'Blue', type: 'Monthly', amount: 45800.00, status: 'Posted', branch: 'BTKS' },
  //   { id: 7, or_no: 'OR-2024-007', customer: 'Natasha Romanoff', model: 'HONDA PCX 160 ABS', brand: 'HONDA', color: 'Blue', type: 'Monthly', amount: 18500.00, status: 'Overdue', branch: 'BTKS' },
  //   { id: 8, or_no: 'OR-2024-008', customer: 'Bruce Banner', model: 'YAMAHA MIO Fazzio', brand: 'HONDA', color: 'Blue', type: 'Monthly', amount: 9200.00, status: 'Posted', branch: 'BTKS' },
  //   { id: 9, or_no: 'OR-2024-009', customer: 'Wanda Maximoff', model: 'SUZUKI RAIDER R150', brand: 'HONDA', color: 'Blue', type: 'Downpayment', amount: 12000.00, status: 'Posted', branch: 'BTKS' },
  //   { id: 10, or_no: 'OR-2024-010', customer: 'Peter Parker', model: 'HONDA CLICK 160', brand: 'HONDA', color: 'Blue', type: 'Monthly', amount: 12500.00, status: 'Pending', branch: 'BTKS' },
  // ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="page-header d-flex align-items-center justify-content-between mb-3">
        <h4 className='m-0 d-flex align-items-center gap-2'>
          <FaCashRegister className='me-2 fs-4'/> CASHIER
        </h4>

        {/* Center: Mini Cards */}
        <div className="d-flex gap-3 flex-grow-1 justify-content-center mx-4">
          {[
            { label: "Today", val: "₱850,230", color: "primary" },
            { label: "Pending", val: "12 Units", color: "warning" },
            { label: "Overdue", val: "8 Pax", color: "danger" }
          ].map((item, i) => (
            <div key={i} className="bg-white px-3 py-2 rounded-3 shadow-sm border-start border-primary border-4" style={{ minWidth: '130px' }}>
              <div className="text-muted fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>{item.label.toUpperCase()}</div>
              <div className={`fw-bold text-${item.color}`} style={{ fontSize: '14px' }}>{item.val}</div>
            </div>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="d-flex gap-2 align-items-center">
          <Button variant="outline-primary" className="border-0 fw-bold d-flex align-items-center gap-2">
            <FaFileExport /> Export
          </Button>
          <Button variant="primary" className="shadow-sm fw-bold px-4 rounded-3 d-flex align-items-center gap-2">
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
            <Button type="submit" variant="primary" className="mt-auto d-flex align-items-center gap-1"><FaCashRegister /> Payment</Button>
          </Col>
        </Row>
        <div className="table-section mt-3">
          <Table striped bordered hover>
            <thead className="bg-light border-bottom">
              <tr>
                <th width="15%" className="py-2 small fw-bold">OR NUMBER</th>
                <th width="18%" className="py-2 small fw-bold">CUSTOMER</th>
                <th width="24%" className="py-2 small fw-bold">UNIT DETAILS</th>
                <th width="12%" className="py-2 small fw-bold text-center">PAYMENT TYPE</th>
                <th width="12%" className="py-2 small fw-bold text-end">AMOUNT PAID</th>
                <th width="10%" className="py-2 small fw-bold text-center">STATUS</th>
                <th width="9%" className="py-2 text-center small fw-bold">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="fw-bold text-primary small">{p.or_number}</td>
                  <td>
                    <div className="fw-medium">{p.customer}</div>
                    <div className="text-muted extra-small" style={{fontSize: '11px'}}><b>Branch</b>: {p.branch_code}</div>
                  </td>
                  <td>
                    <div className="small fw-medium"><FaMotorcycle className='mb-1 me-1' /> {p.inquiry.motorModel}</div>
                    <div className="text-muted extra-small" style={{fontSize: '11px'}}><b>Brand</b>: {p.inquiry.motorBrand} &nbsp;&nbsp;|&nbsp;&nbsp; <b>Color</b>: {p.inquiry.motorColor}</div>
                  </td>
                  <td className='text-center'>
                    <Badge bg="info" className="bg-opacity-10 text-info fw-normal px-2 py-1">
                      {p.type}
                    </Badge>
                  </td>
                  <td className="text-end fw-medium text-dark font-monospace">₱ {p.amount_collected.toLocaleString()}</td>
                  <td className="text-center">
                    <Badge bg="success" className="rounded-pill px-3">
                      {p.status}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <Dropdown drop="start">
                      <Dropdown.Toggle variant="link" className="text-muted p-0 hide-caret">
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="shadow-sm border-0">
                        <Dropdown.Item href="#/print"><FaPrint className="me-2 text-muted"/> Print Receipt</Dropdown.Item>
                        <Dropdown.Item href="#/view"><FaFileInvoiceDollar className="me-2 text-muted"/> View Statement</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/void" className="text-danger">Void Transaction</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

    </div>
  )
}

export default Cashier
