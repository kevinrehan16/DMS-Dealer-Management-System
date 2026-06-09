import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from "react-hook-form"
import { Modal, Table, Row, Col, Form, Card, InputGroup, Button } from 'react-bootstrap'
import { FaTimes, FaSave, FaPlusCircle, FaTrash } from 'react-icons/fa'
import { CircularProgress } from '@mui/material';
import axios from 'axios'
import Swal from 'sweetalert2'

import { useCreditInvestigation, useCreateCreditInvestigation, useUpdateCreditInvestigation } from '../../../hooks/HooksCreditInv/useCreditInvestigation';

import { calculateAge, computeTotalIncome, computeTotalExpenses } from '../../../utils/computations';

const ModalCreditInvestigation = ({show, handleClose, inquiryId, creditinvestId}) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = sessionStorage.getItem('token');
  const { mutate: createCreditInvestigation, isPending: isCreatingCi } = useCreateCreditInvestigation();
  const { mutate: updateCreditInvestigation, isPending: isUpdatingCi } = useUpdateCreditInvestigation();
  const { data, isLoading, isError, error } = useCreditInvestigation(creditinvestId);
  
  const { register, handleSubmit, watch, setValue, control, reset, setError, formState: { errors } } = useForm();

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
    const isUpdate = !!creditinvestId;
    
    const formData = {
      ...data, // Dahil flat na lahat, spread mo lang ang buong 'data'
      // Siguraduhin na ang mga array keys dito ay match sa backend:
      otherSourceOfIncome: data.otherSourceOfIncome || [],
      creditReferences: data.creditReferences || [],
      personalReferences: data.personalReferences || [],
      personalProperties: data.personalProperties || []
    };

    const mutation = isUpdate ? updateCreditInvestigation : createCreditInvestigation;

    await mutation(isUpdate ? { creditinvestId, formData } : formData, {
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "Saved",
                text: "Credit Investigation successfully saved.",
            });
            closeModalInvestigation();
        },
        onError: (error) => {
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
  };
  
  const closeModalInvestigation = () => {
    handleClose();
    reset()
  }

  // ALL WATCHES HERE...
  // Codes in birthday and age
  const cbirthday = watch("cibirthday");
  const sbirthday = watch("cispouseBirthday");
  // Kapag nagbago ang birthday, i-calculate ang age
  useEffect(() => {
    // Para sa Customer
    if (cbirthday) {
      setValue("cicpage", calculateAge(cbirthday));
    } else {
      setValue("cicpage", 0); // O kaya '' kung gusto mong blank pag walang bday
    }

    // Para sa Spouse
    if (sbirthday) {
      setValue("cisage", calculateAge(sbirthday));
    } else {
      setValue("cisage", 0);
    }
  }, [cbirthday, sbirthday, setValue]);
  // ENDCodes in birthday and age

  // Codes in computing total income
  const incomeFields = watch([
    "ciIncomeSalaryNet",
    "ciSpouseIncome",
    "ciRentalIncome",
    "ciBusinessNet",
    "ciOthers"
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
    setValue("ciTotalIncome", totalIncome);
  }, [totalIncome, setValue]);
  // END Codes in computing total income

  // Codes in computing total expenses
  const expenseFields = watch([
    "ciExpenseLiving",
    "ciExpenseRent",
    "ciExpenseSchooling",
    "ciExpenseInsurance",
    "ciExpenseElectWat",
    "ciExpenseObligation",
    "ciExpenseLoan"
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
    setValue("ciExpenseTotal", totalExpenses);
  }, [totalExpenses, setValue]);
  // END Codes in computing total expenses

  useEffect(() => {
    if (inquiryId && data) {
      reset({
        inquiry_id: data.inquiry_id,
        cicontactPerson: data.cicontactPerson,
        cigender: data.cigender,
        cibirthday: data.cibirthday,
        cicpage: data.cicpage,
        cispouseName: data.cispouseName,
        cispouseGender: data.cispouseGender,
        cispouseBirthday: data.cispouseBirthday,
        cisage: data.cisage,
        cicivilStatus: data.cicivilStatus,
        cieducation: data.cieducation,
        citinNumber: data.citinNumber,
        cimobile: data.cimobile,
        cidependentChildren: data.cidependentChildren,
        cistudyingChildren: data.cistudyingChildren,
        ciotherDependents: data.ciotherDependents,
        ciPresAddress: data.ciPresAddress,
        ciPresAddrLenStay: data.ciPresAddrLenStay,
        ciPresAddrMonStay: data.ciPresAddrMonStay,
        ciPresAddrType: data.ciPresAddrType,
        ciPresAddrRentFee: data.ciPresAddrRentFee,
        ciPrevAddress: data.ciPrevAddress,
        ciPrevAddrLenStay: data.ciPrevAddrLenStay,
        ciPrevAddrMonStay: data.ciPrevAddrMonStay,
        ciProvAddress: data.ciProvAddress,
        ciEmployedBy: data.ciEmployedBy,
        ciEmpAddrEmp: data.ciEmpAddrEmp,
        ciEmpAddrLenStay: data.ciEmpAddrLenStay,
        ciEmpAddrMonStay: data.ciEmpAddrMonStay,
        ciEmpStatus: data.ciEmpStatus,
        ciEmpDesignation: data.ciEmpDesignation,
        ciEmpTelNo: data.ciEmpTelNo,
        ciEmpPrevEmp: data.ciEmpPrevEmp,
        ciEmpPrevAddrEmp: data.ciEmpPrevAddrEmp,
        ciEmpSpouseEmp: data.ciEmpSpouseEmp,
        ciEmpSpouseEmpAddr: data.ciEmpSpouseEmpAddr,
        ciEmpSpousePosition: data.ciEmpSpousePosition,
        ciEmpPrevTelNo: data.ciEmpPrevTelNo,
        ciIncomeSalaryNet: data.ciIncomeSalaryNet,
        ciSpouseIncome: data.ciSpouseIncome,
        ciRentalIncome: data.ciRentalIncome,
        ciBusinessNet: data.ciBusinessNet,
        ciOthers: data.ciOthers,
        ciTotalIncome: data.ciTotalIncome,
        ciExpenseLiving: data.ciExpenseLiving,
        ciExpenseRent: data.ciExpenseRent,
        ciExpenseSchooling: data.ciExpenseSchooling,
        ciExpenseInsurance: data.ciExpenseInsurance,
        ciExpenseElectWat: data.ciExpenseElectWat,
        ciExpenseObligation: data.ciExpenseObligation,
        ciExpenseLoan: data.ciExpenseLoan,
        ciExpenseTotal: data.ciExpenseTotal,
        ciCheckingAccount: data.ciCheckingAccount,
        ciCAAddrr: data.ciCAAddrr,
        ciSavingsAccount: data.ciSavingsAccount,
        ciSAAddrr: data.ciSAAddrr,
        
        // Para sa Nested Data (Relationships)
        otherSourceOfIncome: data.otherSourceOfIncome || [{ osisource: '', osiamount: '' }],
        creditReferences: data.creditReferences || [{ crcreditor: '', craddress: '', crdategranted: '', crorigbalance: '', crpresbalance: '', crmoinstallment: '' }],
        personalReferences: data.personalReferences || [{ prname: '', praddress: '', prcontact: '', prrelation: '' }],
        personalProperties: data.personalProperties || [{ ppkind: '', pplocation: '', ppvalue: '', ppimbursement: '' }],
      });
    }else{
      reset({
        inquiry_id: inquiryId,
        cicontactPerson: '',
        cigender: '',
        cibirthday: '',
        cicpage: 0,
        cispouseName: '',
        cispouseGender: '',
        cispouseBirthday: '',
        cisage: 0,
        cicivilStatus: 'Single',
        cieducation: 'Elementary',
        citinNumber: '',
        cimobile: '',
        cidependentChildren: 0,
        cistudyingChildren: 0,
        ciotherDependents: 0,
        ciPresAddress: '',
        ciPresAddrLenStay: '',
        ciPresAddrMonStay: '0 Month',
        ciPresAddrType: 'Own',
        ciPresAddrRentFee: 0,
        ciPrevAddress: '',
        ciPrevAddrLenStay: '',
        ciPrevAddrMonStay: '0 Month',
        ciProvAddress: '',
        ciEmployedBy: '',
        ciEmpAddrEmp: '',
        ciEmpAddrLenStay: '',
        ciEmpAddrMonStay: '0 Month',
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
        ciSpouseIncome: 0,
        ciRentalIncome: 0,
        ciBusinessNet: 0,
        ciOthers: 0,
        ciTotalIncome: 0,
        ciExpenseLiving: 0,
        ciExpenseRent: 0,
        ciExpenseSchooling: 0,
        ciExpenseInsurance: 0,
        ciExpenseElectWat: 0,
        ciExpenseObligation: 0,
        ciExpenseLoan: 0,
        ciExpenseTotal: 0,
        ciCheckingAccount: '',
        ciCAAddrr: '',
        ciSavingsAccount: '',
        ciSAAddrr: '',

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
      })
    }
  }, [inquiryId, data, reset, setValue]);

  return (
    <div>
      <Modal show={show} onHide={closeModalInvestigation} size='xl' backdrop="static" keyboard={false} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Credit Investigation</Modal.Title>
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
                                {...register("cicontactPerson")}
                                required
                                className={`capitalize_text ${errors.cicontactPerson ? 'is-invalid' : ''}`}
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
                                {...register("cigender")}
                                required
                                className={`capitalize_text ${errors.cigender ? 'is-invalid' : ''}`}
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
                                  {...register("cibirthday")}
                                  type="date" 
                                  max={new Date().toISOString().split("T")[0]}
                                  required
                                  className={`${errors.cibirthday ? 'is-invalid' : ''}`}
                              />
                              <InputGroup.Text>Age</InputGroup.Text>
                              <Form.Control 
                                  name="cicpage"
                                  {...register("cicpage")}
                                  readOnly 
                                  disabled
                                  className={`${errors.cibirthday ? 'is-invalid' : ''}`}
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
                                {...register("cispouseName")}
                                className={`${errors.cispouseName ? 'is-invalid' : ''}`}
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
                                {...register("cispouseGender")}
                                className={`${errors.cispouseGender ? 'is-invalid' : ''}`}
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
                                  {...register("cispouseBirthday")}
                                  type="date" 
                                  max={new Date().toISOString().split("T")[0]}
                                  className={`${errors.cispouseBirthday ? 'is-invalid' : ''}`}
                              />
                              <InputGroup.Text>Age</InputGroup.Text>
                              <Form.Control 
                                  name="cisage"
                                  {...register("cisage")}
                                  readOnly 
                                  disabled
                                  className={`${errors.cispouseBirthday ? 'is-invalid' : ''}`}
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
                                {...register("cicivilStatus")}
                            >
                              <option value="Single">Single</option>
                              <option value="Married">Married</option>
                              <option value="Widowed">Widowed</option>
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
                                {...register("cieducation")}
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
                                {...register("citinNumber")}
                                className={`${errors.citinNumber ? 'is-invalid' : ''}`}
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
                                {...register("cimobile")}
                                className={`${errors.cimobile ? 'is-invalid' : ''}`}
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
                                {...register("cidependentChildren")}
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
                                {...register("cistudyingChildren")}
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
                                {...register("ciotherDependents")}
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
                              {...register("ciPresAddress")}
                              className={`${errors.ciPresAddress ? 'is-invalid' : ''}`}
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
                                  {...register("ciPresAddrLenStay")}
                                  className={`${errors.ciPresAddrLenStay ? 'is-invalid' : ''}`}
                              />
                              <InputGroup.Text>Year/s</InputGroup.Text>
                              <Form.Select
                                  name="ciPresAddrMonStay"
                                  {...register("ciPresAddrMonStay")}
                                  className={`${errors.ciPresAddrMonStay ? 'is-invalid' : ''}`}
                              >
                                <option value="0 Month">Month</option>
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
                                {...register("ciPresAddrType")}
                                value="Own"
                            />
                            <Form.Check 
                                inline 
                                type="radio" 
                                label="Rented" 
                                name="ciPresAddrType"
                                id='rented'
                                {...register("ciPresAddrType")}
                                value="Rented"
                            />
                            <Form.Check 
                                inline 
                                type="radio" 
                                label="Free House" 
                                name="ciPresAddrType"
                                id='freehouse'
                                {...register("ciPresAddrType")}
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
                              {...register("ciPresAddrRentFee")}
                              className={`${errors.ciPresAddrRentFee ? 'is-invalid' : ''}`}
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
                              {...register("ciPrevAddress")}
                              className={`${errors.ciPrevAddress ? 'is-invalid' : ''}`}
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
                                  {...register("ciPrevAddrLenStay")}
                                  className={`${errors.ciPrevAddrLenStay ? 'is-invalid' : ''}`}
                              />
                              <InputGroup.Text>Year/s</InputGroup.Text>
                              <Form.Select
                                  name="ciPrevAddrMonStay"
                                  {...register("ciPrevAddrMonStay")}
                              >
                                <option value="0 Month">Month</option>
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
                              {...register("ciProvAddress")}
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
                                {...register("ciEmployedBy")}
                                className={`${errors.ciEmployedBy ? 'is-invalid' : ''}`}
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
                                {...register("ciEmpAddrEmp")}
                                className={`${errors.ciEmpAddrEmp ? 'is-invalid' : ''}`}
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
                                  {...register("ciEmpAddrLenStay")}
                                  className={`${errors.ciEmpAddrLenStay ? 'is-invalid' : ''}`}
                              />
                              <InputGroup.Text>Year/s</InputGroup.Text>
                              <Form.Select
                                  name="ciEmpAddrMonStay"
                                  {...register("ciEmpAddrMonStay")}
                              >
                                <option value="0 Month">Month</option>
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
                                {...register("ciEmpStatus")}
                                className={`${errors.ciEmpStatus ? 'is-invalid' : ''}`}
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
                                {...register("ciEmpDesignation")}
                                className={`${errors.ciEmpDesignation ? 'is-invalid' : ''}`}
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
                                {...register("ciEmpTelNo")}
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
                                {...register("ciEmpPrevEmp")}
                                className={`${errors.ciEmpPrevEmp ? 'is-invalid' : ''}`}
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
                                {...register("ciEmpPrevAddrEmp")}
                                className={`${errors.ciEmpPrevAddrEmp ? 'is-invalid' : ''}`}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4} className="text-end">
                            Spouse&apos;s Emp. <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control 
                                name="ciEmpSpouseEmp"
                                {...register("ciEmpSpouseEmp")}
                                className={`${errors.ciEmpSpouseEmp ? 'is-invalid' : ''}`}
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
                                {...register("ciEmpSpouseEmpAddr")}
                                className={`${errors.ciEmpSpouseEmpAddr ? 'is-invalid' : ''}`}
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
                                {...register("ciEmpSpousePosition")}
                                className={`${errors.ciEmpSpousePosition ? 'is-invalid' : ''}`}
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
                                {...register("ciEmpPrevTelNo")}
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
                                {...register("ciIncomeSalaryNet")}
                                className={`${errors.ciEmployedBy ? 'is-invalid' : ''}`}
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
                                {...register("ciSpouseIncome")}
                                className={`${errors.ciSpouseIncome ? 'is-invalid' : ''}`}
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
                                {...register("ciRentalIncome")}
                                className={`${errors.ciRentalIncome ? 'is-invalid' : ''}`}
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
                                {...register("ciBusinessNet")}
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
                                {...register("ciOthers")}
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
                                {...register("ciTotalIncome")}
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
                                {...register("ciCheckingAccount")}
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
                                {...register("ciCAAddrr")}
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
                                {...register("ciSavingsAccount")}
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
                                {...register("ciSAAddrr")}
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
                                  {...register("ciExpenseLiving")}
                                  className={`${errors.ciExpenseLiving ? 'is-invalid' : ''}`}
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
                                  {...register("ciExpenseRent")}
                                  className={`${errors.ciExpenseRent ? 'is-invalid' : ''}`}
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
                                  {...register("ciExpenseSchooling")}
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
                                  {...register("ciExpenseInsurance")}
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
                                  {...register("ciExpenseElectWat")}
                                  className={`${errors.ciExpenseElectWat ? 'is-invalid' : ''}`}
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
                                  {...register("ciExpenseObligation")}
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
                                  {...register("ciExpenseLoan")}
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
                                {...register("ciExpenseTotal")}
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
            disabled={(isCreatingCi || isUpdatingCi) || isLoading}
          >
            {(isCreatingCi || isUpdatingCi) ? 
              (<><CircularProgress size={20} color="inherit" /> Saving...</>)
              :
              (isLoading ? 
                <><CircularProgress size={20} color="inherit" /> Fetching...</>
                :
                <><FaSave /> Save</>
              )
            }
          </button>
          <button className="btn btn-danger d-flex align-items-center justify-content-center gap-2" onClick={closeModalInvestigation}><FaTimes /> Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalCreditInvestigation
