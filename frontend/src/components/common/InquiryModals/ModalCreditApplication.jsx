import React, { useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Card, Table, Form } from 'react-bootstrap'
import { FaCheck, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import axios from 'axios';

// const fixedPayload = {
//   "primary": {
//     "customer_id": 1,
//     "creditApp_id": "APP-0000003",
//     "lastName": "Macandog",
//     "firstName": "Sean Carlo",
//     "middleName": "Francisco",
//     "birthdate": "1999-01-24",
//     "age": 28,
//     "gender": "Male",
//     "civilStatus": "Single",
//     "education": "College",
//     "spouseName": "Marielle Rojo",
//     "spouseBirthDate": "1999-01-23",
//     "spouseAge": 27,
//     "numChildren": 0,
//     "numStudying": 0,
//     "otherDependetn": 0,
//     "presentAddress": "Muntinlupa",
//     "mobile": "09153169518"
//   },
//   "preferences": [
//     {
//       "customer_id": 1,
//       "creditAppPref_id": "PREF-0000003",
//       "creditAppPrimary_id": "APP-0000003",
//       "prefCreditor": "Lito Villoria",
//       "prefAddress": "Pasig City",
//       "prefDateGranted": "2020-01-01",
//       "prefOrigBal": 50000.00,
//       "prefPresBal": 25000.00,
//       "prefMonInstallment": 5000.00
//     }
//   ],
//   "references": [
//     {
//       "customer_id": 1,
//       "creditAppRef_id": "REF-0000003",
//       "creditAppPrimary_id": "APP-0000003",
//       "refFullName": "Valerie Barbacion",
//       "refAddress": "Laguna City",
//       "refContact": "09124289941",
//       "refRelation": "Friend"
//     }
//   ],
//   "income": [
//     {
//       "customer_id": 1,
//       "creditAppInc_id": "INC-0000003",
//       "creditAppPrimary_id": "APP-0000003",
//       "incNature": "Business",
//       "incAddress": "Sucat Muntinlupa"
//     }
//   ],
//   "properties": [
//     {
//       "customer_id": 1,
//       "creditAppProps_id": "PRO-0000003",
//       "creditAppPrimary_id": "APP-0000003",
//       "propsKind": "House and Lot",
//       "propsLocation": "Ayala Alabang",
//       "propsValue": 80000000.00,
//       "propsImbursement": 50000000.00
//     }
//   ],
//   "attachments": [
//     {
//       "customer_id": 1,
//       "creditAppAttachments_id": "ATT-0000003",
//       "credit_application_primary_id": "APP-0000003",
//       "creditAppPrimary_id": "APP-0000001",
//       "attModule": "COE",
//       "attReq": "CA",
//       "attFileName": "COE.jpg",
//       "attFileType": "jpg",
//       "attFileSize": 71189
//     }
//   ]
// }

function ModalCreditApplication({show, handleClose, customerId}) {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const [incomeRows, setIncomeRows] = useState([
    { 
      incNature: '', 
      incAddress: '' 
    }
  ]);
  const [preferenceRows, setPreferenceRows] = useState([
    {
      prefCreditor: '',
      prefAddress: '',
      prefDateGranted: '',
      prefOrigBal: '',
      prefPresBal: '',
      prefMonInstallment: ''
    }
  ]);
  const [referenceRows, setReferenceRows] = useState([
    {
      refFullName: '',
      refAddress: '',
      refContact: '',
      refRelation: ''
    }
])

  const [primary, setprimary] = useState({
    customer_id: 0,
    lastName: "",
    firstName: "",
    middleName: "",
    birthdate: "",
    age: 0,
    gender: "",
    civilStatus: "",
    education: "",
    spouseName: "",
    spouseBirthDate: "",
    spouseAge: 0,
    numChildren: 0,
    numStudying: 0,
    otherDependetn: 0,
    presentAddress: "",
    mobile: ""
  });

  const handleSubmit = async () => {
    const fixedPayload = {
      primary: primary,
      income: incomeRows.map((row, index) => ({
        customer_id: primary.customer_id,
        incNature: row.incNature,
        incAddress: row.incAddress
      })),
      preferences: preferenceRows.map((row, index) => ({
        customer_id: primary.customer_id,
        prefCreditor: row.prefCreditor,
        prefAddress: row.prefAddress,
        prefDateGranted: row.prefDateGranted,
        prefOrigBal: row.prefOrigBal,
        prefPresBal: row.prefPresBal,
        prefMonInstallment: row.prefMonInstallment
      })),
      references: referenceRows.map((row, index) => ({
        customer_id: primary.customer_id,
        refFullName: row.refFullName,
        refAddress: row.refAddress,
        refContact: row.refContact,
        refRelation: row.refRelation
      }))
    };

    try {
      const response = await axios.post(`${API_URL}/credit-application/save-all`, fixedPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('Saved:', response.data);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  const handleChangePrimaryInfo = (e) => {
    setprimary({
      ...primary, [e.target.name] : e.target.value
    })
  }

  const handleAddIncomeRow = () => {
    setIncomeRows([...incomeRows, { incNature: '', incAddress: '' }]);
  }

  const handleRemoveIncRow = (indexToRemove) => {
    setIncomeRows(incomeRows.filter((_, i) => i !== indexToRemove));
  }

  const handleAddPrefRow = () => {
    setPreferenceRows([...preferenceRows, {
      prefCreditor: '',
      prefAddress: '',
      prefDateGranted: '',
      prefOrigBal: '',
      prefPresBal: '',
      prefMonInstallment: ''
    }]);
  }

  const handleRemovePrefRow = (indexToRemove) => {
    setPreferenceRows(preferenceRows.filter((_, i) => i !== indexToRemove));
  }

  const handleAddRefRow = () => {
    setReferenceRows([...referenceRows, {
      refFullName: '',
      refAddress: '',
      refContact: '',
      refRelation: ''
    }]);
  }

  const handleRemoveRefRow = (indexToRemove) => {
    setReferenceRows(referenceRows.filter((_, i) => i !== indexToRemove));
  }

  useEffect(() => {
    setprimary({...primary, customer_id: customerId});
  }, [customerId])

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static" keyboard={false} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Credit Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Header className='pt-3'>
                  <Card.Title className='text-bold'>Customer Information</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row className='mb-2'>
                    <Col md={4}>
                      <Row>
                        <Col xs={4} className="d-flex align-items-center">
                          <Form.Label className="mb-0">Last Name</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Control
                            type="text"
                            className="capitalize_text"
                            name="lastName"
                            value={primary.lastName}
                            onChange={handleChangePrimaryInfo}
                            required
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4}>
                      <Row>
                        <Col xs={4} className="d-flex align-items-center">
                          <Form.Label className="mb-0">First Name</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Control
                            type="text"
                            className="capitalize_text"
                            name="firstName"
                            value={primary.firstName}
                            onChange={handleChangePrimaryInfo}
                            required
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4}>
                      <Row>
                        <Col xs={4} className="d-flex align-items-center">
                          <Form.Label className="mb-0">Middle Name</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Control
                            type="text"
                            className="capitalize_text"
                            name="middleName"
                            value={primary.middleName}
                            onChange={handleChangePrimaryInfo}
                            required
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className='mb-2'>
                    <Col md={4}>
                      <Row>
                        <Col xs={4} className="d-flex align-items-center">
                          <Form.Label className="mb-0">Birthday</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Control
                            type="date"
                            name="birthdate"
                            max={new Date().toISOString().split("T")[0]}
                            value={primary.birthdate}
                            onChange={handleChangePrimaryInfo}
                            required
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4}>
                      <Row>
                        <Col xs={4} className="d-flex align-items-center">
                          <Form.Label className="mb-0">Age</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Control
                            type="text"
                            name="age"
                            readOnly
                            value={primary.age}
                            onChange={handleChangePrimaryInfo}
                            disabled
                            required
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4}>
                      <Row>
                        <Col xs={4} className="d-flex align-items-center">
                          <Form.Label className="mb-0">Gender</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Select name="gender" value={primary.gender} onChange={handleChangePrimaryInfo} required>
                            <option value="">-- Select Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className='mb-2'>
                    <Col md={4}>
                      <Row>
                        <Col xs={4} className="d-flex align-items-center">
                          <Form.Label className="mb-0">Civil Status</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Select name="civilStatus" value={primary.civilStatus} onChange={handleChangePrimaryInfo} required>
                            <option value="">-- Select Status --</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Widowed">Widowed</option>
                            <option value="LiveIn">LiveIn</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4}>
                      <Row>
                        <Col xs={4} className="d-flex align-items-center">
                          <Form.Label className="mb-0">Education</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Select name="education" value={primary.education} onChange={handleChangePrimaryInfo} required>
                            <option value="">-- Select Education --</option>
                            <option value="Elementary">Elementary</option>
                            <option value="High School">High School</option>
                            <option value="Collge">Collge</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4}>
                      <Row>
                        <Col xs={4} className="d-flex align-items-center">
                          <Form.Label className="mb-0">Mobile #</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Control
                            type="text"
                            name="mobile"
                            value={primary.mobile} 
                            onChange={handleChangePrimaryInfo}
                            required
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <hr />

                  <Row className='mb-2'>
                    <Col md={4}>
                      <Row>
                        <Col xs={4} className="d-flex align-items-center">
                          <Form.Label className="mb-0">Spouse</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Control
                            type="text"
                            name="spouseName"
                            value={primary.spouseName} 
                            onChange={handleChangePrimaryInfo}
                            required
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4}>
                      <Row>
                        <Col xs={4} className="d-flex align-items-center">
                          <Form.Label className="mb-0">Birthday</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Control
                            type="date"
                            name="spouseBirthDate"
                            max={new Date().toISOString().split("T")[0]}
                            value={primary.spouseBirthDate} 
                            onChange={handleChangePrimaryInfo}
                            required
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4}>
                      <Row>
                        <Col xs={4} className="d-flex align-items-center">
                          <Form.Label className="mb-0">Age</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Control
                            type="text"
                            name="spouseAge"
                            readOnly
                            value={primary.spouseAge} 
                            onChange={handleChangePrimaryInfo}
                            disabled
                            required
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className='mb-2'>
                    <Col md={4}>
                      <Row>
                        <Col xs={4} className="d-flex align-items-center">
                          <Form.Label className="mb-0"># Children</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Control
                            type="number"
                            name="numChildren"
                            value={primary.numChildren} 
                            onChange={handleChangePrimaryInfo}
                            required
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4}>
                      <Row>
                        <Col xs={4} className="d-flex align-items-center">
                          <Form.Label className="mb-0"># Studying</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Control
                            type="number"
                            name="numStudying"
                            value={primary.numStudying} 
                            onChange={handleChangePrimaryInfo}
                            required
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4}>
                      <Row>
                        <Col xs={4} className="d-flex align-items-center">
                          <Form.Label className="mb-0"># Dependent</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Control
                            type="number"
                            name="otherDependetn"
                            value={primary.otherDependetn} 
                            onChange={handleChangePrimaryInfo}
                            required
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <hr />

                  <Row className='mb-2'>
                    <Col md={12}>
                      <Form.Label className="mb-0">Present Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        className="capitalize_text"
                        name="presentAddress"
                        value={primary.presentAddress} 
                        onChange={handleChangePrimaryInfo}
                        rows={3}
                        required
                      />
                    </Col>
                  </Row>

                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* INCOME INFORMATION */}
          <Row className='mt-3'>
            <Col md={12}>
              <Card>
                <Card.Header className='pt-3'>
                  <Card.Title className='text-bold'>Income Information</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={7}>
                      <div className="table-section">
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th width='40%'>Nature</th>
                              <th width='50%'>Address</th>
                              <th width='10%'>
                                <Button size="sm" className='d-flex align-content-center justify-content-center text-white mx-auto' onClick={handleAddIncomeRow}>
                                  <FaPlus />
                                </Button>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {incomeRows.map((row, index) => (
                              <tr key={index}>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={row.incNature}
                                    onChange={(e) => {
                                      const updated = [...incomeRows];
                                      updated[index].incNature = e.target.value;
                                      setIncomeRows(updated);
                                    }}
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={row.incAddress}
                                    onChange={(e) => {
                                      const updated = [...incomeRows];
                                      updated[index].incAddress = e.target.value;
                                      setIncomeRows(updated);
                                    }}
                                  />
                                </td>
                                <td className="text-center">
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleRemoveIncRow(index)}
                                  >
                                    <FaTrash />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>  
          {/* END INCOME INFORMATION */}

          {/* REFERENCES INFORMATION */}
          <Row className='mt-3'>
            <Col md={12}>
              <Card>
                <Card.Header className='pt-3'>
                  <Card.Title className='text-bold'>References Information</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={12}>
                      <div className="table-section">
                        <h5 className='text-warning'>Credit References</h5>
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th width='20%'>Creditor</th>
                              <th width='30%'>Address</th>
                              <th width='11%'>Date Granted</th>
                              <th width='11%'>Orig. Balance</th>
                              <th width='11%'>Pres. Balance</th>
                              <th width='12%'>Mo. Installment</th>
                              <th width='5%'>
                                <Button size="sm" className='d-flex align-content-center justify-content-center text-white mx-auto' onClick={handleAddPrefRow}>
                                  <FaPlus />
                                </Button>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {preferenceRows.map((row, index) => (
                              <tr key={index}>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={row.prefCreditor}
                                    onChange={(e) => {
                                      const updated = [...preferenceRows];
                                      updated[index].prefCreditor = e.target.value;
                                      setPreferenceRows(updated);
                                    }}
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={row.prefAddress}
                                    onChange={(e) => {
                                      const updated = [...preferenceRows];
                                      updated[index].prefAddress = e.target.value;
                                      setPreferenceRows(updated);
                                    }}
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="date"
                                    value={row.prefDateGranted}
                                    max={new Date().toISOString().split("T")[0]}
                                    onChange={(e) => {
                                      const updated = [...preferenceRows];
                                      updated[index].prefDateGranted = e.target.value;
                                      setPreferenceRows(updated);
                                    }}
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={row.prefOrigBal}
                                    onChange={(e) => {
                                      const updated = [...preferenceRows];
                                      updated[index].prefOrigBal = e.target.value;
                                      setPreferenceRows(updated);
                                    }}
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={row.prefPresBal}
                                    onChange={(e) => {
                                      const updated = [...preferenceRows];
                                      updated[index].prefPresBal = e.target.value;
                                      setPreferenceRows(updated);
                                    }}
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={row.prefMonInstallment}
                                    onChange={(e) => {
                                      const updated = [...preferenceRows];
                                      updated[index].prefMonInstallment = e.target.value;
                                      setPreferenceRows(updated);
                                    }}
                                  />
                                </td>
                                <td>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleRemovePrefRow(index)}
                                  >
                                    <FaTrash />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>
                  
                  <hr />

                  <Row>
                    <Col md={12}>
                      <div className="table-section">
                        <h5 className='text-warning'>Personal References</h5>
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th width='30%'>Full Name</th>
                              <th width='30%'>Address</th>
                              <th width='18%'>Contact #</th>
                              <th width='17%'>Relation</th>
                              <th width='5%'>
                                <Button size="sm" className='d-flex align-content-center justify-content-center text-white mx-auto' onClick={handleAddRefRow}>
                                  <FaPlus />
                                </Button>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {referenceRows.map((row, index) => (
                              <tr key={index}>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={row.refFullName}
                                    onChange={(e) => {
                                      const updated = [...referenceRows];
                                      updated[index].refFullName = e.target.value;
                                      setReferenceRows(updated);
                                    }}
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={row.refAddress}
                                    onChange={(e) => {
                                      const updated = [...referenceRows];
                                      updated[index].refAddress = e.target.value;
                                      setReferenceRows(updated);
                                    }}
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={row.refContact}
                                    onChange={(e) => {
                                      const updated = [...referenceRows];
                                      updated[index].refContact = e.target.value;
                                      setReferenceRows(updated);
                                    }}
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={row.refRelation}
                                    onChange={(e) => {
                                      const updated = [...referenceRows];
                                      updated[index].refRelation = e.target.value;
                                      setReferenceRows(updated);
                                    }}
                                  />
                                </td>
                                <td>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleRemoveRefRow(index)}
                                  >
                                    <FaTrash />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>  
          {/* END REFERENCES INFORMATION */}

        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={handleSubmit}><FaCheck /> Done</Button>
          <Button variant="danger" onClick={handleClose}><FaTimes /> Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalCreditApplication
