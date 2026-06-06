import React, { useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Card, Table, Form } from 'react-bootstrap'
import { FaTimes, FaPlus, FaTrash, FaSave, FaDownload, FaUpload, FaPaperclip } from "react-icons/fa";
import { CircularProgress } from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';

import ModalAddress from '../AddressModals/ModalAddress';
import GlobalMap from '../GlobalMap';
import FormTitle from '../FormTitle';

import { useAddressManager } from '../../../hooks/HooksAddress/useAddressManager';
import { useCreditApplication, useCreateNewCreditApp, useUpdateCreditApp } from '../../../hooks/HooksCreditApp/useCreditApplication';
import { useNotification } from '../../../context/NotificationContext';
import { fetchWithRetry } from '../../../utils/network';
import { calculateAge } from '../../../utils/computations';
import { formatMobile } from '../../../utils/formatters';
import axios from 'axios';

function ModalCreditApplication({show, handleClose, customerId, applicationId}) {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = sessionStorage.getItem('token');
  const notify = useNotification();
  const [serverErrors, setServerErrors] = useState({});

  const handleDownload = async (filePath, fileName) => {
      try {
          const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
          const encodedPath = btoa(cleanPath);

          const response = await axios.get(`http://localhost:8000/api/download-file/${encodedPath}`, {
              responseType: 'blob', // Important: ito ang nag-receive ng binary data
              headers: { 'Authorization': `Bearer ${token}` }
          });

          // --- DITO ANG PAGBABAGO ---
          // 1. I-detect ang mime type (halimbawa: image/png, application/pdf)
          const contentType = response.headers['content-type'] || 'image/png'; 
          
          // 2. I-set ang type sa loob ng Blob
          const blob = new Blob([response.data], { type: contentType });
          
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName); 
          document.body.appendChild(link);
          link.click();
          
          link.remove();
          window.URL.revokeObjectURL(url);
          // ---------------------------

      } catch (error) {
          console.error("Error downloading file:", error);
      }
  };
  
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
    mobile: '+63',
    incomeRows: [{ 
      incNature: '', 
      incAddress: '' 
    }],
    preferenceRows: [{ 
      prefCreditor: '',
      prefAddress: '',
      prefDateGranted: '',
      prefOrigBal: 0,
      prefPresBal: 0,
      prefMonInstallment: 0
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
  const { mutate: updateCreditApp, isPending: isUpdating } = useUpdateCreditApp();
  const { register, handleSubmit, reset, setValue, setError, control, watch, formState: { errors } } = useForm({
    defaultValues: initialValues
  });

  const birthdateValue = watch("birthdate");
  useEffect(() => {
    if (birthdateValue) {
        const age = calculateAge(birthdateValue);
        setValue("age", age); // I-set ang value sa age field
    }
  }, [birthdateValue, setValue]);

  const spouseBirthdateValue = watch("spouseBirthDate");
  useEffect(() => {
    if (spouseBirthdateValue) {
        setValue("spouseAge", calculateAge(spouseBirthdateValue));
    }
  }, [spouseBirthdateValue, setValue]);

  const civilStatus = watch("civilStatus");
  useEffect(() => {
    if (civilStatus === 'Single') {
      // I-reset ang mga fields ng spouse kapag Single
      setValue("spouseName", "");
      setValue("spouseBirthDate", "");
      setValue("spouseAge", 0);
    }
  }, [civilStatus, setValue]);

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
      attShortName: '',
      file: null,
      myAttId: null
    }
  ]);
  const [files, setFiles] = useState({});

  const saveCreditApplication = (data) => {
    setServerErrors({});
    const formData = new FormData();
    const isUpdate = !!applicationId;

    const validAttachments = attachments.filter(att => att.file instanceof File);

    // I-flat ang data: tanggalin ang 'primary' wrapper
    // Lahat ng fields sa 'data' ay ilalagay natin sa root ng FormData
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    // I-append ang nested arrays bilang JSON strings para ma-parse sa backend
    formData.append('preferenceRows', JSON.stringify(data.preferenceRows || []));
    formData.append('referenceRows', JSON.stringify(data.referenceRows || []));
    formData.append('incomeRows', JSON.stringify(data.incomeRows || []));
    formData.append('propertyRows', JSON.stringify(data.propertyRows || []));

    // Attachments meta
    formData.append('attachments_meta', JSON.stringify(validAttachments.map(att => ({
      attModule: att.attModule,
      attReq: att.attReq,
      attShortName: att.attShortName,
      customer_id: data.customer_id,
      myAttId: att.myAttId
    }))));

    validAttachments.forEach((att) => {
      formData.append('attachments[]', att.file);
    });

    const mutation = isUpdate ? updateCreditApp : createNewCreditApp;

    mutation(isUpdate ? { appId: applicationId, data: formData } : formData, {
        onSuccess: (response) => {
          notify.alertMsg(response.message, "Credit Application saved successfully.", "success", "Saving...");
          reset(initialValues);
          handleClose();
        },
        onError: (error) => {
          if (error.response?.status === 422) {
            const backendErrors = error.response.data.errors;
            Object.keys(backendErrors).forEach((field) => {
              setError(field, { type: "server", message: backendErrors[field][0] });
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

    setFiles(prev => ({
      ...prev,
      [index]: file
    }));
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
        attShortName: r.reqShortName,
        file: null,
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

      console.log(appData);
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
            file: null,
            myAttId: found?.id || null
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
                          <Form.Label className="mb-0">Mobiles #</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Control
                            type="text"
                            name="mobile"
                            {...register("mobile", {
                              onChange: (e) => {
                                let val = e.target.value;
                                if (!val.startsWith('+63')) {
                                  val = '+63' + val.replace(/^\+?63?|^0/, '');
                                }
                                const formatted = formatMobile(val);
                                setValue("mobile", formatted);
                              }
                            })}
                            placeholder="+63-999-999-9999"
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
                            disabled={civilStatus === 'Single'}
                            readOnly={civilStatus === 'Single'}
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
                            disabled={civilStatus === 'Single'}
                            readOnly={civilStatus === 'Single'}
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
                    <Col md={12} className='mb-1'>
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
                        rows={1}
                        readOnly
                      />
                    </Col>
                    <GlobalMap />
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
                      <h5 className='text-warning'>Other Sources Of Income</h5>
                      <div className="table-section">
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
                      <h5 className='text-warning'>Credit References</h5>
                      <div className="table-section">
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
                      <h5 className='text-warning'>Personal References</h5>
                      <div className="table-section">
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
                      <h5 className='text-warning'>Real and/or Personal Properties Owned</h5>
                      <div className="table-section">
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
                      <h5 className='text-warning'>Documents</h5>
                      <div className="table-section">
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th width='20%' className='d-none'>Module</th>
                              <th width='60%'>File name</th>
                              <th width='10%'>Status</th>
                              <th width='10%' className='text-center'>
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {attachments.map((row, index) => (
                              <tr key={index}>
                                <td className='d-none'>
                                  <input
                                    className="border p-1 w-100 rounded-lg"
                                    value={row.myAttId}
                                    onChange={(e) => handleChangeAtt(index, "myAttId", e.target.value)}
                                  />

                                  <input
                                    className="border p-1 w-100 rounded-lg"
                                    value={row.attModule}
                                    onChange={(e) => handleChangeAtt(index, "attModule", e.target.value)}
                                  />

                                  <input
                                  className="border p-1 w-100 rounded-lg"
                                  value={row.attShortName}
                                  onChange={(e) => handleChangeAtt(index, "attShortName", e.target.value)}
                                  />
                                </td>
                                <td className="border p-2">
                                  <input
                                    className="border-0 p-1 w-100 bg-transparent"
                                    value={row.attReq}
                                    onChange={(e) => handleChangeAtt(index, "attReq", e.target.value)}
                                    disabled
                                    readOnly
                                  />
                                </td>
                                <td className="align-middle text-center">
                                  {row.isSaved ? (
                                    <div className="attachment-badge">
                                      {/* FIXME: Hardcoded yung download file ko */}
                                      <span
                                          onClick={() => handleDownload("credit_app_attachments/APP-0000006/VID.png", row.attReq)}
                                          title="Download the File."
                                          className="download-btn text-decoration-none"
                                          style={{ cursor: 'pointer', color: 'blue' }} // Para magmukhang link
                                      >
                                          <FaDownload size={12} />
                                      </span>

                                      <span className="badge rounded-pill bg-success-subtle text-success border border-success px-3 shadow-sm">
                                        <i className="bi bi-check-circle-fill me-1"></i>
                                        ATTACHED
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                      {/* Visual Indicator */}
                                      <span className="badge rounded-pill bg-danger-subtle text-danger border border-danger px-3 shadow-sm">
                                        <i className="bi bi-check-circle-fill me-1"></i> NO FILE YET
                                      </span>
                                    </div>
                                  )}
                                </td>
                                <td className="border p-2 text-center">
                                  <div className="d-flex align-items-center justify-content-center gap-2">
                                    
                                    <input
                                      type="file"
                                      id={`file-input-${index}`}
                                      className="d-none"
                                      onChange={(e) => handleFile(index, e.target.files[0])}
                                    />

                                    <label
                                      htmlFor={`file-input-${index}`}
                                      role="button"
                                      title={files?.[index] ? "File attached" : "Attach a file"}
                                      className={`d-flex align-items-center justify-content-center btn btn-sm shadow-sm ${
                                        files?.[index] ? "btn-primary" : "btn-secondary"
                                      }`}
                                      style={{
                                        width: "34px",
                                        height: "34px",
                                        borderRadius: "6px",
                                      }}
                                    >
                                      {files?.[index] ? (
                                        <FaPaperclip size={14} />
                                      ) : (
                                        <FaUpload size={14} />
                                      )}
                                    </label>
                                    {/* TODO: Function for deleting the file. */}
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      onClick={() => removeRowAtt(index)}
                                      title="Remove the file."
                                      className="d-flex align-items-center justify-content-center"
                                      style={{
                                        width: "34px",
                                        height: "34px",
                                        padding: 0,
                                      }}
                                    >
                                      <FaTrash size={12} />
                                    </Button>

                                  </div>
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
            disabled={(isCreating || isUpdating) || loadingCreditApp}
          >
            {(isCreating || isUpdating) ? 
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

      {/* MODAL FOR ADDRESS HERE.. */}
      <ModalAddress 
        show={addressConfig.show} 
        handleClose={closeAddress} 
        onSelect={handleSelect}
      />
      {/* END MODAL FOR ADDRESS HERE.. */}
    </div>
  )
}

export default React.memo(ModalCreditApplication);
