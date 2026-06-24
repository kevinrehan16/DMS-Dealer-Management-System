import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { CircularProgress } from '@mui/material';
import { Modal, Button, Row, Col, Form, Alert } from 'react-bootstrap'
import { FaSave, FaTimes, FaInfoCircle, FaAsterisk } from "react-icons/fa";
import FormTitle from '../FormTitle';

import { cleanToDouble } from '../../../utils/formatters';
import { useNotification } from '../../../context/NotificationContext';
import { useCreateNewCatalog, useUpdateCatalog, useEditUnitCatalog } from '../../../hooks/HooksInventory/useInventory';

const ModalUnitCatalog = ({ show, handleClose, motorcycleId }) => {
  const notify = useNotification();
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();

  const { mutate: createCatalog, isPending: isCreating } = useCreateNewCatalog();
  const { mutate: updateCatalog, isPending: isUpdating } = useUpdateCatalog();
  const { data: unitCatalog, isLoading: isFetching } = useEditUnitCatalog(motorcycleId);

  const saveNewUnitCatalog = (data) => {
    const payload = {
        ...data,
        cash_price: cleanToDouble(data.original_price),
        original_price: cleanToDouble(data.original_price),
        unit_cost: cleanToDouble(data.unit_cost),
        srp_value: cleanToDouble(data.srp_value),
        installment_price: cleanToDouble(data.installment_price),
        interest: cleanToDouble(data.interest),
    };

    const mutation = motorcycleId ? updateCatalog : createCatalog;
    // Gawing object ang argument para sa update, o ipasa ang payload lang para sa create
    const mutationArgs = motorcycleId ? { id: motorcycleId, catalogData: payload } : payload;

    mutation(mutationArgs, {
      onSuccess: (response) => {
        notify.alertMsg(
          response.data.message || (motorcycleId ? "Unit Catalog Updated!" : "New Unit Catalog Saved!"),
          (motorcycleId ? "Unit Catalog has been updated successfully." : "New Unit Catalog has been saved successfully."),
          "success",
          (motorcycleId ? "Updating Unit Catalog." : "Saving Unit Catalog.")
        );
        reset();
        handleClose();
      },
      onError: (error) => {
        if (error.response?.status === 422) {
          const backendErrors = error.response.data.errors;
          Object.keys(backendErrors).forEach((field) => {
            setError(field, {
              type: "server",
              message: backendErrors[field][0],
            });
          });
        }
      }
    });
  }

  useEffect(() => {
    if (motorcycleId && unitCatalog) {
        reset(unitCatalog); // Awtomatikong i-pa-populate nito lahat ng fields
    }else{
        reset({
            brand: '',
            model_name: '',
            color: '',
            cash_price: '',
            original_price: '',
            unit_cost: '',
            srp_value: '',
            installment_price: '',
            interest: ''
        });
    }
  }, [unitCatalog, reset]);

  return (
    <div>
      <Modal show={show} onHide={handleClose} size='md' backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{motorcycleId != null ? 'Update Catalog' : 'Create Catalog' }</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <Row>
            <Col md={12}>
              <Alert variant="info" className="d-flex align-items-center shadow-sm border-0 mb-4">
                <FaInfoCircle className="me-1" />
                <div>
                  <span className='fw-medium'>Note:</span> Kindly fillup all the required (<FaAsterisk size={6} className='mb-1 text-danger' />) information.
                </div>
              </Alert>

              <FormTitle title="Unit Details" />

              <Row className='mb-2'>
                <Col md={4}>
                  <Form.Label className='mt-1'>Unit Brand <FaAsterisk size={6} className='mb-2 text-danger' /></Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control 
                    type='text' 
                    placeholder='Enter the brand' 
                    required 
                    {...register("brand")} 
                    isInvalid={!!errors.brand}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.brand?.message}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              <Row className='mb-2'>
                <Col md={4}>
                  <Form.Label className='mt-1'>Unit Model <FaAsterisk size={6} className='mb-2 text-danger' /></Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control 
                    type='text' 
                    placeholder='Enter the model' 
                    required 
                    {...register("model_name")} 
                    isInvalid={!!errors.model_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.model_name?.message}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              <Row className='mb-4'>
                <Col md={4}>
                  <Form.Label className='mt-1'>Unit Color <FaAsterisk size={6} className='mb-2 text-danger' /></Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control 
                    type='text' 
                    placeholder='Enter the color' 
                    required 
                    {...register("color")} 
                    isInvalid={!!errors.color}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.color?.message}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              <FormTitle title="Price Details" />

              <Row className='mb-2'>
                <Col md={4}>
                  <Form.Label className='mt-1'>Cash Price <FaAsterisk size={6} className='mb-2 text-danger' /></Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control 
                    type='text' 
                    placeholder='0.00'
                    className='text-end' 
                    required 
                    {...register("cash_price")} 
                    isInvalid={!!errors.cash_price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cash_price?.message}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              <Row className='mb-2'>
                <Col md={4}>
                  <Form.Label className='mt-1'>Original Price <FaAsterisk size={6} className='mb-2 text-danger' /></Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control 
                    type='text' 
                    placeholder='0.00'
                    className='text-end' 
                    required 
                    {...register("original_price")} 
                    isInvalid={!!errors.original_price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.original_price?.message}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              <Row className='mb-2'>
                <Col md={4}>
                  <Form.Label className='mt-1'>Unit Cost <FaAsterisk size={6} className='mb-2 text-danger' /></Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control 
                    type='text' 
                    placeholder='0.00'
                    className='text-end' 
                    required 
                    {...register("unit_cost")} 
                    isInvalid={!!errors.unit_cost}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.unit_cost?.message}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              <Row className='mb-2'>
                <Col md={4}>
                  <Form.Label className='mt-1'>SRP Value <FaAsterisk size={6} className='mb-2 text-danger' /></Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control 
                    type='text' 
                    placeholder='0.00'
                    className='text-end' 
                    required 
                    {...register("srp_value")} 
                    isInvalid={!!errors.srp_value}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.srp_value?.message}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              <Row className='mb-2'>
                <Col md={4}>
                  <Form.Label className='mt-1'>Installment Price <FaAsterisk size={6} className='mb-2 text-danger' /></Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control 
                    type='text' 
                    placeholder='0.00'
                    className='text-end' 
                    required 
                    {...register("installment_price")} 
                    isInvalid={!!errors.installment_price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.installment_price?.message}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              <Row className='mb-2'>
                <Col md={4}>
                  <Form.Label className='mt-1'>Interest <FaAsterisk size={6} className='mb-2 text-danger' /></Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control 
                    type='text' 
                    placeholder='0.00'
                    className='text-end' 
                    required 
                    {...register("interest")} 
                    isInvalid={!!errors.interest}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.interest?.message}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant='primary' 
            onClick={handleSubmit(saveNewUnitCatalog)}
            disabled={isCreating || isUpdating}
            className='d-flex align-items-center gap-1'
          >
            {(isCreating || isUpdating) ? 
              (<><CircularProgress size={20} color="inherit" /> Saving...</>)
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

export default React.memo(ModalUnitCatalog);