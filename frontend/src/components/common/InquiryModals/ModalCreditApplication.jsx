import React, { useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Card, Table, Form } from 'react-bootstrap'
import { FaTimes, FaPlus, FaTrash, FaSave } from "react-icons/fa";
import { CircularProgress } from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';

import ModalAddress from '../AddressModals/ModalAddress';

import { useAddressManager } from '../../../hooks/HooksAddress/useAddressManager';
import { useCreditApplication, useCreateNewCreditApp } from '../../../hooks/HooksCreditApp/useCreditApplication';
import { useNotification } from '../../../context/NotificationContext';
import { fetchWithRetry } from '../../../utils/network';

function ModalCreditApplication({show, handleClose, customerId, applicationId}) {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem('token');
  const notify = useNotification();
  
  const initialValues = {
    customer_id: customerId,
    lastName: '',
    firstName: '',
    middleName: '',
    birthdate: '',
    age: 0,
    gender: '',
    civilStatus: '',
    education: '',
    spouseName: '',
    spouseBirthDate: '',
    spouseAge: 0,
    numChildren: 0,
    numStudying: 0,
    otherDependetn: 0,
    presentAddress: '',
    mobile: '',
    incomeRows: [{ 
      incNature: '', 
      incAddress: '' 
    }],
    preferenceRows: [{ 
      prefCreditor: '',
      prefAddress: '',
      prefDateGranted: '',
      prefOrigBal: '',
      prefPresBal: '',
      prefMonInstallment: ''
      }],
      referenceRows: [{ 
      refFullName: '',
      refAddress: '',
      refContact: '',
      refRelation: ''
      }],
      propertyRows: [{ 
      propsKind: '',
      propsLocation: '',
      propsValue: '',
      propsImbursement: ''
      }],
  }

  const { data: appData, isLoading: loadingCreditApp, error: errorCreditApp } = useCreditApplication(applicationId);

  const { mutate: createNewCreditApp, isPending: isCreating } = useCreateNewCreditApp();
  const { register, handleSubmit, reset, setValue, setError, control, watch, formState: { errors } } = useForm({
    defaultValues: initialValues
  });

  // Setup Control para sa Tables
  const { fields: incomeFields, append: appendIncome, remove: removeIncome } = useFieldArray({
    control,
    name: "incomeRows"
  });

  const { fields: prefFields, append: appendPref, remove: removePref } = useFieldArray({
    control,
    name: "preferenceRows"
  });

  const { fields: crefFields, append: appendCref, remove: removeCref } = useFieldArray({
    control,
    name: "referenceRows"
  });
  
  const { fields: propFields, append: appendProp, remove: removeProp } = useFieldArray({
    control,
    name: "propertyRows"
  });

  const { addressConfig, openAddress, closeAddress, handleSelect } = useAddressManager();

  const [attachments, setAttachments] = useState([
    {
      attModule: '',
      attReq: '',
      file: null      
    }
  ]);

  const saveCreditApplication = (data) => {
    const formData = new FormData();

    // 1. I-filter lang natin ang mga may file para mag-match ang index sa Laravel
    const validAttachments = attachments.filter(att => att.file instanceof File);

    const payload = {
      ...data,
      attachments_meta: validAttachments.map(att => ({
        attModule: att.attModule,
        attReq: att.attReq,
        customer_id: data.customer_id
      }))
    };
    // I-wrap natin lahat ng non-file fields sa 'primary' key
    // para makuha mo siya sa Laravel as $request->input('primary')
    formData.append('primary', JSON.stringify(payload));

    // 2. I-append ang mismong files (Dapat sunod-sunod din ang index nito)
    validAttachments.forEach((att) => {
      formData.append('attachments[]', att.file);
    });

    // 3. Ito ang isesend mo
    createNewCreditApp(formData, {
      onSuccess: (response) => {
        notify.alertMsg(
          response.message || "Credit Application Saved!", 
          "Credit Application has beed saved successfully.",
          "success",
          "Saving Credit Application."
        );
        // console.log("Successfully Added Data from Server:", response.message);
        reset(initialValues);
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
  };

  const handleChangeAtt = (index, field, value) => {
    const copy = [...attachments];
    copy[index][field] = value;
    setAttachments(copy);
  };

  const handleFile = (index, file) => {
    if (!file) return; // Wag ituloy kung walang piniling file
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
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }, 3, 1000, 'Requirements');

      // Siguraduhin na ang path ay data.data.data base sa log mo
      const rawData = dataRequirements?.data?.data || [];

      // I-map at I-RETURN ang data
      return rawData.map(r => ({
        attModule: r.module,
        attReq: `${r.reqName} (${r.reqShortName})`,
        file: null
      }));

    } catch (error) {
      console.log("Error in getRequirements:", error);
      return []; // Return empty array para hindi mag-crash ang .map() sa useEffect
    }
  }

  useEffect(() => {
    if (!show) return;

    const init = async () => {
      // 1. ANTAYIN ang Master List (Dito na papasok yung ni-return natin sa taas)
      const masterList = await getRequirements();

      if (applicationId && appData) {
        // --- EDIT MODE ---
        const app = appData;
        const uploaded = app.attachment_information || [];

        // 2. MERGING LOGIC
        const merged = masterList.map(req => {
          // I-match ang requirement name sa uploaded files
          const found = uploaded.find(u => 
            u.attReq?.trim() === req.attReq?.trim() // Siguraduhing walang extra spaces
          );

          return {
            ...req,
            isSaved: !!found, // Indicator kung DONE na
            file: null
          };
        });

        // console.log("Master List Loaded:", merged);
        setAttachments(merged);
        
        // I-reset ang main form (LastName, FirstName, etc.)
        reset({
          // 1. Direct Fields (Match na sila sa camelCase)
          customer_id: app.customer_id,
          lastName: app.lastName,
          firstName: app.firstName,
          middleName: app.middleName,
          birthdate: app.birthdate ? app.birthdate.split('T')[0] : '', // Safe date format
          age: app.age,
          gender: app.gender,
          civilStatus: app.civilStatus,
          education: app.education,
          spouseName: app.spouseName,
          spouseBirthDate: app.spouseBirthDate ? app.spouseBirthDate.split('T')[0] : '',
          spouseAge: app.spouseAge,
          numChildren: app.numChildren,
          numStudying: app.numStudying,
          otherDependetn: app.otherDependetn,
          presentAddress: app.presentAddress,
          mobile: app.mobile,

          // 2. Nested Arrays (Mapping from API names to Form names)
          incomeRows: app.other_source_incomes || [],
          preferenceRows: app.personal_references || [], // Based sa JSON mo kanina
          referenceRows: app.credit_references || [],   // Based sa JSON mo kanina
          propertyRows: app.personal_properties_owned || [],
        });
      } else {
        // --- ADD MODE ---
        reset(initialValues);
        // Lahat isSaved: false sa simula
        setAttachments(masterList.map(req => ({ ...req, isSaved: false })));
      }
    };

    init();
  }, [show, appData, applicationId]);

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static" keyboard={false} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Credit Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/* MODAL FOR ADDRESS HERE.. */}
          <ModalAddress 
            show={addressConfig.show} 
            handleClose={closeAddress} 
            onSelect={handleSelect}
          />
          {/* END MODAL FOR ADDRESS HERE.. */}

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
                            {...register("lastName")}
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
                            {...register("firstName")}
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
                            {...register("middleName")}
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
                            {...register("birthdate")}
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
                            {...register("age")}
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
                          <Form.Select 
                            name="gender" 
                            {...register("gender")}
                            required
                          >
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
                          <Form.Select 
                            name="civilStatus" 
                            {...register("civilStatus")}
                            required
                          >
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
                          <Form.Select 
                            name="education" 
                            {...register("education")}
                            required
                          >
                            <option value="">-- Select Education --</option>
                            <option value="Elementary">Elementary</option>
                            <option value="High School">High School</option>
                            <option value="College">College</option>
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
                            {...register("mobile")}
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
                            {...register("spouseName")}
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
                            {...register("spouseBirthDate")}
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
                            {...register("spouseAge")}
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
                            {...register("numChildren")}
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
                            {...register("numStudying")}
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
                            {...register("otherDependetn")}
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
                        {...register("presentAddress")}
                        onClick={() => openAddress({
                          targetKey: 'presentAddress',
                          onSelect: (val) => {
                            // Dito natin puforce ang update sa Hook Form
                            setValue("presentAddress", val, { shouldValidate: true, shouldDirty: true });
                          }
                        })}
                        rows={3}
                        readOnly
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
                        <h5 className='text-warning'>Other Sources Of Income</h5>
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th width='40%'>Nature</th>
                              <th width='52%'>Address</th>
                              <th width='8%' className='text-center'>
                                <Button 
                                  size="sm" 
                                  className='tbl-btn' 
                                  onClick={()=>appendIncome({ 
                                    incNature: '', 
                                    incAddress: '' 
                                  })}
                                >
                                  <FaPlus />
                                </Button>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {incomeFields.map((field, index) => (
                              <tr key={field.id}>
                                <td>
                                  <Form.Control
                                    {...register(`incomeRows.${index}.incNature`)} 
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    {...register(`incomeRows.${index}.incAddress`)}
                                    onClick={() => openAddress({
                                      targetIndex: index,
                                      targetKey: `incomeRows.${index}.incAddress`,
                                      onSelect: (val) => setValue(`incomeRows.${index}.incAddress`, val)
                                    })}
                                    readOnly
                                  />
                                </td>
                                <td className="text-center">
                                  <Button 
                                    variant="danger" 
                                    size="sm" 
                                    onClick={() => removeIncome(index)}
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
                              <th width='5%' className='text-center'>
                                <Button 
                                  size="sm" 
                                  className='tbl-btn' 
                                  onClick={()=>appendPref({
                                    prefCreditor: '',
                                    prefAddress: '',
                                    prefDateGranted: '',
                                    prefOrigBal: '',
                                    prefPresBal: '',
                                    prefMonInstallment: ''
                                  })}
                                >
                                  <FaPlus />
                                </Button>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {prefFields.map((row, index) => (
                              <tr key={index}>
                                <td>
                                  <Form.Control
                                    type="text"
                                    {...register(`preferenceRows.${index}.prefCreditor`)} 
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    {...register(`preferenceRows.${index}.prefAddress`)} 
                                    onClick={() => openAddress({
                                      targetIndex: index,
                                      targetKey: `preferenceRows.${index}.prefAddress`,
                                      onSelect: (val) => setValue(`preferenceRows.${index}.prefAddress`, val)
                                    })}
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="date"
                                    {...register(`preferenceRows.${index}.prefDateGranted`)} 
                                    max={new Date().toISOString().split("T")[0]}
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    {...register(`preferenceRows.${index}.prefOrigBal`)} 
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    {...register(`preferenceRows.${index}.prefPresBal`)} 
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    {...register(`preferenceRows.${index}.prefMonInstallment`)} 
                                  />
                                </td>
                                <td className='text-center'>
                                  <Button
                                    className='mx-auto'
                                    variant="danger"
                                    size="sm"
                                    onClick={() => removePref(index)}
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
                              <th width='5%' className="text-center">
                                <Button 
                                  size="sm" 
                                  className='tbl-btn' 
                                  onClick={()=>appendCref({
                                    refFullName: '',
                                    refAddress: '',
                                    refContact: '',
                                    refRelation: ''
                                  })}
                                >
                                  <FaPlus />
                                </Button>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {crefFields.map((row, index) => (
                              <tr key={index}>
                                <td>
                                  <Form.Control
                                    type="text"
                                    {...register(`referenceRows.${index}.refFullName`)} 
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    {...register(`referenceRows.${index}.refAddress`)} 
                                    onClick={() => openAddress({
                                      targetIndex: index,
                                      targetKey: `referenceRows.${index}.refAddress`,
                                      onSelect: (val) => setValue(`referenceRows.${index}.refAddress`, val)
                                    })}
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    {...register(`referenceRows.${index}.refContact`)} 
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    {...register(`referenceRows.${index}.refRelation`)} 
                                  />
                                </td>
                                <td className="text-center">
                                  <Button
                                    className='mx-auto'
                                    variant="danger"
                                    size="sm"
                                    onClick={() => removeCref(index)}
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
                              <th width='5%' className="text-center">
                                <Button 
                                  size="sm" 
                                  className='tbl-btn' 
                                  onClick={()=>appendProp({
                                    propsKind: '',
                                    propsLocation: '',
                                    propsValue: '',
                                    propsImbursement: ''
                                  })}
                                >
                                  <FaPlus />
                                </Button>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {propFields.map((row, index) => (
                                <tr key={index}>
                                  <td>
                                    <Form.Control 
                                      type='text'
                                      {...register(`propertyRows.${index}.propsKind`)}
                                    />  
                                  </td>
                                  <td>
                                    <Form.Control 
                                      type='text'
                                      {...register(`propertyRows.${index}.propsLocation`)}
                                      onClick={() => openAddress({
                                        targetIndex: index,
                                        targetKey: `propertyRows.${index}.propsLocation`,
                                        onSelect: (val) => setValue(`propertyRows.${index}.propsLocation`, val)
                                      })}
                                    />
                                  </td>
                                  <td>
                                    <Form.Control 
                                      type='text'
                                      {...register(`propertyRows.${index}.propsValue`)}
                                    />
                                  </td>
                                  <td>
                                    <Form.Control 
                                      type='text'
                                      {...register(`propertyRows.${index}.propsImbursement`)}
                                    />
                                  </td>
                                  <td className="text-center">
                                    <Button 
                                      className='mx-auto' 
                                      variant='danger' 
                                      size='sm' 
                                      onClick={() => removeProp(index)}
                                    >
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
                        <h5 className='text-warning'>Documents</h5>
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
                                <td className="align-middle text-center">
                                  {row.isSaved ? (
                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                      {/* Visual Indicator */}
                                      <span className="badge rounded-pill bg-success-subtle text-success border border-success px-3">
                                        <i className="bi bi-check-circle-fill me-1"></i> ATTACHED
                                      </span>
                                    </div>
                                  ) : (
                                    <Form.Control 
                                      type="file" 
                                      size="sm" 
                                      className="form-control-placeholder"
                                      onChange={(e) => handleFile(index, e.target.files[0])} 
                                    />
                                  )}
                                </td>
                                <td className="border p-2 text-center">
                                  <Button className='mx-auto' variant='danger' size='sm' 
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
          <Button 
            variant='primary' 
            onClick={handleSubmit(saveCreditApplication)}
            className='d-flex align-items-center gap-1'
            disabled={isCreating || loadingCreditApp}
          >
            {isCreating ? 
              (<><CircularProgress size={20} color="inherit" /> Saving...</>)
              :
              (loadingCreditApp ? 
                <><CircularProgress size={20} color="inherit" /> Fetching...</>
                :
                <><FaSave /> Save</>
              )
            }
          </Button>
          <Button 
            variant="danger" 
            onClick={handleClose}
            className='d-flex align-items-center gap-1'
          >
            <FaTimes /> Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default React.memo(ModalCreditApplication);
