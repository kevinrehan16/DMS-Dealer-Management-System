import React, { useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Card, Table, Form, FormControl } from 'react-bootstrap'
import { FaCheck, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { fetchWithRetry } from '../../../utils/network';
import axios from 'axios';

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
  ]);
  const [propertyRows, setPropertyRows] = useState([
    {
      propsKind: '',
      propsLocation: '',
      propsValue: '',
      propsImbursement: ''
    }
  ]);
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
  const [attachments, setAttachments] = useState([
    {
      attModule: '',
      attReq: '',
      file: null      
    }
  ]);

  const handleSubmit = async () => {
    const formData = new FormData();

    // Primary
    Object.keys(primary).forEach(key => {
      formData.append(`primary[${key}]`, primary[key]);
    });

    // Income
    incomeRows.forEach((row, idx) => {
      formData.append(`income[${idx}][customer_id]`, primary.customer_id);
      formData.append(`income[${idx}][incNature]`, row.incNature);
      formData.append(`income[${idx}][incAddress]`, row.incAddress);
    });

    // Preferences
    preferenceRows.forEach((row, idx) => {
      formData.append(`preferences[${idx}][customer_id]`, primary.customer_id);
      formData.append(`preferences[${idx}][prefCreditor]`, row.prefCreditor);
      formData.append(`preferences[${idx}][prefAddress]`, row.prefAddress);
      formData.append(`preferences[${idx}][prefDateGranted]`, row.prefDateGranted);
      formData.append(`preferences[${idx}][prefOrigBal]`, row.prefOrigBal);
      formData.append(`preferences[${idx}][prefPresBal]`, row.prefPresBal);
      formData.append(`preferences[${idx}][prefMonInstallment]`, row.prefMonInstallment);
    });

    // References
    referenceRows.forEach((row, idx) => {
      formData.append(`references[${idx}][customer_id]`, primary.customer_id);
      formData.append(`references[${idx}][refFullName]`, row.refFullName);
      formData.append(`references[${idx}][refAddress]`, row.refAddress);
      formData.append(`references[${idx}][refContact]`, row.refContact);
      formData.append(`references[${idx}][refRelation]`, row.refRelation);
    });

    // Properties
    propertyRows.forEach((row, idx) => {
      formData.append(`properties[${idx}][customer_id]`, primary.customer_id);
      formData.append(`properties[${idx}][propsKind]`, row.propsKind);
      formData.append(`properties[${idx}][propsLocation]`, row.propsLocation);
      formData.append(`properties[${idx}][propsValue]`, row.propsValue);
      formData.append(`properties[${idx}][propsImbursement]`, row.propsImbursement);
    });

    // 🔥 ATTACHMENTS (NEW PART)
    attachments.forEach((att, idx) => {
      formData.append(`attachments_meta[${idx}][customer_id]`, primary.customer_id);
      formData.append(`attachments_meta[${idx}][attModule]`, att.attModule);
      formData.append(`attachments_meta[${idx}][attReq]`, att.attReq);

      if (att.file) {
        formData.append(`attachments[${idx}]`, att.file);
      }
    });

    try {
      const response = await axios.post(`${API_URL}/credit-application/save-all`, formData, {
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

  const handleAddProRow = () => {
    setPropertyRows([...propertyRows, {
      propsKind: '',
      propsLocation: '',
      propsValue: '',
      propsImbursement: ''
    }]);
  }

  const handleRemoveProRow = (indexToRemove) => {
    setPropertyRows(propertyRows.filter((_, i) => i !== indexToRemove));
  }

  const handleChangeAtt = (index, field, value) => {
    const copy = [...attachments];
    copy[index][field] = value;
    setAttachments(copy);
  };

  const handleFile = (index, file) => {
    const copy = [...attachments];
    copy[index].file = file;
    setAttachments(copy);
  };

  const removeRowAtt = (index) => {
  const copy = attachments.filter((_, i) => i !== index);
  setAttachments(copy);
  };

  const getRequirements = async () => {
    try {
      const dataRequirements = await fetchWithRetry(`${API_URL}/requirements`, {
        headers:{
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }, 3, 1000, 'Requirements');
      // Add file property to each item
      const dataWithFiles = dataRequirements.data.data.map(r => ({
        attModule: r.module,   // map module
        attReq: r.reqName + " ("+r.reqShortName+")" ,     // map reqName
        file: null
      }));
      setAttachments(dataWithFiles);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setprimary({...primary, customer_id: customerId});
  }, [customerId])

  useEffect(() => {
    getRequirements();
  }, [])

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
                                <Button size="sm" className='tbl-btn' onClick={handleAddIncomeRow}>
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
                                    className='mx-auto'
                                    variant="danger"
                                    size="lg"
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
                                <Button size="sm" className='tbl-btn' onClick={handleAddPrefRow}>
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
                                    className='mx-auto'
                                    variant="danger"
                                    size="lg"
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
                                <Button size="sm" className='tbl-btn' onClick={handleAddRefRow}>
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
                                    className='mx-auto'
                                    variant="danger"
                                    size="lg"
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

          {/* OTHER INFORMATION */}
          <Row className='mt-3'>
            <Col md={12}>
              <Card>
                <Card.Header className='pt-3'>
                  <Card.Title className='text-bold'>Other Information</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={12}>
                      <div className="table-section">
                        <h5 className='text-warning'>Real and/or Personal Properties Owned</h5>
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th width='30%'>Kind</th>
                              <th width='31%'>Location</th>
                              <th width='17%'>Value</th>
                              <th width='17%'>Imbursement</th>
                              <th width='5%'>
                                <Button size="sm" className='tbl-btn' onClick={handleAddProRow}>
                                  <FaPlus />
                                </Button>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              propertyRows.map((row, index) => (
                                <tr key={index}>
                                  <td>
                                    <Form.Control 
                                      type='text'
                                      value={row.propsKind}
                                      onChange={(e) => {
                                        let updated = [...propertyRows];
                                        updated[index].propsKind = e.target.value;
                                        setPropertyRows(updated);
                                      }}
                                    />  
                                  </td>
                                  <td>
                                    <Form.Control 
                                      type='text'
                                      value={row.propsLocation}
                                      onChange={(e) => {
                                        let updated = [...propertyRows];
                                        updated[index].propsLocation = e.target.value;
                                        setPropertyRows(updated);
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <Form.Control 
                                      value={row.propsValue}
                                      onChange={(e) => {
                                        let updated = [...propertyRows];
                                        updated[index].propsValue = e.target.value;
                                        setPropertyRows(updated);
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <Form.Control 
                                      value={row.propsImbursement}
                                      onChange={(e) => {
                                        let updated = [...propertyRows];
                                        updated[index].propsImbursement = e.target.value;
                                        setPropertyRows(updated);
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <Button className='mx-auto' variant='danger' size='lg' 
                                    onClick={() => handleRemoveProRow(index)}>
                                      <FaTrash />
                                    </Button>
                                  </td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>  
          {/* END OTHER INFORMATION */}

          {/* OTHER INFORMATION */}
          <Row className='mt-3'>
            <Col md={12}>
              <Card>
                <Card.Header className='pt-3'>
                  <Card.Title className='text-bold'>Attachments Information</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={12}>
                      <div className="table-section">
                        <h5 className='text-warning'>Real and/or Personal Properties Owned</h5>
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th width='20%' className='d-none'>Module</th>
                              <th width='75%'>File name</th>
                              <th width='20%'>Select File</th>
                              <th width='5%'>
                                {/* <Button size="sm" className='tbl-btn' onClick={handleAddRowAtt}>
                                  <FaPlus />
                                </Button> */}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {attachments.map((row, index) => (
                              <tr key={index}>
                                <td className='d-none'>
                                  <input
                                    className="border p-1 w-100 rounded-lg"
                                    value={row.attModule}
                                    onChange={(e) => handleChangeAtt(index, "attModule", e.target.value)}
                                    />
                                </td>
                                <td className="border p-2">
                                  <input
                                    className="border p-1 w-100 rounded-lg"
                                    value={row.attReq}
                                    onChange={(e) => handleChangeAtt(index, "attReq", e.target.value)}
                                  />
                                </td>
                                <td className="border p-2">
                                  <input
                                    type="file"
                                    onChange={(e) => handleFile(index, e.target.files[0])}
                                  />
                                </td>
                                <td className="border p-2 text-center">
                                  <Button className='mx-auto' variant='danger' size='lg' 
                                  onClick={() => removeRowAtt(index)}>
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
          {/* END OTHER INFORMATION */}

        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={handleSubmit}><FaCheck /> Done</Button>
          <Button variant="danger" onClick={handleClose}><FaTimes /> Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default React.memo(ModalCreditApplication);
