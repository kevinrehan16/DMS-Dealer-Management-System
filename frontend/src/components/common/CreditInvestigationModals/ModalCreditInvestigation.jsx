import React, { useEffect, useState } from 'react'
import { Modal, Table, Row, Col, Form, Card, InputGroup, Button } from 'react-bootstrap'
import { FaTimes, FaSave, FaPlus, FaTrash } from 'react-icons/fa'
import axios from 'axios'

const ModalCreditInvestigation = ({show, handleClose, inquiryId}) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const [creditCustomerInformation, setCreditCustomerInformation] = useState(
    {
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
      cidependentChildren: 0,
      cistudyingChildren: 0,
      ciotherDependents: 0,
      ciPresAddress: '',
      ciPresAddrLenStay: 0,
      ciPresAddrMonStay: '',
      ciPresAddrType: '',
      ciPresAddrRentFee: 0.00,
      ciPrevAddress: '',
      ciPrevAddrLenStay: 0,
      ciPrevAddrMonStay: '',
      ciProvAddress: '',
      ciEmployedBy: '',
      ciEmpAddrEmp: '',
      ciEmpAddrLenStay: '',
      ciEmpAddrMonStay: 0,
      ciEmpStatus: '',
      ciEmpDesignation: '',
      ciEmpTelNo: '',
      ciEmpPrevEmp: '',
      ciEmpPrevAddrEmp: '',
      ciEmpSpouseEmp: '',
      ciEmpSpouseEmpAddr: '',
      ciEmpSpousePosition: '',
      ciEmpPrevTelNo: '',
      ciIncomeSalaryNet: 0.00,
      ciSpouseIncome: 0.00,
      ciRentalIncome: 0.00,
      ciBusinessNet: 0.00,
      ciOthers: 0.00,
      ciTotalIncome: 0.00,
      ciExpenseLiving: 0.00,
      ciExpenseRent: 0.00,
      ciExpenseSchooling: 0.00,
      ciExpenseInsurance: 0.00,
      ciExpenseElectWat: 0.00,
      ciExpenseObligation: 0.00,
      ciExpenseLoan: 0.00,
      ciExpenseTotal: 0.00,
      ciCheckingAccount: '',
      ciCAAddrr: '',
      ciSavingsAccount: '',
      ciSAAddrr: '',
    }
  );

  const [otherSourceOfIncome, setOtherSourceOfIncome] = useState([
    { 
      osisource: '', 
      osiamount: 0.00 
    }
  ]);

  const handleSourceOfIncomeInputChange = (index, field, value) => {
    const list = [...otherSourceOfIncome];
    list[index][field] = value;
    setOtherSourceOfIncome(list);
  }

  const handleAddSourceOfIncomeChange = () => {
    setOtherSourceOfIncome([...otherSourceOfIncome, { 
       osisource: '',
       osiamount: 0.00 
    }]);
  }

  const handleRemoveSourceOfIncome = (index) => {
    const list = [...otherSourceOfIncome];
    list.splice(index, 1);
    setOtherSourceOfIncome(list);
  }

  const [creditReferences, setCreditReferences] = useState([
    { 
      crcreditor: '', 
      craddress: '',
      crdategranted: '',
      crorigbalance: 0.00,
      crpresbalance: 0.00,
      crmoinstallment: 0.00 
    }
  ]);

  const handleCreditReferenceInputChange = (index, field, value) => {
    const list = [...creditReferences];
    list[index][field] = value;
    setCreditReferences(list);
  }

  const handleAddCreditReferenceChange = () => {
    setCreditReferences([...creditReferences, { 
      crcreditor: '',
      craddress: '',
      crdategranted: '',
      crorigbalance: 0.00,
      crpresbalance: 0.00,
      crmoinstallment: 0.00 
    }]);
  }

  const handleRemoveCreditReference = (index) => {
    const list = [...creditReferences];
    list.splice(index, 1);
    setCreditReferences(list);
  }

  const handleCustomerInformationChange = (e) => {
    const { name, value } = e.target;
    setCreditCustomerInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/credit-investigation/save-all`, {
        contactinfo: creditCustomerInformation,
        sourceofincome: otherSourceOfIncome,
        creditreferences: creditReferences
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      });

      console.log("Saved:", response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  }

  useEffect(() => {
    setCreditCustomerInformation({...creditCustomerInformation, inquiry_id: inquiryId});
  }, [inquiryId]);

  return (
    <div>
      <Modal show={show} onHide={handleClose} size='xl' backdrop="static" keyboard={false} dialogClassName="custom-modal">
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
                                value={creditCustomerInformation.cicontactPerson} 
                                onChange={handleCustomerInformationChange} 
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
                                value={creditCustomerInformation.cigender} 
                                onChange={handleCustomerInformationChange}
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
                                  type="date" 
                                  value={creditCustomerInformation.cibirthday} 
                                  onChange={handleCustomerInformationChange} 
                              />
                              <InputGroup.Text>Age</InputGroup.Text>
                              <Form.Control 
                                  name='cicpage' 
                                  readOnly 
                                  value={creditCustomerInformation.cicpage} 
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
                                value={creditCustomerInformation.cispouseName} 
                                onChange={handleCustomerInformationChange} 
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
                                value={creditCustomerInformation.cispouseGender} 
                                onChange={handleCustomerInformationChange}
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
                                  type="date" 
                                  value={creditCustomerInformation.cispouseBirthday} 
                                  onChange={handleCustomerInformationChange}
                              />
                              <InputGroup.Text>Age</InputGroup.Text>
                              <Form.Control 
                                  name='cisage' 
                                  readOnly 
                                  value={creditCustomerInformation.cisage} 
                              />
                            </InputGroup>
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>

                    <hr />

                    {/* BOTTOM SECTION */}
                    <Row>
                      <Col md={6}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4}>
                            Civil Status <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Select  
                                name="cicivilStatus" 
                                value={creditCustomerInformation.cicivilStatus} 
                                onChange={handleCustomerInformationChange}
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
                                value={creditCustomerInformation.cieducation} 
                                onChange={handleCustomerInformationChange}
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
                                value={creditCustomerInformation.citinNumber} 
                                onChange={handleCustomerInformationChange} 
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
                                value={creditCustomerInformation.cimobile} 
                                onChange={handleCustomerInformationChange} 
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
                                type="number" 
                                value={creditCustomerInformation.cidependentChildren}
                                onChange={handleCustomerInformationChange}
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
                                type="number" 
                                value={creditCustomerInformation.cistudyingChildren}
                                onChange={handleCustomerInformationChange}
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
                                type="number" 
                                value={creditCustomerInformation.ciotherDependents}
                                onChange={handleCustomerInformationChange}
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
                              name='ciPresAddress'
                              value={creditCustomerInformation.ciPresAddress}
                              onChange={handleCustomerInformationChange}
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
                                  value={creditCustomerInformation.ciPresAddrLenStay} 
                                  name='ciPresAddrLenStay'
                                  onChange={handleCustomerInformationChange}
                              />
                              <InputGroup.Text>Year/s</InputGroup.Text>
                              <Form.Select
                                  name='ciPresAddrMonStay'
                                  value={creditCustomerInformation.ciPresAddrMonStay}
                                  onChange={handleCustomerInformationChange}
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
                                value="Own"
                                checked={creditCustomerInformation.ciPresAddrType === "Own"}
                                onChange={handleCustomerInformationChange}
                            />
                            <Form.Check 
                                inline 
                                type="radio" 
                                label="Rented" 
                                name="ciPresAddrType"
                                value="Rented"
                                checked={creditCustomerInformation.ciPresAddrType === "Rented"}
                                onChange={handleCustomerInformationChange}
                            />
                            <Form.Check 
                                inline 
                                type="radio" 
                                label="Free House" 
                                name="ciPresAddrType"
                                value="Free House"
                                checked={creditCustomerInformation.ciPresAddrType === "Free House"}
                                onChange={handleCustomerInformationChange}
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
                              step="0.01"
                              value={creditCustomerInformation.ciPresAddrRentFee}
                              name='ciPresAddrRentFee'
                              onChange={handleCustomerInformationChange}
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
                              value={creditCustomerInformation.ciPrevAddress}
                              onChange={handleCustomerInformationChange}
                              name='ciPrevAddress'
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
                                  value={creditCustomerInformation.ciPrevAddrLenStay}
                                  name='ciPrevAddrLenStay'
                                  onChange={handleCustomerInformationChange}
                              />
                              <InputGroup.Text>Year/s</InputGroup.Text>
                              <Form.Select
                                  value={creditCustomerInformation.ciPrevAddrMonStay}
                                  name='ciPrevAddrMonStay'
                                  onChange={handleCustomerInformationChange}
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
                              value={creditCustomerInformation.ciProvAddress}
                              name='ciProvAddress'
                              onChange={handleCustomerInformationChange}
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
                                value={creditCustomerInformation.ciEmployedBy}
                                onChange={handleCustomerInformationChange}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4} className="text-end">
                            Address of Employer <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                                name='ciEmpAddrEmp'
                                value={creditCustomerInformation.ciEmpAddrEmp}
                                onChange={handleCustomerInformationChange}
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
                                  name='ciEmpAddrLenStay'
                                  value={creditCustomerInformation.ciEmpAddrLenStay}
                                  onChange={handleCustomerInformationChange}
                              />
                              <InputGroup.Text>Year/s</InputGroup.Text>
                              <Form.Select
                                  name='ciEmpAddrMonStay'
                                  value={creditCustomerInformation.ciEmpAddrMonStay}
                                  onChange={handleCustomerInformationChange}
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
                                name='ciEmpStatus'
                                value={creditCustomerInformation.ciEmpStatus}
                                onChange={handleCustomerInformationChange}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4} className="text-end">
                            Designation <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                                name='ciEmpDesignation'
                                value={creditCustomerInformation.ciEmpDesignation}
                                onChange={handleCustomerInformationChange}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={4} className="text-end">
                            Telephone # <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control 
                                name='ciEmpTelNo'
                                value={creditCustomerInformation.ciEmpTelNo}
                                onChange={handleCustomerInformationChange}
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>

                    <hr />

                    {/* BOTTOM ROW */}
                    <Row>
                      {/* LEFT */}
                      <Col md={6}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4} className="text-end">
                            Prev. Employment <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control 
                                name='ciEmpPrevEmp'
                                value={creditCustomerInformation.ciEmpPrevEmp}
                                onChange={handleCustomerInformationChange}
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
                                name='ciEmpPrevAddrEmp'
                                value={creditCustomerInformation.ciEmpPrevAddrEmp}
                                onChange={handleCustomerInformationChange}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4} className="text-end">
                            Spouse's Emp. <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control 
                                name='ciEmpSpouseEmp'
                                value={creditCustomerInformation.ciEmpSpouseEmp}
                                onChange={handleCustomerInformationChange}
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
                                name='ciEmpSpouseEmpAddr'
                                value={creditCustomerInformation.ciEmpSpouseEmpAddr}
                                onChange={handleCustomerInformationChange}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={4} className="text-end">
                            Position <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control 
                                name='ciEmpSpousePosition'
                                value={creditCustomerInformation.ciEmpSpousePosition}
                                onChange={handleCustomerInformationChange}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={4} className="text-end">
                            Telephone Number <span className="text-danger">*</span>
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                                name='ciEmpPrevTelNo'
                                value={creditCustomerInformation.ciEmpPrevTelNo}
                                onChange={handleCustomerInformationChange}
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
                                name='ciIncomeSalaryNet'
                                value={creditCustomerInformation.ciIncomeSalaryNet}
                                onChange={handleCustomerInformationChange}
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
                                name='ciSpouseIncome'
                                value={creditCustomerInformation.ciSpouseIncome}
                                onChange={handleCustomerInformationChange}
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
                                name='ciRentalIncome'
                                value={creditCustomerInformation.ciRentalIncome}
                                onChange={handleCustomerInformationChange}    
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
                                name='ciBusinessNet'
                                value={creditCustomerInformation.ciBusinessNet}
                                onChange={handleCustomerInformationChange}    
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
                                name='ciOthers'
                                value={creditCustomerInformation.ciOthers}
                                onChange={handleCustomerInformationChange}
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
                                name='ciTotalIncome'
                                value={creditCustomerInformation.ciTotalIncome}
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
                                <th style={{ width: "35%" }}>Amount (Php)</th>
                                <th>
                                  <Button 
                                      className='tbl-btn' 
                                      size="sm"
                                      onClick={handleAddSourceOfIncomeChange}
                                  >
                                    <FaPlus />
                                  </Button>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {otherSourceOfIncome.map((osi, index) => (
                                <tr key={index}>
                                  <td>
                                    <Form.Control
                                        type='text'
                                        value={osi.osisource}
                                        onChange={(e) => handleSourceOfIncomeInputChange(index, 'osisource', e.target.value)}
                                    />
                                  </td>
                                  <td>
                                    <Form.Control
                                        type="number"
                                        value={osi.osiamount}
                                        onChange={(e) => handleSourceOfIncomeInputChange(index, 'osiamount', e.target.value)}
                                    />
                                  </td>
                                  <td>
                                    <Button 
                                        variant="danger" 
                                        className='tbl-btn' 
                                        size="lg"
                                        onClick={() => handleRemoveSourceOfIncome(index)}
                                    >
                                      <FaTrash />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                        <hr />
                        {/* BANK INFO */}
                        <Form.Group as={Row} className="mb-2">
                          <Form.Label column sm={5}>
                            Checking Account
                          </Form.Label>
                          <Col sm={7}>
                            <Form.Control 
                                placeholder="Name of Bank"
                                name='ciCheckingAccount'
                                value={creditCustomerInformation.ciCheckingAccount}
                                onChange={handleCustomerInformationChange}
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
                                name='ciCAAddrr'
                                value={creditCustomerInformation.ciCAAddrr}
                                onChange={handleCustomerInformationChange}
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
                                name='ciSavingsAccount'
                                value={creditCustomerInformation.ciSavingsAccount}
                                onChange={handleCustomerInformationChange}    
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
                                name='ciSAAddrr'
                                value={creditCustomerInformation.ciSAAddrr}
                                onChange={handleCustomerInformationChange} 
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
                                  name='ciExpenseLiving'
                                  value={creditCustomerInformation.ciExpenseLiving}
                                  onChange={handleCustomerInformationChange}
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
                                  name='ciExpenseRent'
                                  value={creditCustomerInformation.ciExpenseRent}
                                  onChange={handleCustomerInformationChange}
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
                                  name='ciExpenseSchooling'
                                  value={creditCustomerInformation.ciExpenseSchooling}
                                  onChange={handleCustomerInformationChange}
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
                                  name='ciExpenseInsurance'
                                  value={creditCustomerInformation.ciExpenseInsurance}
                                  onChange={handleCustomerInformationChange}
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
                                  name='ciExpenseElectWat'
                                  value={creditCustomerInformation.ciExpenseElectWat}
                                  onChange={handleCustomerInformationChange}
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
                                  name='ciExpenseObligation'
                                  value={creditCustomerInformation.ciExpenseObligation}
                                  onChange={handleCustomerInformationChange}
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
                                  name='ciExpenseLoan'
                                  value={creditCustomerInformation.ciExpenseLoan}
                                  onChange={handleCustomerInformationChange}
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
                                name='ciExpenseTotal'
                                value={creditCustomerInformation.ciExpenseTotal}
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
                          <th width="15%">Creditor</th>
                          <th width="18%">Address</th>
                          <th width="12%">Date Granted</th>
                          <th width="12%">Orig. Balance</th>
                          <th width="12%">Pres. Balance</th>
                          <th width="13%">Mo. Installment</th>
                          <th width="7%">
                            <Button 
                                className='tbl-btn' 
                                size='sm'
                                onClick={handleAddCreditReferenceChange}
                            >
                                  <FaPlus />
                            </Button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {creditReferences.map((cr, index) => (
                          <tr key={index}>
                            <td>
                              <Form.Control
                                  type="text"
                                  value={cr.crcreditor}
                                  onChange={(e) => handleCreditReferenceInputChange(index, 'crcreditor', e.target.value)}
                              />
                            </td>
                            <td>
                              <Form.Control
                                  type="text" 
                                  value={cr.craddress}
                                  onChange={(e) => handleCreditReferenceInputChange(index, 'craddress', e.target.value)}
                              />
                            </td>
                            <td>
                              <Form.Control
                                  type="date"
                                  value={cr.crdategranted}
                                  onChange={(e) => handleCreditReferenceInputChange(index, 'crdategranted', e.target.value)}
                              />
                            </td>
                            <td>
                              <Form.Control
                                  type="number"
                                  value={cr.crorigbalance}
                                  onChange={(e) => handleCreditReferenceInputChange(index, 'crorigbalance', e.target.value)}
                              />
                            </td>
                            <td>
                              <Form.Control
                                  type="number"
                                  value={cr.crpresbalance}
                                  onChange={(e) => handleCreditReferenceInputChange(index, 'crpresbalance', e.target.value)}
                              />
                            </td>
                            <td>
                              <Form.Control
                                  type="number"
                                  value={cr.crmoinstallment}
                                  onChange={(e) => handleCreditReferenceInputChange(index, 'crmoinstallment', e.target.value)}
                              />
                            </td>
                            <td>
                              <Button 
                                  variant="danger" 
                                  className='tbl-btn'
                                  size="lg"
                                  onClick={() => handleRemoveCreditReference(index)}
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
                  <div>
                    <h5 className='text-warning'>Personal References</h5>
                    <button variant="primary" size="sm" className="mb-2">
                      + Add Personal Reference
                    </button>
                    <Table bordered hover responsive>
                      <thead className="table-dark">
                        <tr>
                          <th>Name</th>
                          <th>Address</th>
                          <th>Contact No.</th>
                          <th>Relation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example row, replace with dynamic mapping */}
                        <tr>
                          <td>Juan Dela Cruz</td>
                          <td>Parañaque City</td>
                          <td>0917-123-4567</td>
                          <td>Friend</td>
                        </tr>
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
                  <h5 className='text-warning'>Real And/Or Personal Properties Owned</h5>
                  <button variant="primary" size="sm" className="mb-2">
                    + Add Property
                  </button>
                  <Table bordered hover responsive>
                    <thead className="table-dark">
                      <tr>
                        <th>Kind</th>
                        <th>Location</th>
                        <th>Value</th>
                        <th>Imbursement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Example row, replace with dynamic mapping */}
                      <tr>
                        <td>House</td>
                        <td>Taguig City</td>
                        <td>₱2,500,000</td>
                        <td>Mortgage</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row> 

        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleSubmit}><FaSave /> Save</button>
          <button className="btn btn-danger" onClick={handleClose}><FaTimes /> Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalCreditInvestigation
