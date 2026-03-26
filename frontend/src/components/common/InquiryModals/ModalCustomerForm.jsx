import React, {useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

import { Modal, Button, Row, Col, Form, Alert } from 'react-bootstrap'
import { CircularProgress } from '@mui/material';
import { FaSave, FaTimes, FaInfoCircle  } from "react-icons/fa";

import AddressForm from '../AddressModals/ModalChild/AddressForm';

import { useCreateNewCustomer } from '../../../hooks/HooksCustomer/useCustomer';
import { formatMobile } from '../../../utils/formatters';
import { useNotification } from '../../../context/NotificationContext';

const ModalCustomerForm = ({show, handleClose, fetchCustomers}) => {
  const notify = useNotification();

  const [customerID, setCustomerId] = useState('');
  const { mutate: createCustomer, isPending: isCreating } = useCreateNewCustomer();
  const { register, handleSubmit, reset, setValue, setError, formState: { errors } } = useForm();
  
  const saveNewCustomer = (data) => {
    createCustomer(data, {
      onSuccess: (response) => {
        notify.alertMsg(
          response.data.message || "New Customer Saved!", 
          "New customer has beed saved successfully.",
          "success",
          "Saving Customer."
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

    if (customerID) {
      // reset(formattedData);
      reset({ 
        title: '',
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        gender: '',
        birthdate: '',
        mobile: ''
      });
    } else {
      // ADD MODE: Linisin ang form
      reset({ 
        title: '',
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        gender: '',
        birthdate: '',
        mobile: '+63'
      });
    }
  }, [customerID, show]);

  return (
    <div>
      <Modal show={show} onHide={handleClose} size='md' backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <Row>
            <Col>
              <Alert variant="info" className="d-flex align-items-center shadow-sm border-0">
                <FaInfoCircle className="me-1" />
                <div>
                  <span className='fw-medium'>Note:</span> Kindly fillup all the required 
                  (<b className='text-danger'>*</b>) informations.
                </div>
              </Alert>
              <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group controlId="formTitle" className="mb-2">
                  <Row>
                    <Col xs={4} className="d-flex align-items-center">
                      <Form.Label className="mb-0">Title <b className='text-danger'>*</b>
                      </Form.Label>
                    </Col>
                    <Col xs={8}>
                      <Form.Select 
                        as='select' 
                        name='title' 
                        {...register("title")}
                        className={errors.title ? 'is-invalid' : ''}
                        required
                      >
                        <option value=''>-- Select Title --</option>
                        <option value='mr'>Mr.</option>
                        <option value='mrs'>Mrs.</option>
                        <option value='ms'>Ms.</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formFirstName" className="mb-2">
                  <Row>
                    <Col xs={4} className="d-flex align-items-center">
                      <Form.Label className="mb-0">First Name <b className='text-danger'>*</b>
                      </Form.Label>
                    </Col>
                    <Col xs={8}>
                      <Form.Control
                        type="text"
                        className={`capitalize_text ${errors.firstName ? 'is-invalid' : ''}`}
                        name="firstName"
                        {...register("firstName")}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formLastName" className="mb-2">
                  <Row>
                    <Col xs={4} className="d-flex align-items-center">
                      <Form.Label className="mb-0">Last Name <b className='text-danger'>*</b>
                      </Form.Label>
                    </Col>
                    <Col xs={8}>
                      <Form.Control
                        type="text"
                        className={`capitalize_text ${errors.lastName ? 'is-invalid' : ''}`}
                        name="lastName"
                        {...register("lastName")}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formMiddleName" className="mb-2">
                  <Row>
                    <Col xs={4} className="d-flex align-items-center">
                      <Form.Label className="mb-0">Middle Name</Form.Label>
                    </Col>
                    <Col xs={8}>
                      <Form.Control
                        type="text"
                        className={`capitalize_text ${errors.middleName ? 'is-invalid' : ''}`}
                        name="middleName"
                        {...register("middleName")}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-2">
                  <Row>
                    <Col xs={4} className="d-flex align-items-center">
                      <Form.Label className="mb-0">Email Address <b className='text-danger'>*</b>
                      </Form.Label>
                    </Col>
                    <Col xs={8}>
                      <Form.Control
                        type="email"
                        className={`lowercase_text ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        {...register("email")}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formGender" className="mb-2">
                  <Row>
                    <Col xs={4} className="d-flex align-items-center">
                      <Form.Label className="mb-0">Gender <b className='text-danger'>*</b>
                      </Form.Label>
                    </Col>
                    <Col xs={8}>
                      <Form.Select 
                        as='select' 
                        name='gender' 
                        {...register("gender")}
                        className={`${errors.gender ? 'is-invalid' : ''}`}
                        required
                      >
                        <option value=''>-- Select Gender --</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formBirthdate" className="mb-2">
                  <Row>
                    <Col xs={4} className="d-flex align-items-center">
                      <Form.Label className="mb-0">Birth Date <b className='text-danger'>*</b>
                      </Form.Label>
                    </Col>
                    <Col xs={8}>
                      <Form.Control
                        type="date"
                        name="birthdate"
                        {...register("birthdate")}
                        className={`uppercase_text ${errors.birthdate ? 'is-invalid' : ''}`}
                        max={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formMobile" className="mb-2">
                  <Row>
                    <Col xs={4} className="d-flex align-items-center">
                      <Form.Label className="mb-0">Mobile Number</Form.Label>
                    </Col>
                    <Col xs={8}>
                      <Form.Control
                        type="text"
                        name="mobile"
                        {...register("mobile", {
                        required: "Mobile number is required",
                        onChange: (e) => {
                          let val = e.target.value;

                          // 1. Siguraduhin na laging may +63
                          if (!val.startsWith('+63')) {
                          // Kung nag-type sila ng "09...", tatanggalin ang "0" at papaltan ng "+639"
                            val = '+63' + val.replace(/^\+?63?|^0/, '');
                          }

                          // 2. I-apply ang formatMobile function mo
                          const formatted = formatMobile(val);

                          // 3. I-update ang value sa react-hook-form manually para mag-reflect sa UI
                          setValue("mobile", formatted);
                        }
                      })}
                      // Huwag gumamit ng 'value=' dito para hindi mag-error ang React
                      placeholder="+63-999-999-9999"
                        className={`${errors.mobile ? 'is-invalid' : ''}`}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <hr />

                {/* ADDRESS FORM HERE... */}
                <AddressForm 
                  setFormValue={setValue} 
                  register={register}
                />
                
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="primary" 
            onClick={handleSubmit(saveNewCustomer)} 
            className="d-flex align-items-center gap-1"
          >
            {isCreating ? 
              (<><CircularProgress size={20} color="inherit" /> Saving...</>)
              :
              (<><FaSave /> Save</>)
            }
          </Button>
          <Button 
            variant="danger" 
            onClick={handleClose} 
            className="d-flex align-items-center gap-1"
          >
            <FaTimes /> Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default React.memo(ModalCustomerForm);
