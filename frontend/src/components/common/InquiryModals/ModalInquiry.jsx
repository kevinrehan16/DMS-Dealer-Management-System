import React, { useEffect, useState } from 'react'
import { useInquiry } from '../../../context/InquiryContext/InquiryContext';

import { Modal, Button, Row, Col, Form, InputGroup } from 'react-bootstrap'
import { FaSave, FaTimes, FaSearch } from "react-icons/fa";
import "../../../assets/css/Modal.css";
import ModalMotors from './ModalMotors';

import { useAuth } from '../../../context/AuthContext/AuthContext';
import axios from 'axios';

const ModalInquiry = ({ show, handleClose, title, onOpenGlobalModal, refreshInquiries }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const { user } = useAuth();
  const { selectedCustomer } = useInquiry();

  const [formData, setFormData] = useState({
    fullName: '',
    customer_id: '',
    inquiry_id: '',
    address: '',
    email: '',
    mobile: '',
    telephone: '',
    sourceInquiry: '',
    salesPersonid: user.userid,
    employmentStatus: '',
    motorBrand: '',
    motorModel: '',
    motorSeries: '',
    motorColor: '',
    motorChassis: '',
    motorLcp: '',
    motorCashprice: '',
    motorRate: '',
    motorDiscount: '',
    motorPromnote: '',
    motorBranchcode: '',
    motorInstallmentterm: '',
    motorDownpayment: '',
    motorReservation: '',
    motorSubsidy: '',
    motorMonthlyinstallment: '',
    motorInstallmentPrice: '',
    motorAmountfinance: '',
    motorMonthlyuid: '',
    motorCustomertype: '',
  });

  const [showMotorModal, setShowMotorModal] = useState(false);

  const handleMotorList = () => {
    setShowMotorModal(true);
  }

  const handleCloseMotorModal = () => {
    setShowMotorModal(false);
  }

  useEffect(() => {
    if (selectedCustomer) {
      var addressnum = selectedCustomer.addressnum !== null ? selectedCustomer.addressnum + ', ' : '';
      var addressbldg = selectedCustomer.addressbldg !== null ? selectedCustomer.addressbldg + ', ' : '';
      var addressstreet = selectedCustomer.addressstreet !== null ? selectedCustomer.addressstreet + ', ' : '';
      var addressssubd = selectedCustomer.addressssubd !== null ? selectedCustomer.addressssubd + ', ' : '';
      var addressscity = selectedCustomer.addressscity !== null ? selectedCustomer.addressscity + ', ' : '';
      var addresssbrgy = selectedCustomer.addresssbrgy !== null ? selectedCustomer.addresssbrgy + ', ' : '';
      var addresssprovince = selectedCustomer.addresssprovince !== null ? selectedCustomer.addresssprovince + ', ' : '';
      var addresssregion = selectedCustomer.addresssregion !== null ? selectedCustomer.addresssregion : '';
      var finalAddress = `${addressnum} ${addressbldg} ${addressstreet} ${addressssubd} ${addresssbrgy} ${addressscity} ${addresssprovince} ${addresssregion}`.replace(/\s+/g, ' ').trim();

      setFormData((prev) => ({
        ...prev,
        customer_id: selectedCustomer.id || '',
        inquiry_id: `INQ-${Date.now()}`,
        fullName: `${selectedCustomer.firstName} ${selectedCustomer.lastName}`,
        address: finalAddress,
        email: selectedCustomer.email || '',
        mobile: selectedCustomer.mobile || '',
        telephone: selectedCustomer.telephone || 'N/A',
      }));

    }
  }, [selectedCustomer]);

  const handleInputCustomerChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }

  const saveInquiry = () => {
    // Implement save inquiry logic here
    const response = axios.post(`${API_URL}/inquiries`, formData, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then((res) => {
      refreshInquiries();
      console.log('Inquiry saved successfully:', res.data);
      handleClose();
    })
    .catch((error) => {
      console.error('Error saving inquiry:', error);
    }); 
  }

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
              {/* Hidden IDs here.. */}
              <Form.Control
                type="hidden"
                placeholder='Customer ID'
                className="capitalize_text"
                name="customer_id"
                value={formData.customer_id}
                onChange={handleInputCustomerChange}
                required
              />
              <Form.Control
                type="hidden"
                placeholder='Inquiry ID'
                className="capitalize_text"
                name="inquiry_id"
                value={formData.inquiry_id}
                onChange={handleInputCustomerChange}
                required
              />
              {/* END Hidden IDs here.. */}
              <Form.Group controlId="formSource" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Source</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Select name="sourceInquiry" value={formData.sourceInquiry} onChange={handleInputCustomerChange} required>
                      <option value="">-- Select Source --</option>
                      <option value="Walk-In">Walk-In</option>
                      <option value="Referral">Referral</option>
                      <option value="Hth">HTH</option>
                      <option value="Advertisement">Advertisement</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formFullName" className="mb-2">
                <Row>
                  <Col xs={4} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Full Name</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <InputGroup className='input-search-cursor' onClick={onOpenGlobalModal}>
                      <Form.Control
                        type="text"
                        placeholder='Click here...'
                        className="capitalize_text input-search-cursor"
                        name="fullName"
                        value={formData.fullName}
                        required
                        readOnly
                      />
                      <InputGroup.Text>
                        <FaSearch />
                      </InputGroup.Text>
                    </InputGroup>
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
                      value={formData.address}
                      readOnly
                      disabled
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
                      name="salesPersonid"
                      value={formData.salesPersonid}
                      readOnly
                      disabled
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
                    <Form.Select name="employmentStatus" value={formData.employmentStatus} onChange={handleInputCustomerChange} required>
                      <option value="">-- Select Employment Status --</option>
                      <option value="Employed">Employed</option>
                      <option value="Self-Employed">Self-Employed</option>
                      <option value="Unemployed">Unemployed</option>
                      <option value="Student">Student</option>
                    </Form.Select>
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
                      value={formData.telephone}
                      readOnly
                      disabled
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
                      value={formData.mobile}
                      readOnly
                      disabled
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
                      value={formData.email}
                      readOnly
                      disabled
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
                      name="motorBrand"
                      value={formData.motorBrand}
                      onChange={handleInputCustomerChange}
                      onClick={handleMotorList}
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
                      name="motorModel"
                      value={formData.motorModel}
                      onChange={handleInputCustomerChange}
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
                      name="motorSeries"
                      value={formData.motorSeries}
                      onChange={handleInputCustomerChange}
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
                      name="motorColor"
                      value={formData.motorColor}
                      onChange={handleInputCustomerChange}
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
                      name="motorChassis"
                      value={formData.motorChassis}
                      onChange={handleInputCustomerChange}
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
                      name="motorLcp"
                      value={formData.motorLcp}
                      onChange={handleInputCustomerChange}
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
                      name="motorCashprice"
                      value={formData.motorCashprice}
                      onChange={handleInputCustomerChange}
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
                    <Form.Select
                      className="capitalize_text"
                      name="motorRate"
                      value={formData.motorRate}
                      onChange={handleInputCustomerChange}
                      required
                    >
                      <option value="0">-- Select Rate --</option>
                      <option value="1.12">R1</option>
                      <option value="1.24">R2</option>
                      <option value="1.36">R3</option>
                      <option value="1.48">R4</option>
                      <option value="1.60">R5</option>
                      <option value="1.72">R6</option>
                    </Form.Select>
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
                      name="motorDiscount"
                      value={formData.motorDiscount}
                      onChange={handleInputCustomerChange}
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formPromNote" className="mb-2">
                <Row>
                  <Col xs={4}>
                    <Form.Label className="mb-0">Promissory Note</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      className="capitalize_text"
                      name="motorPromnote"
                      value={formData.motorPromnote}
                      onChange={handleInputCustomerChange}
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
                      name="motorBranchcode"
                      value={formData.motorBranchcode}
                      onChange={handleInputCustomerChange}
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
                    <Form.Select
                      className="capitalize_text"
                      name="motorInstallmentterm"
                      value={formData.motorInstallmentterm}
                      onChange={handleInputCustomerChange}
                      required
                    >
                      <option value="">-- Select Installment Term --</option>
                      <option value="3">3 Months</option>
                      <option value="6">6 Months</option>
                      <option value="12">12 Months</option>
                      <option value="24">24 Months</option>
                      <option value="36">36 Months</option>
                    </Form.Select>
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
                      name="motorDownpayment"
                      value={formData.motorDownpayment}
                      onChange={handleInputCustomerChange}
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
                      name="motorReservation"
                      value={formData.motorReservation}
                      onChange={handleInputCustomerChange}
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
                      name="motorSubsidy"
                      value={formData.motorSubsidy}
                      onChange={handleInputCustomerChange}
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
                      name="motorMonthlyinstallment"
                      value={formData.motorMonthlyinstallment}
                      onChange={handleInputCustomerChange}
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
                      name="motorInstallmentPrice"
                      value={formData.motorInstallmentPrice}
                      onChange={handleInputCustomerChange}
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
                      name="motorAmountfinance"
                      value={formData.motorAmountfinance}
                      onChange={handleInputCustomerChange}
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
                      name="motorMonthlyuid"
                      value={formData.motorMonthlyuid}
                      onChange={handleInputCustomerChange}
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
                      name="motorCustomertype"
                      value={formData.motorCustomertype}
                      onChange={handleInputCustomerChange}
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>

        </Modal.Body>

        <Modal.Footer>
           <Button variant="primary" className="d-flex align-items-center justify-content-evenly" onClick={saveInquiry}>
            <FaSave /> Save
          </Button>
          <Button variant="danger" onClick={handleClose} className="d-flex align-items-center justify-content-evenly">
            <FaTimes /> Close
          </Button>
        </Modal.Footer>
      </Modal>


      <ModalMotors
        // Pass necessary props here
        show={showMotorModal}
        handleClose={handleCloseMotorModal}
      >

      </ModalMotors>

    </div>
  )
}

export default ModalInquiry
