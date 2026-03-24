import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from "react-hook-form"
import { Modal, Table, Row, Col, Form, Card, InputGroup, Button } from 'react-bootstrap'
import { FaTimes, FaSave, FaPlusCircle, FaTrash } from 'react-icons/fa'
import { CircularProgress } from '@mui/material';
import axios from 'axios'
import Swal from 'sweetalert2'

import { calculateAge, computeTotalIncome, computeTotalExpenses } from '../../../utils/computations';

const ModalCreditInvestigation = ({show, handleClose, inquiryId}) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem('token');

  const [isLoadingSave, setIsLoadingSave] = useState(false);

  const { register, handleSubmit, watch, setValue, control, reset } = useForm({
    defaultValues: {
      creditCustomerInformation: {
        inquiry_id: inquiryId,
        cicontactPerson: '',
        cigender: '',
        cibirthday: '',
        cicpage: 0,
        cispouseName: '',
        cispouseGender: '',
        cispouseBirthday: '',
        cisage: 0,
        cicivilStatus: '',
        cieducation: '',
        citinNumber: '',
        cimobile: '',
        cidependentChildren: '',
        cistudyingChildren: '',
        ciotherDependents: '',
        ciPresAddress: '',
        ciPresAddrLenStay: '',
        ciPresAddrMonStay: '',
        ciPresAddrType: '',
        ciPresAddrRentFee: '',
        ciPrevAddress: '',
        ciPrevAddrLenStay: '',
        ciPrevAddrMonStay: '',
        ciProvAddress: '',
        ciEmployedBy: '',
        ciEmpAddrEmp: '',
        ciEmpAddrLenStay: '',
        ciEmpAddrMonStay: '',
        ciEmpStatus: '',
        ciEmpDesignation: '',
        ciEmpTelNo: '',
        ciEmpPrevEmp: '',
        ciEmpPrevAddrEmp: '',
        ciEmpSpouseEmp: '',
        ciEmpSpouseEmpAddr: '',
        ciEmpSpousePosition: '',
        ciEmpPrevTelNo: '',
        ciIncomeSalaryNet: '',
        ciSpouseIncome: '',
        ciRentalIncome: '',
        ciBusinessNet: '',
        ciOthers: '',
        ciTotalIncome: '',
        ciExpenseLiving: '',
        ciExpenseRent: '',
        ciExpenseSchooling: '',
        ciExpenseInsurance: '',
        ciExpenseElectWat: '',
        ciExpenseObligation: '',
        ciExpenseLoan: '',
        ciExpenseTotal: '',
        ciCheckingAccount: '',
        ciCAAddrr: '',
        ciSavingsAccount: '',
        ciSAAddrr: '',
      },

      otherSourceOfIncome: [{ osisource: '', osiamount: '' }],
      creditReferences: [
        { crcreditor: '', craddress: '', crdategranted: '', crorigbalance: '', crpresbalance: '', crmoinstallment: '' }
      ],
      personalReferences: [
        { prname: '', praddress: '', prcontact: '', prrelation: '' }
      ],
      personalProperties: [
        { ppkind: '', pplocation: '', ppvalue: '', ppimbursement: '' }
      ],
    }
  });

  const { fields: fieldsSi, append: appendSi, remove: removeSi } = useFieldArray({
    control,
    name: "otherSourceOfIncome"
  });

  const { fields: fieldsCr, append: appendCr, remove: removeCr } = useFieldArray({
    control,
    name: "creditReferences"
  });

  const { fields: fieldsPr, append: appendPr, remove: removePr } = useFieldArray({
    control,
    name: "personalReferences"
  });

  const { fields: fieldsPp, append: appendPp, remove: removePp } = useFieldArray({
    control,
    name: "personalProperties"
  });

  const onSubmit = async (data) => {
    setIsLoadingSave(true);
    try {
      const response = await axios.post(`${API_URL}/credit-investigation/save-all`, {
        contactinfo: data.creditCustomerInformation,
        sourceofincome: data.otherSourceOfIncome,
        creditreferences: data.creditReferences,
        personalreferences: data.personalReferences,
        personalproperties: data.personalProperties
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      });

      Swal.fire({
        icon: "success",
        title: "Saved",
        text: "Successfully saved.",
        footer: 'Record has been saved.'
      });
      
      // console.log("Saved:", response.data);
      closeModalInvestigation();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setIsLoadingSave(true);
    }
  };
  
  const closeModalInvestigation = () => {
    handleClose();
    reset()
  }

  // ALL WATCHES HERE...
  // Codes in birthday and age
  const cbirthday = watch("creditCustomerInformation.cibirthday");
  const sbirthday = watch("creditCustomerInformation.cispouseBirthday");
  // Kapag nagbago ang birthday, i-calculate ang age
  useEffect(() => {
    // Para sa Customer
    if (cbirthday) {
      setValue("creditCustomerInformation.cicpage", calculateAge(cbirthday));
    } else {
      setValue("creditCustomerInformation.cicpage", 0); // O kaya '' kung gusto mong blank pag walang bday
    }

    // Para sa Spouse
    if (sbirthday) {
      setValue("creditCustomerInformation.cisage", calculateAge(sbirthday));
    } else {
      setValue("creditCustomerInformation.cisage", 0);
    }
  }, [cbirthday, sbirthday, setValue]);
  // ENDCodes in birthday and age

  // Codes in computing total income
  const incomeFields = watch([
    "creditCustomerInformation.ciIncomeSalaryNet",
    "creditCustomerInformation.ciSpouseIncome",
    "creditCustomerInformation.ciRentalIncome",
    "creditCustomerInformation.ciBusinessNet",
    "creditCustomerInformation.ciOthers"
  ]);
  const currentIncomes = {
    ciIncomeSalaryNet: incomeFields[0],
    ciSpouseIncome: incomeFields[1],
    ciRentalIncome: incomeFields[2],
    ciBusinessNet: incomeFields[3],
    ciOthers: incomeFields[4],
  };
  const totalIncome = computeTotalIncome(currentIncomes);
  useEffect(() => {
    setValue("creditCustomerInformation.ciTotalIncome", totalIncome);
  }, [totalIncome, setValue]);
  // END Codes in computing total income

  // Codes in computing total expenses
  const expenseFields = watch([
    "creditCustomerInformation.ciExpenseLiving",
    "creditCustomerInformation.ciExpenseRent",
    "creditCustomerInformation.ciExpenseSchooling",
    "creditCustomerInformation.ciExpenseInsurance",
    "creditCustomerInformation.ciExpenseElectWat",
    "creditCustomerInformation.ciExpenseObligation",
    "creditCustomerInformation.ciExpenseLoan"
  ]);
  const currentExpenses = {
    ciExpenseLiving: expenseFields[0],
    ciExpenseRent: expenseFields[1],
    ciExpenseSchooling: expenseFields[2],
    ciExpenseInsurance: expenseFields[3],
    ciExpenseElectWat: expenseFields[4],
    ciExpenseObligation: expenseFields[5],
    ciExpenseLoan: expenseFields[6]
  };
  const totalExpenses = computeTotalExpenses(currentExpenses);
  useEffect(() => {
    setValue("creditCustomerInformation.ciExpenseTotal", totalExpenses);
  }, [totalExpenses, setValue]);
  // END Codes in computing total expenses

  useEffect(() => {
    if (inquiryId) {
      setValue("creditCustomerInformation.inquiry_id", inquiryId);
    }
  }, [inquiryId, setValue]);

  return (
    <div>
      <Modal show={show} onHide={closeModalInvestigation} size='xl' backdrop="static" keyboard={false} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Modal Copy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Card className="mb-4">
                <Card.Header className='pt-3'>
                  <Card.Title className='text-bold'>Customer Information</Card.Title>
                </Card.Header>

                <Card.Body>
                  <Form>
                    {/* TOP SECTION */}
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4}>
                            Contact Person
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control 
                                name="cicontactPerson" 
                                {...register("creditCustomerInformation.cicontactPerson")}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4}>
                            Gender <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Select 
                                name="cigender" 
                                {...register("creditCustomerInformation.cigender")}
                            >
                              <option value="">--Select Gender--</option>
                              <option value="Male">Male</option>
                              <option>Female</option>
                            </Form.Select>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4}>
                            Birthday <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <InputGroup>
                              <Form.Control 
                                  name="cibirthday" 
                                  {...register("creditCustomerInformation.cibirthday")}
                                  type="date" 
                                  max={new Date().toISOString().split("T")[0]}
                              />
                              <InputGroup.Text>Age</InputGroup.Text>
                              <Form.Control 
                                  name="cicpage"
                                  {...register("creditCustomerInformation.cicpage")}
                                  readOnly 
                                  disabled
                              />
                            </InputGroup>
                          </Col>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4}>
                            Spouse Name
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control 
                                name="cispouseName" 
                                {...register("creditCustomerInformation.cispouseName")}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4}>
                            Gender
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Select 
                                name="cispouseGender" 
                                {...register("creditCustomerInformation.cispouseGender")}
                            >
                              <option value="">--Select Gender--</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </Form.Select>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4}>
                            Birthday
                          </Form.Label>
                          <Col sm={8}>
                            <InputGroup>
                              <Form.Control 
                                  name="cispouseBirthday" 
                                  {...register("creditCustomerInformation.cispouseBirthday")}
                                  type="date" 
                                  max={new Date().toISOString().split("T")[0]}
                              />
                              <InputGroup.Text>Age</InputGroup.Text>
                              <Form.Control 
                                  name="cisage"
                                  {...register("creditCustomerInformation.cisage")}
                                  readOnly 
                                  disabled
                              />
                            </InputGroup>
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>

                    <hr className='dotted' />

                    {/* BOTTOM SECTION */}
                    <Row className='mt-3'>
                      <Col md={6}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4}>
                            Civil Status <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Select  
                                name="cicivilStatus" 
                                {...register("creditCustomerInformation.cicivilStatus")}
                            >
                              <option>Single</option>
                              <option>Married</option>
                              <option>Widowed</option>
                            </Form.Select>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4}>
                            Education <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Select
                                name="cieducation" 
                                {...register("creditCustomerInformation.cieducation")}
                            >
                              <option>Elementary</option>
                              <option>High School</option>
                              <option>College</option>
                            </Form.Select>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4}>
                            TIN Number <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control 
                                name="citinNumber" 
                                {...register("creditCustomerInformation.citinNumber")}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={4}>
                            Mobile <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                                name="cimobile" 
                                {...register("creditCustomerInformation.cimobile")}
                            />
                          </Col>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={6}>
                            No. of dependent Children
                          </Form.Label>
                          <Col sm={6}>
                            <Form.Control
                                name="cidependentChildren" 
                                {...register("creditCustomerInformation.cidependentChildren")}
                                type="number" 
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={6}>
                            No. of Studying
                          </Form.Label>
                          <Col sm={6}>
                            <Form.Control 
                                name="cistudyingChildren" 
                                {...register("creditCustomerInformation.cistudyingChildren")}
                                type="number" 
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={6}>
                            Other Dependents
                          </Form.Label>
                          <Col sm={6}>
                            <Form.Control
                                name="ciotherDependents" 
                                {...register("creditCustomerInformation.ciotherDependents")}
                                type="number" 
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Header className='pt-3'>
                  <Card.Title className='text-bold'>Address Information</Card.Title>
                </Card.Header>

                <Card.Body>
                  <Form>
                    <Row>
                      {/* LEFT COLUMN */}
                      <Col md={6}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4} className="text-end">
                            Present Address <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              name="ciPresAddress"
                              {...register("creditCustomerInformation.ciPresAddress")}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 align-items-center">
                          <Form.Label column sm={4} className="text-end">
                            Length of Stay <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <InputGroup>
                              <Form.Control 
                                  type="number" 
                                  name="ciPresAddrLenStay"
                                  {...register("creditCustomerInformation.ciPresAddrLenStay")}
                              />
                              <InputGroup.Text>Year/s</InputGroup.Text>
                              <Form.Select
                                  name="ciPresAddrMonStay"
                                  {...register("creditCustomerInformation.ciPresAddrMonStay")}
                              >
                                <option value="">Month</option>
                                <option value="1 Month">1 Month</option>
                                <option value="2 Months">2 Months</option>
                                <option value="3 Months">3 Months</option>
                                <option value="4 Months">4 Months</option>
                                <option value="5 Months">5 Months</option>
                                <option value="6 Months">6 Months</option>
                                <option value="7 Months">7 Months</option>
                                <option value="8 Months">8 Months</option>
                                <option value="9 Months">9 Months</option>
                                <option value="10 Months">10 Months</option>
                                <option value="11 Months">11 Months</option>
                              </Form.Select>
                            </InputGroup>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4} className="text-end"></Form.Label>
                          <Col sm={8}>
                            <Form.Check 
                                inline 
                                type="radio" 
                                label="Own" 
                                name="ciPresAddrType"
                                id='own'
                                {...register("creditCustomerInformation.ciPresAddrType")}
                                value="Own"
                            />
                            <Form.Check 
                                inline 
                                type="radio" 
                                label="Rented" 
                                name="ciPresAddrType"
                                id='rented'
                                {...register("creditCustomerInformation.ciPresAddrType")}
                                value="Rented"
                            />
                            <Form.Check 
                                inline 
                                type="radio" 
                                label="Free House" 
                                name="ciPresAddrType"
                                id='freehouse'
                                {...register("creditCustomerInformation.ciPresAddrType")}
                                value="Free House"
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={4} className="text-end">
                            Monthly Rental Fee
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              type="number"
                              placeholder="0.00"
                              name="ciPresAddrRentFee"
                              {...register("creditCustomerInformation.ciPresAddrRentFee")}
                            />
                          </Col>
                        </Form.Group>
                      </Col>

                      {/* RIGHT COLUMN */}
                      <Col md={6}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4} className="text-end">
                            Previous Address <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              name="ciPrevAddress"
                              {...register("creditCustomerInformation.ciPrevAddress")}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 align-items-center">
                          <Form.Label column sm={4} className="text-end">
                            Length of Stay <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <InputGroup>
                              <Form.Control 
                                  type="number" 
                                  name="ciPrevAddrLenStay"
                                  {...register("creditCustomerInformation.ciPrevAddrLenStay")}
                              />
                              <InputGroup.Text>Year/s</InputGroup.Text>
                              <Form.Select
                                  name="ciPrevAddrMonStay"
                                  {...register("creditCustomerInformation.ciPrevAddrMonStay")}
                              >
                                <option value="">Month</option>
                                <option value="1 Month">1 Month</option>
                                <option value="2 Months">2 Months</option>
                                <option value="3 Months">3 Months</option>
                                <option value="4 Months">4 Months</option>
                                <option value="5 Months">5 Months</option>
                                <option value="6 Months">6 Months</option>
                                <option value="7 Months">7 Months</option>
                                <option value="8 Months">8 Months</option>
                                <option value="9 Months">9 Months</option>
                                <option value="10 Months">10 Months</option>
                                <option value="11 Months">11 Months</option>
                              </Form.Select>
                            </InputGroup>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={4} className="text-end">
                            Prov. Address <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              name="ciProvAddress"
                              {...register("creditCustomerInformation.ciProvAddress")}
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Header className='pt-3'>
                  <Card.Title className='text-bold'>Employment Information</Card.Title>
                </Card.Header>

                <Card.Body>
                  <Form>
                    {/* TOP ROW */}
                    <Row>
                      {/* LEFT */}
                      <Col md={6}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4} className="text-end">
                            Employed By <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control 
                                name="ciEmployedBy"
                                {...register("creditCustomerInformation.ciEmployedBy")}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4} className="text-end">
                            Address of Employer <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                                name="ciEmpAddrEmp"
                                {...register("creditCustomerInformation.ciEmpAddrEmp")}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 align-items-center">
                          <Form.Label column sm={4} className="text-end">
                            Length of Service <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <InputGroup>
                              <Form.Control 
                                  type="number" 
                                  name="ciEmpAddrLenStay"
                                  {...register("creditCustomerInformation.ciEmpAddrLenStay")}
                              />
                              <InputGroup.Text>Year/s</InputGroup.Text>
                              <Form.Select
                                  name="ciEmpAddrMonStay"
                                  {...register("creditCustomerInformation.ciEmpAddrMonStay")}
                              >
                                <option value="">Month</option>
                                <option value="1 Month">1 Month</option>
                                <option value="2 Months">2 Months</option>
                                <option value="3 Months">3 Months</option>
                                <option value="4 Months">4 Months</option>
                                <option value="5 Months">5 Months</option>
                                <option value="6 Months">6 Months</option>
                                <option value="7 Months">7 Months</option>
                                <option value="8 Months">8 Months</option>
                                <option value="9 Months">9 Months</option>
                                <option value="10 Months">10 Months</option>
                                <option value="11 Months">11 Months</option>
                              </Form.Select>
                            </InputGroup>
                          </Col>
                        </Form.Group>
                      </Col>

                      {/* RIGHT */}
                      <Col md={6}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4} className="text-end">
                            Emp. Status <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control 
                                name="ciEmpStatus"
                                {...register("creditCustomerInformation.ciEmpStatus")}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4} className="text-end">
                            Designation <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                                name="ciEmpDesignation"
                                {...register("creditCustomerInformation.ciEmpDesignation")}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={4} className="text-end">
                            Telephone # <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control 
                                name="ciEmpTelNo"
                                {...register("creditCustomerInformation.ciEmpTelNo")}
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>

                    <hr className='dotted' />

                    {/* BOTTOM ROW */}
                    <Row className='mt-3'>
                      {/* LEFT */}
                      <Col md={6}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4} className="text-end">
                            Prev. Employment <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control 
                                name="ciEmpPrevEmp"
                                {...register("creditCustomerInformation.ciEmpPrevEmp")}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4} className="text-end">
                            Address <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control 
                                as="textarea" 
                                rows={2}
                                name="ciEmpPrevAddrEmp"
                                {...register("creditCustomerInformation.ciEmpPrevAddrEmp")}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4} className="text-end">
                            Spouse's Emp. <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control 
                                name="ciEmpSpouseEmp"
                                {...register("creditCustomerInformation.ciEmpSpouseEmp")}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4} className="text-end">
                            Address <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="ciEmpSpouseEmpAddr"
                                {...register("creditCustomerInformation.ciEmpSpouseEmpAddr")}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4} className="text-end">
                            Position <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control 
                                name="ciEmpSpousePosition"
                                {...register("creditCustomerInformation.ciEmpSpousePosition")}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={4} className="text-end">
                            Telephone # <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                                name="ciEmpPrevTelNo"
                                {...register("creditCustomerInformation.ciEmpPrevTelNo")}
                            />
                          </Col>
                        </Form.Group>
                      </Col>

                      {/* RIGHT */}
                      <Col md={6}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={6} className="text-end">
                            Income Salary (NET) <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={6}>
                            <Form.Control 
                                type="number" 
                                name="ciIncomeSalaryNet"
                                {...register("creditCustomerInformation.ciIncomeSalaryNet")}
                                placeholder="0.00"
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={6} className="text-end">
                            Spouse Income
                          </Form.Label>
                          <Col sm={6}>
                            <Form.Control 
                                type="number"
                                name="ciSpouseIncome"
                                {...register("creditCustomerInformation.ciSpouseIncome")}
                                placeholder="0.00"
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={6} className="text-end">
                            Rental Income
                          </Form.Label>
                          <Col sm={6}>
                            <Form.Control 
                                type="number" 
                                name="ciRentalIncome"
                                {...register("creditCustomerInformation.ciRentalIncome")}
                                placeholder="0.00"
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={6} className="text-end">
                            Business Net
                          </Form.Label>
                          <Col sm={6}>
                            <Form.Control 
                                type="number"
                                name="ciBusinessNet"
                                {...register("creditCustomerInformation.ciBusinessNet")}
                                placeholder="0.00"
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={6} className="text-end">
                            Others
                          </Form.Label>
                          <Col sm={6}>
                            <Form.Control 
                                type="number" 
                                name="ciOthers"
                                {...register("creditCustomerInformation.ciOthers")}
                                placeholder="0.00"
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={6} className="text-end fw-semibold">
                            Total (Php)
                          </Form.Label>
                          <Col sm={6}>
                            <Form.Control
                                type="number"
                                readOnly
                                disabled
                                name="ciTotalIncome"
                                {...register("creditCustomerInformation.ciTotalIncome")}
                                placeholder='0.00'
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>

              <Card className="mb-3">
                <Card.Header className='pt-3'>
                  <Card.Title className='text-bold'>Income Information</Card.Title>
                </Card.Header>

                <Card.Body>
                  <Form>
                    <Row>
                      {/* ================= LEFT SIDE ================= */}
                      <Col md={6}>
                        <div className="table-section">
                          <h5 className='text-warning'>Other Sources Of Income</h5>
                          <Table striped bordered hover responsive>
                            <thead>
                              <tr>
                                <th style={{ width: "50%" }}>Source</th>
                                <th style={{ width: "40%" }}>Amount (Php)</th>
                                <th style={{ width: "10%", textAlign: "center" }}>
                                  <Button 
                                    className='tbl-btn' 
                                    size="sm"
                                    onClick={() => appendSi({ osisource: '', osiamount: '' })}
                                  >
                                    <FaPlusCircle />
                                  </Button>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {fieldsSi.map((osi, index) => (
                                <tr key={osi.id}>
                                  <td>
                                    <Form.Control
                                      {...register(`otherSourceOfIncome.${index}.osisource`)} 
                                    />
                                  </td>
                                  <td>
                                    <Form.Control
                                      type="number"
                                      placeholder='0.00'
                                      {...register(`otherSourceOfIncome.${index}.osiamount`)}
                                    />
                                  </td>
                                  <td>
                                    <Button 
                                        variant="danger"  
                                        size="sm"
                                        onClick={() => removeSi(index)}
                                    >
                                      <FaTrash />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                        <hr className='dotted' />
                        {/* BANK INFO */}
                        <Form.Group as={Row} className="mb-3 mt-4">
                          <Form.Label column sm={5}>
                            Checking Account
                          </Form.Label>
                          <Col sm={7}>
                            <Form.Control 
                                placeholder="Name of Bank"
                                name="ciCheckingAccount"
                                {...register("creditCustomerInformation.ciCheckingAccount")}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={5}>
                            Address
                          </Form.Label>
                          <Col sm={7}>
                            <Form.Control 
                                placeholder="Bank address" 
                                name="ciCAAddrr"
                                {...register("creditCustomerInformation.ciCAAddrr")}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-2">
                          <Form.Label column sm={5}>
                            Savings Account
                          </Form.Label>
                          <Col sm={7}>
                            <Form.Control 
                                placeholder="Name of Bank"
                                name="ciSavingsAccount"
                                {...register("creditCustomerInformation.ciSavingsAccount")}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={5}>
                            Address
                          </Form.Label>
                          <Col sm={7}>
                            <Form.Control 
                                placeholder="Bank address" 
                                name="ciSAAddrr"
                                {...register("creditCustomerInformation.ciSAAddrr")}
                            />
                          </Col>
                        </Form.Group>
                      </Col>

                      {/* ================= RIGHT SIDE ================= */}
                      <Col md={6}>
                        <h6 className="mb-3">Expenses (Php)</h6>

                        <Form.Group as={Row} className="mb-2">
                          <Form.Label column sm={6}>Expenses Living</Form.Label>
                          <Col sm={6}>
                            <InputGroup>
                              <InputGroup.Text>Php</InputGroup.Text>
                              <Form.Control 
                                  type="number" 
                                  placeholder="0.00" 
                                  name="ciExpenseLiving"
                                  {...register("creditCustomerInformation.ciExpenseLiving")}
                              />
                            </InputGroup>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-2">
                          <Form.Label column sm={6}>Rent</Form.Label>
                          <Col sm={6}>
                            <InputGroup>
                              <InputGroup.Text>Php</InputGroup.Text>
                              <Form.Control 
                                  type="number" 
                                  placeholder="0.00" 
                                  name="ciExpenseRent"
                                  {...register("creditCustomerInformation.ciExpenseRent")}
                              />
                            </InputGroup>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-2">
                          <Form.Label column sm={6}>Schooling</Form.Label>
                          <Col sm={6}>
                            <InputGroup>
                              <InputGroup.Text>Php</InputGroup.Text>
                              <Form.Control 
                                  type="number" 
                                  placeholder="0.00"
                                  name="ciExpenseSchooling"
                                  {...register("creditCustomerInformation.ciExpenseSchooling")}
                              />
                            </InputGroup>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-2">
                          <Form.Label column sm={6}>Insurance</Form.Label>
                          <Col sm={6}>
                            <InputGroup>
                              <InputGroup.Text>Php</InputGroup.Text>
                              <Form.Control 
                                  type="number" 
                                  placeholder="0.00"
                                  name="ciExpenseInsurance"
                                  {...register("creditCustomerInformation.ciExpenseInsurance")}
                              />
                            </InputGroup>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-2">
                          <Form.Label column sm={6}>Elect. & Water</Form.Label>
                          <Col sm={6}>
                            <InputGroup>
                              <InputGroup.Text>Php</InputGroup.Text>
                              <Form.Control 
                                  type="number" 
                                  placeholder="0.00"
                                  name="ciExpenseElectWat"
                                  {...register("creditCustomerInformation.ciExpenseElectWat")}
                              />
                            </InputGroup>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-2">
                          <Form.Label column sm={6}>Inst. Obligation</Form.Label>
                          <Col sm={6}>
                            <InputGroup>
                              <InputGroup.Text>Php</InputGroup.Text>
                              <Form.Control 
                                  type="number" 
                                  placeholder="0.00" 
                                  name="ciExpenseObligation"
                                  {...register("creditCustomerInformation.ciExpenseObligation")}
                              />
                            </InputGroup>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-2">
                          <Form.Label column sm={6}>Loan Repay</Form.Label>
                          <Col sm={6}>
                            <InputGroup>
                              <InputGroup.Text>Php</InputGroup.Text>
                              <Form.Control 
                                  type="number" 
                                  placeholder="0.00" 
                                  name="ciExpenseLoan"
                                  {...register("creditCustomerInformation.ciExpenseLoan")}
                              />
                            </InputGroup>
                          </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mt-3">
                          <Form.Label column sm={6} className="fw-semibold">
                            Total (Php)
                          </Form.Label>
                          <Col sm={6}>
                            <InputGroup>
                              <InputGroup.Text>Php</InputGroup.Text>
                              <Form.Control
                                type="number"
                                readOnly
                                disabled
                                name="ciExpenseTotal"
                                {...register("creditCustomerInformation.ciExpenseTotal")}
                                placeholder="0.00" 
                              />
                            </InputGroup>
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>

              <Card className="mb-3">
                <Card.Header className='pt-3'>
                  <Card.Title className="text-bold">Reference Information</Card.Title>
                </Card.Header>
                <Card.Body>
                  {/* Credit References Table */}
                  <div className="table-section mb-4">
                    <h5 className='text-warning'>Credit References</h5>
                    <Table striped bordered hover responsive>
                      <thead className="table-dark">
                        <tr>
                          <th width="19%">Creditor</th>
                          <th width="20%">Address</th>
                          <th width="14%">Date Granted</th>
                          <th width="14%">Orig. Balance</th>
                          <th width="14%">Pres. Balance</th>
                          <th width="14%">Mo. Installment</th>
                          <th width="5%" className='text-center'>
                            <Button 
                              className='tbl-btn' 
                              size='sm'
                              onClick={()=>appendCr({ crcreditor: '', craddress: '', crdategranted: '', crorigbalance: '', crpresbalance: '', crmoinstallment: '' })}
                            >
                              <FaPlusCircle />
                            </Button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {fieldsCr.map((cr, index) => (
                            <tr key={cr.id}>
                              <td>
                                <Form.Control
                                  type="text"
                                  {...register(`creditReferences.${index}.crcreditor`)}
                                />
                              </td>
                              <td>
                                <Form.Control
                                  type="text" 
                                  {...register(`creditReferences.${index}.craddress`)}
                                />
                              </td>
                              <td>
                                <Form.Control
                                  type="date"
                                  {...register(`creditReferences.${index}.crdategranted`)}
                              />
                              </td>
                              <td>
                                <Form.Control
                                  type="number"
                                  {...register(`creditReferences.${index}.crorigbalance`)}
                                  placeholder='0.00'
                                />
                              </td>
                              <td>
                                <Form.Control
                                  type="number"
                                  {...register(`creditReferences.${index}.crpresbalance`)}
                                  placeholder='0.00'
                                />
                              </td>
                              <td>
                                <Form.Control
                                  type="number"
                                  {...register(`creditReferences.${index}.crmoinstallment`)}
                                  placeholder='0.00'
                                />
                              </td>
                              <td>
                                <Button 
                                  variant="danger"  
                                  size="sm"
                                  onClick={() => removeCr(index)}
                                >
                                  <FaTrash />
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>

                  {/* Personal References Table */}
                  <div className='table-section mb-'>
                    <h5 className='text-warning'>Personal References</h5>
                    <Table striped bordered hover responsive>
                      <thead className="table-dark">
                        <tr>
                          <th width="20%">Name</th>
                          <th width="40%">Address</th>
                          <th width="16%">Contact No.</th>
                          <th width="20%">Relation</th>
                          <th width="5%" className='text-center'>
                            <Button 
                                className='tbl-btn' 
                                size='sm'
                                onClick={()=>appendPr({ 
                                  prname: '', praddress: '', prcontact: '', prrelation: ''
                                })}
                            >
                              <FaPlusCircle />
                            </Button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {fieldsPr.map((pr, index) => (
                          <tr key={index}>
                            <td>
                              <Form.Control
                                type="text"
                                {...register(`personalReferences.${index}.prname`)}
                              />
                            </td>
                            <td>
                              <Form.Control
                                type="text"
                                {...register(`personalReferences.${index}.praddress`)}
                              />
                            </td>
                            <td>
                              <Form.Control
                                type="text"
                                {...register(`personalReferences.${index}.prcontact`)}
                                placeholder="+63-999-999-9999"
                              />
                            </td>
                            <td>
                              <Form.Control
                                type="text"
                                {...register(`personalReferences.${index}.prrelation`)}
                              />
                            </td>
                            <td className='text-center'>
                              <Button 
                                className='tbl-btn' 
                                size='sm'
                                variant="danger"
                                onClick={() => removePr(index)}
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>

              <Card className="mb-3">
                <Card.Header className='pt-3'>
                  <Card.Title className='text-bold'>Other Information</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="table-section mb-4">
                    <h5 className='text-warning'>Real And/Or Personal Properties Owned</h5>
                    <Table striped bordered hover responsive>
                      <thead className="table-dark">
                        <tr>
                          <th width="21%">Kind</th>
                          <th width="40%">Location</th>
                          <th width="17%">Value</th>
                          <th width="17%">Imbursement</th>
                          <th width="5%" className='text-center'>
                            <Button 
                              className='tbl-btn' 
                              size='sm'
                              onClick={()=>appendPp({
                                ppkind: '', pplocation: '', ppvalue: '', ppimbursement: '',
                              })}
                            >
                              <FaPlusCircle />
                            </Button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {fieldsPp.map((pp, index) => (
                          <tr key={index}>
                            <td>
                              <Form.Control
                                type="text"
                                {...register(`personalProperties.${index}.ppkind`)}
                              />
                            </td>
                            <td>
                              <Form.Control
                                type="text"
                                {...register(`personalProperties.${index}.pplocation`)}
                              />
                            </td>
                            <td>
                              <Form.Control
                                type="number"
                                placeholder='0.00'
                                {...register(`personalProperties.${index}.ppvalue`)}
                              />
                            </td>
                            <td>
                              <Form.Control
                                type="number"
                                placeholder='0.00'
                                {...register(`personalProperties.${index}.ppimbursement`)}
                              />
                            </td>
                            <td className='text-center'>
                              <Button 
                                className='tbl-btn' 
                                size='sm'
                                variant="danger"
                                onClick={() => removePp(index)}
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row> 

        </Modal.Body>
        <Modal.Footer>
          <button 
            className="btn btn-primary d-flex align-items-center justify-content-center gap-2" 
            onClick={handleSubmit(onSubmit)}
            disabled={isLoadingSave}
          >
            {isLoadingSave ? 
              (<><CircularProgress size={20} color="inherit" /> Saving...</>)
              :
              (<><FaSave /> Save</>)
            }
          </button>
          <button className="btn btn-danger d-flex align-items-center justify-content-center gap-2" onClick={closeModalInvestigation}><FaTimes /> Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalCreditInvestigation
