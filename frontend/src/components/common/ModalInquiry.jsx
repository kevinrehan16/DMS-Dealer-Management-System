import React from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { FaSave, FaTimes } from "react-icons/fa";
import "../../assets/css/Modal.css";

const ModalInquiry = ({ show, handleClose, title, onOpenGlobalModal}) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered size="xl" backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <Row className='my-3 mx-1'>
            <h5>Customer Information</h5>
            <br /><br />
            <Col md={6} sm={6} className='px-4'>
              <Form.Group controlId="formSource" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Source</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="source"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formFullName" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Full Name</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      placeholder='Click here...'
                      className="capitalize_text"
                      name="fullName"
                      onClick={onOpenGlobalModal}
                      required
                      readOnly
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formAddress" className="mb-2">
                <Row>
                  <Col xs={4}>
                    <Form.Label className="mb-0">Address</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      as="textarea"
                      className="capitalize_text"
                      name="address"
                      rows={5}
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col md={6} sm={6} className='px-4'>
              <Form.Group controlId="formSalesPerson" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Sales Person</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="salesPerson"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formEmploymentStatus" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Employment Status</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="employmentStatus"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formTelephone" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Telephone #</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="telephone"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formMobile" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Mobile #</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="mobile"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Email Address</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="email"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>

          <Row className='my-3 mx-1'>
            <h5>Motorcycle Interested In</h5>
            <br /><br />
            <Col md={6} sm={6} className='px-4'>
              <Form.Group controlId="formBrand" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Brand</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="brand"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formModel" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Model</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="model"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formSeries" className="mb-2">
                <Row>
                  <Col xs={4}>
                    <Form.Label className="mb-0">Series</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="series"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formSColor" className="mb-2">
                <Row>
                  <Col xs={4}>
                    <Form.Label className="mb-0">Color</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="color"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formChassi" className="mb-2">
                <Row>
                  <Col xs={4}>
                    <Form.Label className="mb-0">Chassis</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="chassis"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formLCP" className="mb-2">
                <Row>
                  <Col xs={4}>
                    <Form.Label className="mb-0">LCP</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="lcp"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formCashPrice" className="mb-2">
                <Row>
                  <Col xs={4}>
                    <Form.Label className="mb-0">Cash Price</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="cashPrice"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formRate" className="mb-2">
                <Row>
                  <Col xs={4}>
                    <Form.Label className="mb-0">Rate</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="rate"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formDiscount" className="mb-2">
                <Row>
                  <Col xs={4}>
                    <Form.Label className="mb-0">Discount</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="discount"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formPromissoryNote" className="mb-2">
                <Row>
                  <Col xs={4}>
                    <Form.Label className="mb-0">Promissory Note</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="promissoryNote"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col md={6} sm={6} className='px-4'>
              <Form.Group controlId="formBranchCode" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Branch Code</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="branchCode"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formInstallmentTerm" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Installment Term</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="installmentTerm"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formDownpayment" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Downpayment</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="downpayment"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formReservation" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Reservation</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="reservation"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formSubsidy" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Subsidy</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="subsidy"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formMonthlyInstallment" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Monthly Installment</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="monthlyInstallment"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formInstallmentPrice" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Installment Price</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="installmentPrice"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formAmountFinance" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Amount Finance</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="amountFinance"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formMonthlyUid" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Monthly UID</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="monthlyUid"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formCustomerType" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Customer Type</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="customerType"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>

        </Modal.Body>

        <Modal.Footer>
           <Button variant="primary" className="d-flex align-items-center justify-content-evenly">
            <FaSave /> Save
          </Button>
          <Button variant="danger" onClick={handleClose} className="d-flex align-items-center justify-content-evenly">
            <FaTimes /> Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalInquiry
