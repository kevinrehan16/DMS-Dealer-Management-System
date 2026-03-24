import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import { CircularProgress } from '@mui/material';
import { Modal, Button, Row, Col, Form, Alert } from 'react-bootstrap'
import { FaSave, FaTimes, FaInfoCircle } from "react-icons/fa";
import { useCreateNewUser, useEditUser, useUpdateUser } from '../../../hooks/HooksUser/useUsers';

const ModalUser = ({ show, handleClose, userId }) => {

  const { mutate: createUser, isPending: isCreating } = useCreateNewUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const { data: userData, isLoading: isFetching } = useEditUser(userId);

  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();

  const saveNewUser = (data) =>{
    // Gawa tayo ng kopya ng data
    
    if (userId) {
      const payload = { ...data };
      if (!payload.password) delete payload.password;

      updateUser({ id: userId, data: payload }, {
        onSuccess: (response) => {
          console.log("Successfully Updated Data from Server:", response);
          reset();
          handleClose();
        }
      });
    } else {
      createUser(data, {
        onSuccess: (response) => {
          console.log("Successfully Added Data from Server:", response);
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
  }

  useEffect(() => {
    if (!show) return;

    if (userId && userData) {
      // EDIT MODE: Punuin ang form
      reset(userData.users); // .user dahil sa Laravel response mo ['users' => $users]
    } else {
      // ADD MODE: Linisin ang form
      reset({ firstName: '', lastName: '', email: '', gender: '', userName: '', password: '', userType: '' });
    }
  }, [userId, userData, reset, show]);

  return (
    <div>
      <Modal show={show} onHide={handleClose} size='md' backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{userId != null ? 'Update User' : 'Create User' }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Alert variant="info" className="d-flex align-items-center shadow-sm border-0">
                <FaInfoCircle className="me-1" />
                <div>
                  <span className='fw-medium'>Note:</span> Kindly fillup all the information.
                </div>
              </Alert>
              <Row className='mb-3'>
                <Col md={3}>
                  <Form.Label className='mt-1'>First Name</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control 
                    type='text' 
                    name='firstName' 
                    placeholder='Enter your first name' 
                    required 
                    {...register("firstName")} 
                    isInvalid={!!errors.firstName}
                  />
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col md={3}>
                  <Form.Label className='mt-1'>Last Name</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control 
                    type='text' 
                    name='lastName' 
                    placeholder='Enter your last name' 
                    required 
                    {...register("lastName")} 
                    isInvalid={!!errors.lastName}
                  />
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col md={3}>
                  <Form.Label className='mt-1'>Email</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control 
                    type='email' 
                    name='email' 
                    placeholder='Enter your email' 
                    required 
                    {...register("email")} 
                    isInvalid={!!errors.email}
                  />
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col md={3}>
                  <Form.Label className='mt-1'>Gender</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Select 
                    as='select' 
                    name='gender' 
                    required 
                    {...register("gender")} 
                    isInvalid={!!errors.gender}
                  >
                    <option value=''>--Select Gender--</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col md={3}>
                  <Form.Label className='mt-1'>Username</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control 
                    type='text' 
                    name='userName' 
                    placeholder='Enter your user name' 
                    required 
                    {...register("userName")} 
                    isInvalid={!!errors.userName}
                  />
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col md={3}>
                  <Form.Label className='mt-1'>Password</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control 
                    type='password' 
                    name='password' 
                    placeholder='Enter your password' 
                    required 
                    {...register("password")} 
                    isInvalid={!!errors.password}
                  />
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col md={3}>
                  <Form.Label className='mt-1'>User Type</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Select 
                    as='select' 
                    name='userType' 
                    required 
                    {...register("userType")}
                    isInvalid={!!errors.userType} 
                  >
                    <option value=''>--Select User Type--</option>
                    <option value='administrator'>Administrator</option>
                    <option value='staff'>Staff</option>
                </Form.Select>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant='primary' 
            onClick={handleSubmit(saveNewUser)}
            disabled={isCreating || isUpdating || isFetching}
            className='d-flex align-items-center gap-1'
          >
            {(isCreating || isUpdating) ? 
              (<><CircularProgress size={20} color="inherit" /> Saving...</>)
              :
              isFetching ? 
              (<><CircularProgress size={20} color="inherit" /> Fetching</>)
              :
              (<><FaSave /> Save</>)
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

export default React.memo(ModalUser);