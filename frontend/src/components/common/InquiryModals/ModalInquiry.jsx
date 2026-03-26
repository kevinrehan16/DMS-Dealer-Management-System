import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form';
import { useCreateNewInquiry, useEditInquiry } from '../../../hooks/HooksInquiry/useInquiry';

import { Modal, Button, Row, Col, Form, InputGroup } from 'react-bootstrap'
import { CircularProgress } from '@mui/material';
import { FaSave, FaTimes, FaUserCog, FaMotorcycle  } from "react-icons/fa";
import "../../../assets/css/Modal.css";
import ModalMotors from './ModalMotors';
import ModalCustomers from './ModalCustomers';

import { formatAmount, handleAmountBlur, handleAmountFocus, cleanToDouble } from '../../../utils/formatters';
import { computeMotorFinance } from '../../../utils/computations';

import { useAuth } from '../../../context/AuthContext/AuthContext';
import { useNotification } from '../../../context/NotificationContext';

const ModalInquiry = ({ show, handleClose, title, customerID }) => {

  const notify = useNotification();
  const { user } = useAuth();
  const { mutate: createInquiry, isPending: isCreating } = useCreateNewInquiry();
  const { data: inquiryData, isLoading: isFetching } = useEditInquiry(customerID);
  const { register, handleSubmit, watch, setValue, reset, setError, formState: { errors } } = useForm();

  const handleSelectCustomerFromModal = (customer) => {
    // console.log(customer);
    // 1. I-compute ang Full Name
    const fullName = `${customer.firstName} ${customer.lastName}`;

    // 2. I-compute ang Full Address (copy mo yung logic mo dati)
    const finalAddress = [
      customer.address.num,
      customer.address.bldg,
      customer.address.street,
      customer.address.subd,
      customer.address.brgy,
      customer.address.city,
      customer.address.province,
      customer.address.region,
    ].filter(Boolean).join(', ').replace(/\s+/g, ' ').trim();

    // 3. GAMITIN ANG setValue PARA SA REACT-HOOK-FORM
    setValue("customer_id", customer.id);
    setValue("fullName", fullName);
    setValue("address", finalAddress || 'N/A');
    setValue("email", customer.email || 'N/A');
    setValue("mobile", customer.mobile || 'N/A');
    setValue("telno", customer.telno || 'N/A');
  };

  const [showModalCustomer, setShowModalCustomer] = useState(false);
  const handleShowCustomer = () => setShowModalCustomer(true);
  const handleCloseCustomer = () => setShowModalCustomer(false);

  const [showMotorModal, setShowMotorModal] = useState(false);
  const handleMotorList = () => {
    setShowMotorModal(true);
  }

  const handleCloseMotorModal = () => {
    setShowMotorModal(false);
  }

  const handleSelectMotorFromModal = (motor) =>{
    // console.log(motor);

    setValue("motorBrand", motor.motorBrand);
    setValue("motorModel", motor.motorModel);
    setValue("motorColor", motor.motorColor);
    setValue("motorChassis", motor.motorChassis);
    setValue("motorSeries", motor.motorSeries);
    setValue("motorLcp", motor.motorLcp);
    setValue("motorCashprice", formatAmount(motor.motorCashprice));
    setValue("motorInstallmentPrice", formatAmount(motor.motorSrpValue));
  }

  const watchedFields = watch([
    "motorInstallmentPrice",
    "motorLcp",
    "motorDownpayment",
    "motorSubsidy",
    "motorReservation",
    "motorRate",
    "motorInstallmentterm"
  ]);

  // I-destructure natin para madaling gamitin sa compute function
  const [
    installmentPrice, 
    lcp, 
    downpayment, 
    subsidy, 
    reservation, 
    rate, 
    term
  ] = watchedFields;

  useEffect(() => {
    const unformat = (val) => String(val || "0").replace(/,/g, "");
    const result = computeMotorFinance({
      motorInstallmentPrice: unformat(installmentPrice),
      motorLcp: unformat(lcp),
      motorDownpayment: unformat(downpayment),
      motorSubsidy: unformat(subsidy),
      motorReservation: unformat(reservation),
      motorRate: unformat(rate),
      motorInstallmentterm: unformat(term),
    });

    // I-update ang mga calculated fields gamit ang setValue
    setValue("motorAmountfinance", formatAmount(result.totalFinance));
    setValue("motorMonthlyinstallment", formatAmount(result.monthlyInstallment));
    setValue("motorPromnote", formatAmount(result.promissoryNote));
    setValue("motorMonthlyuid", formatAmount(result.uid));
  }, [watchedFields, setValue]);
  
  const saveNewInquiry = (data) => {
    const payload = {
      ...data,
      motorLcp: cleanToDouble(data.motorLcp),
      motorCashprice: cleanToDouble(data.motorCashprice),
      motorDiscount: cleanToDouble(data.motorDiscount),
      motorDownpayment: cleanToDouble(data.motorDownpayment),
      motorReservation: cleanToDouble(data.motorReservation),
      motorAmountfinance: cleanToDouble(data.motorAmountfinance),
      motorMonthlyinstallment: cleanToDouble(data.motorMonthlyinstallment),
      motorPromnote: cleanToDouble(data.motorPromnote),
      motorMonthlyuid: cleanToDouble(data.motorMonthlyuid),
      motorInstallmentPrice: cleanToDouble(data.motorInstallmentPrice),
      motorSubsidy: cleanToDouble(data.motorSubsidy),
      motorRate: cleanToDouble(data.motorRate),
      // Siguraduhin na ang Term ay Number din at hindi lumalagpas sa 3 characters
      motorInstallmentterm: parseInt(data.motorInstallmentterm || 0),
    };
    
    createInquiry(payload, {
      onSuccess: (response) => {
        notify.alertMsg(
          response.data.message || "New Inquiry Saved!", 
          "New inquiry has beed saved successfully.",
          "success",
          "New Inquiry Saved."
        );
        // console.log("Successfully Added Data from Server:", response.data);
        reset();
        handleClose();
      },
      onError: (error) => {
        // Check kung validation error galing sa Laravel (Status 422)
        if (error.response && error.response.status === 422) {
          const backendErrors = error.response.data.errors;
          // I-loop ang errors para mag-pula ang textboxes
          Object.keys(backendErrors).forEach((field) => {
            setError(field, {
              type: "server",
              message: backendErrors[field][0], // Kunin yung unang error message
            });
          });
        }
      }
    });
  }

  useEffect(() => {
    if (!show) return;

      if (customerID && inquiryData) {
        // EDIT MODE: Punuin ang form
        const raw = inquiryData.data;

        const formattedData = {
        ...raw,
        // Eto ang mga fields na gusto mong lagyan ng commas at decimals
        motorLcp: formatAmount(raw.motorLcp),
        motorCashprice: formatAmount(raw.motorCashprice),
        motorDiscount: formatAmount(raw.motorDiscount),
        motorDownpayment: formatAmount(raw.motorDownpayment),
        motorReservation: formatAmount(raw.motorReservation),
        motorSubsidy: formatAmount(raw.motorSubsidy),
        motorMonthlyinstallment: formatAmount(raw.motorMonthlyinstallment),
      };
      
        // console.log(formattedData);
        reset(formattedData);
      } else {
        // ADD MODE: Linisin ang form
        reset({ 
          fullName: '',
          customer_id: '',
          address: '',
          email: '',
          mobile: '',
          telno: '',
          sourceInquiry: '',
          salesPersonid: user?.userid,
          employmentStatus: '',
          motorBrand: '',
          motorModel: '',
          motorSeries: '',
          motorColor: '',
          motorChassis: '',
          motorLcp: "0.00",
          motorCashprice: "0.00",
          motorRate: "0.00",
          motorDiscount: "0.00",
          motorPromnote: "0.00",
          motorBranchcode: '',
          motorInstallmentterm: "0",
          motorDownpayment: "0.00",
          motorReservation: "0.00",
          motorSubsidy: "0.00",
          motorMonthlyinstallment: "0.00",
          motorInstallmentPrice: "0.00",
          motorAmountfinance: "0.00",
          motorMonthlyuid: "0.00",
          motorCustomertype: '',
        });
      }
    }, [customerID, inquiryData, reset, show, user]);

    return (
      <div>
        <Modal show={show} onHide={handleClose} size="xl" backdrop="static" keyboard={false}>
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
                  {...register("customer_id")}
                  required
                />
                {/* END Hidden IDs here.. */}
                <Form.Group controlId="formSource" className="mb-2">
                  <Row>
                    <Col xs={4} className="d-flex align-items-center">
                      <Form.Label className="mb-0">Source</Form.Label>
                    </Col>
                    <Col xs={8}>
                      <Form.Select 
                        name="sourceInquiry" 
                        {...register("sourceInquiry")} 
                        className={errors.sourceInquiry ? 'is-invalid' : ''}
                        required>
                          <option value="">-- Select Source --</option>
                          <option value="Walk-in">Walk-In</option>
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
                      <InputGroup className='input-search-cursor' onClick={handleShowCustomer}>
                        <Form.Control
                          type="text"
                          placeholder='Click here...'
                          className={`capitalize_text input-search-cursor ${errors.customer_id ? 'is-invalid' : ''}`}
                          name="fullName"
                          {...register("fullName")}
                          required
                          readOnly
                        />
                        <InputGroup.Text>
                          <FaUserCog />
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
                        {...register("address")}
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
                      {/* PWEDE NATONG ALISIN */}
                      <Form.Control
                        type="hidden"
                        className="capitalize_text"
                        name="salesPersonid"
                        {...register("salesPersonid")}
                        readOnly
                        disabled
                        required
                      />
                      {/* END PWEDE NATONG ALISIN */}
                      <Form.Control
                        type="text"
                        className="capitalize_text"
                        value={`${user.firstName} ${user.lastName}`}
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
                      <Form.Select 
                        name="employmentStatus" 
                        className={errors.employmentStatus ? 'is-invalid' : ''}
                        {...register("employmentStatus")} 
                        required>
                          <option value="">-- Select Employment Status --</option>
                          <option value="Employed">Employed</option>
                          <option value="Self-Employed">Self-Employed</option>
                          <option value="Unemployed">Unemployed</option>
                          <option value="Student">Student</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formTelno" className="mb-2">
                  <Row>
                    <Col xs={4} className="d-flex align-items-center">
                      <Form.Label className="mb-0">Telephone #</Form.Label>
                    </Col>
                    <Col xs={8}>
                      <Form.Control
                        type="text"
                        className="capitalize_text"
                        name="telno"
                        {...register("telno")}
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
                        {...register("mobile")}
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
                        name="email"
                        {...register("email")}
                        readOnly
                        disabled
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>

            <hr className='dotted' />

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
                      <InputGroup className='input-search-cursor' onClick={handleMotorList}>
                        <Form.Control
                          type="text"
                          className={`capitalize_text input-search-cursor ${errors.motorBrand ? 'is-invalid' : ''} `}
                          name="motorBrand"
                          {...register("motorBrand")}
                          required
                          readOnly
                        />
                        <InputGroup.Text>
                          <FaMotorcycle />
                        </InputGroup.Text>
                      </InputGroup>
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
                        className={`capitalize_text ${errors.motorModel ? 'is-invalid' : ''}`}
                        name="motorModel"
                        {...register("motorModel")}
                        required
                        disabled
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
                        className={`capitalize_text ${errors.motorColor ? 'is-invalid' : ''}`}
                        name="motorColor"
                        {...register("motorColor")}
                        required
                        disabled
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
                        className={`capitalize_text ${errors.motorChassis ? 'is-invalid' : ''}`}
                        name="motorChassis"
                        {...register("motorChassis")}
                        required
                        disabled
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
                        className={`capitalize_text ${errors.motorSeries ? 'is-invalid' : ''}`}
                        name="motorSeries"
                        {...register("motorSeries")}
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
                        className={`capitalize_text text-end ${errors.motorLcp ? 'is-invalid' : ''}`}
                        name="motorLcp"
                        {...register("motorLcp")}
                        readOnly
                        disabled
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
                        className={`capitalize_text text-end ${errors.motorCashprice ? 'is-invalid' : ''}`}
                        name="motorCashprice"
                        {...register("motorCashprice")}
                        readOnly
                        disabled
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
                        className={`capitalize_text ${errors.motorRate ? 'is-invalid' : ''}`}
                        name="motorRate"
                        {...register("motorRate")}
                        required
                      >
                        <option value="0.00">-- Select Rate --</option>
                        <option value="1.12">R1 - (1.12)</option>
                        <option value="1.24">R2 - (1.24)</option>
                        <option value="1.36">R3 - (1.36)</option>
                        <option value="1.48">R4 - (1.48)</option>
                        <option value="1.60">R5 - (1.60)</option>
                        <option value="1.72">R6 - (1.72)</option>
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
                        className={`capitalize_text text-end ${errors.motorDiscount ? 'is-invalid' : ''}`}
                        name="motorDiscount"
                        {...register("motorDiscount")}
                        onBlur={(e) => {
                          register("motorDiscount").onBlur(e); // Tawagin muna ang RHF internal blur
                          handleAmountBlur(e, setValue, 'motorDiscount');
                        }}
                        onFocus={(e) => {
                          handleAmountFocus(e, setValue, 'motorDiscount');
                        }}
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
                        className={`capitalize_text text-end ${errors.motorPromnote ? 'is-invalid' : ''}`}
                        name="motorPromnote"
                        {...register("motorPromnote")}
                        readOnly
                        disabled
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
                        className={`capitalize_text ${errors.motorBranchcode ? 'is-invalid' : ''}`}
                        name="motorBranchcode"
                        {...register("motorBranchcode")}
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
                        className={`capitalize_text ${errors.motorInstallmentterm ? 'is-invalid' : ''}`}
                        name="motorInstallmentterm"
                        {...register("motorInstallmentterm")}
                        required
                      >
                        <option value="0">-- Select Installment Term --</option>
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
                        className={`capitalize_text text-end ${errors.motorDownpayment ? 'is-invalid' : ''}`}
                        name="motorDownpayment"
                        {...register("motorDownpayment")}
                        onBlur={(e) => {
                          register("motorDownpayment").onBlur(e); // Tawagin muna ang RHF internal blur
                          handleAmountBlur(e, setValue, 'motorDownpayment');
                        }}
                        onFocus={(e) => {
                          handleAmountFocus(e, setValue, 'motorDownpayment');
                        }}
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
                        className={`capitalize_text text-end ${errors.motorReservation ? 'is-invalid' : ''}`}
                        name="motorReservation"
                        {...register("motorReservation")}
                        onBlur={(e) => {
                          register("motorReservation").onBlur(e); // Tawagin muna ang RHF internal blur
                          handleAmountBlur(e, setValue, 'motorReservation');
                        }}
                        onFocus={(e) => {
                          handleAmountFocus(e, setValue, 'motorReservation');
                        }}
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
                        className={`capitalize_text text-end ${errors.motorSubsidy ? 'is-invalid' : ''}`}
                        name="motorSubsidy"
                        {...register("motorSubsidy")}
                        onBlur={(e) => {
                          register("motorSubsidy").onBlur(e); // Tawagin muna ang RHF internal blur
                          handleAmountBlur(e, setValue, 'motorSubsidy');
                        }}
                        onFocus={(e) => {
                          handleAmountFocus(e, setValue, 'motorSubsidy');
                        }}
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
                        className={`capitalize_text text-end ${errors.motorMonthlyinstallment ? 'is-invalid' : ''}`}
                        name="motorMonthlyinstallment"
                        {...register("motorMonthlyinstallment")}
                        readOnly
                        disabled
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
                        className={`capitalize_text text-end ${errors.motorInstallmentPrice ? 'is-invalid' : ''}`}
                        name="motorInstallmentPrice"
                        {...register("motorInstallmentPrice")}
                        readOnly
                        disabled
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
                        className={`capitalize_text text-end ${errors.motorAmountfinance ? 'is-invalid' : ''}`}
                        name="motorAmountfinance"
                        {...register("motorAmountfinance")}
                        readOnly
                        disabled
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
                        className={`capitalize_text text-end ${errors.motorMonthlyuid ? 'is-invalid' : ''}`}
                        name="motorMonthlyuid"
                        {...register("motorMonthlyuid")}
                        readOnly
                        disabled
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
                      <Form.Select 
                        name="motorCustomertype" 
                        className={errors.motorCustomertype ? 'is-invalid' : ''}
                        {...register("motorCustomertype")} 
                        required>
                          <option value="">-- Select Customer Type --</option>
                          <option value="Regular">Regular</option>
                          <option value="Employee">Employee</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>

          </Modal.Body>

          <Modal.Footer>
            <Button 
              variant="primary" 
              className="d-flex align-items-center gap-1" 
              onClick={handleSubmit(saveNewInquiry)}
            >
              {isCreating ? 
                (<><CircularProgress size={20} color="inherit" /> Saving...</>)
                :
                (<><FaSave /> Save</>)
              }
            </Button>
            <Button variant="danger" onClick={() => {handleClose();}} className="d-flex align-items-center gap-1">
              <FaTimes /> Close
            </Button>
          </Modal.Footer>
        </Modal>

        <ModalCustomers
            show={showModalCustomer}
            handleClose={handleCloseCustomer}
            onSelectCustomer={handleSelectCustomerFromModal}
        />

      <ModalMotors
        // Pass necessary props here
        show={showMotorModal}
        handleClose={handleCloseMotorModal}
        onSelectMotor={handleSelectMotorFromModal}
      >
      </ModalMotors>
      
    </div>
  )
}

export default React.memo(ModalInquiry);
