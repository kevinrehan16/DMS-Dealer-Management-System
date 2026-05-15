import React, { useState } from 'react';
import Select from 'react-select';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { FaSave, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { useForm, Controller } from 'react-hook-form';

import { handleAmountBlur, handleAmountFocus, cleanToDouble } from '../../../utils/formatters';
import { useInquiryLookup } from '../../../hooks/HooksInquiry/useInquiry';
import { useCreatePayment } from '../../../hooks/HookCashier/useCashier';

import FormTitle from '../FormTitle';

const PaymentModal = ({ show, handleClose }) => {
  const initialForm = {
    inquiry_id: '',
    or_number: '',
    amount_collected: '',
    payment_type: 'MONTHLY_INSTALLMENT',
    payment_mode: 'Cash',
    transaction_date: new Date().toISOString().split('T')[0],
    branch_code: 'MAIN',
    remarks: ''
  };

  const [searchTerm, setSearchTerm] = useState('');

  const { data: activeInquiries = [], isLoading } = useInquiryLookup(searchTerm);
  const options = activeInquiries?.map(iq => ({
    value: iq.id,
    label: `${iq.full_name} - (${iq.inquiry_id})`
  })) || [];

  const { mutate: CreatePayment, isPending: isCreating } = useCreatePayment();
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue, 
    setError, 
    control, 
    formState: { errors } 
  } = useForm({
    defaultValues: initialForm
  });

  const customStyles = {
    control: (base) => ({
      ...base,
      height: '38px',
      borderRadius: '0.375rem',
      borderColor: errors.inquiry_id ? '#dc3545' : '#dee2e6', 
      '&:hover': { 
        borderColor: errors.inquiry_id ? '#dc3545' : '#86b7fe' 
      },
      '&:hover': { borderColor: '#86b7fe' },
      boxShadow: errors.inquiry_id ? '0 0 0 0.25rem rgba(220, 53, 69, 0.25)' : base.boxShadow,
      zIndex: 0,
    }),
    // Idagdag itong menuPortal para siguradong nasa pinakataas
    menuPortal: (base) => ({ 
      ...base, 
      zIndex: 9999 
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999
    })
  };

  const onFormSubmit = async (data) => {
    // Siguraduhing malinis ang amount (tanggal koma) bago i-send
    const cleanData = {
      ...data,
      amount_collected: cleanToDouble(data.amount_collected)
    };

    CreatePayment(cleanData, {
      onSuccess: () => {
        reset(initialForm);
        handleClose();
      },
      onError: (error) => {
        const backendErrors = error.response?.data?.errors;
        if (backendErrors) {
          // I-map ang errors sa tamang fields (hindi lang sa OR number)
          Object.keys(backendErrors).forEach((field) => {
            setError(field, { 
              type: "manual", 
              message: backendErrors[field][0] 
            });
          });
        } else {
          setError("or_number", { 
            type: "manual", 
            message: error.response?.data?.message || "Failed to save payment" 
          });
        }
      }
    });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
      <Modal.Header closeButton style={{ backgroundColor: '#FFB800', color: '#fff' }}>
        <Modal.Title>New Payment Transaction</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
        <FormTitle title="Payment Information" subTitle="" />
        
        {/* Ang form tag ay dapat naka-wrap sa lahat ng Rows */}
        <form id='payment-form' onSubmit={handleSubmit(onFormSubmit)}>
          
          <Row className="mb-3">
            {/* CUSTOMER NAME */}
            <Form.Group as={Col} md={6}>
              <Form.Label className="small fw-medium text-secondary">Customer Name</Form.Label>
              <Controller
                name="inquiry_id"
                control={control}
                rules={{ required: "Customer Name is required." }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={options}
                    menuPortalTarget={document.body}
                    menuPosition="fixed"
                    isSearchable={true}
                    isClearable={true}
                    placeholder="Search customer..."
                    noOptionsMessage={() => "No customer found..."}
                    styles={customStyles}
                    onInputChange={(newValue) => {
                      // Ito ang magti-trigger sa useInquiryLookup hook mo
                      setSearchTerm(newValue);
                    }}
                    filterOption={() => true}
                    isLoading={isLoading}
                    value={options.find((opt) => opt.value === field.value) || null}
                    onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : "")}
                  />
                )}
              />
              {errors.inquiry_id && <small className="text-danger d-block mt-1">{errors.inquiry_id.message}</small>}
            </Form.Group>

            {/* OR NUMBER */}
            <Form.Group as={Col} md={6}>
              <Form.Label className="small fw-medium text-secondary">Official Receipt (OR) No.</Form.Label>
              <Form.Control
                type="text"
                placeholder="OR-00000"
                isInvalid={!!errors.or_number}
                {...register("or_number", { required: "Official Receipt (OR) No. is required" })}
              />
              <Form.Control.Feedback type="invalid">{errors.or_number?.message}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            {/* AMOUNT COLLECTED */}
            <Form.Group as={Col} md={6}>
              <Form.Label className="small fw-medium text-secondary">Amount Collected</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text>₱</InputGroup.Text>
                <Form.Control
                  type="text"
                  isInvalid={!!errors.amount_collected}
                  className="text-end"
                  {...register("amount_collected", { 
                    required: "Amount collected is required",
                    min: {
                      value: 0.01,
                      message: "Amount Collected must be greater than 0.00"
                    },
                    validate: (value) => {
                      // Dahil may koma ang display, linisin natin bago i-check
                      const numericValue = parseFloat(value.toString().replace(/,/g, ''));
                      return numericValue > 0 || "Amount Collected must be greater than 0.00";
                    }
                  })}
                  onBlur={(e) => {
                    register("amount_collected").onBlur(e);
                    handleAmountBlur(e, setValue, 'amount_collected');
                  }}
                  onFocus={(e) => {
                    handleAmountFocus(e, setValue, 'amount_collected');
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.amount_collected?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* TRANSACTION DATE */}
            <Form.Group as={Col} md={6}>
              <Form.Label className="small fw-medium text-secondary">Transaction Date</Form.Label>
              <Form.Control
                type="date"
                isInvalid={!!errors.transaction_date}
                {...register("transaction_date", { required: "Date is required" })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.transaction_date?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            {/* PAYMENT TYPE */}
            <Form.Group as={Col} md={6}>
              <Form.Label className="small fw-medium text-secondary">Payment Type</Form.Label>
              <Form.Select {...register("payment_type")}>
                <option value="RESERVATION">Reservation Fee</option>
                <option value="DOWNPAYMENT">Downpayment</option>
                <option value="MONTHLY_INSTALLMENT">Monthly Amortization</option>
                <option value="PARTIAL_PAYMENT">Partial Payment</option>
                <option value="FULL_CASH">Full Cash Payment</option>
              </Form.Select>
            </Form.Group>

            {/* MODE OF PAYMENT */}
            <Form.Group as={Col} md={6}>
              <Form.Label className="small fw-medium text-secondary">Mode of Payment</Form.Label>
              <Form.Select {...register("payment_mode")}>
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Check">Check</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="small fw-medium text-secondary">Remarks</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Additional notes here..."
              {...register("remarks")}
            />
          </Form.Group>
        </form>

        <div className="bg-info p-2 rounded border shadow-sm">
          <small className="text-white d-flex align-items-center">
            <FaInfoCircle className="me-2 fs-5" /> 
            Please verify all entries before saving. Data will be posted to ledger.
          </small>
        </div>
      </Modal.Body>

      <Modal.Footer className="bg-light">
        <Button 
          form="payment-form"
          variant="primary" 
          type="submit" 
          disabled={isCreating}
          className="d-flex align-items-center justify-content-center gap-1"
        >
          {isCreating ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : (
            <>
              <FaSave className="me-1" /> Save
            </>
          )}
        </Button>
        <Button variant="danger" onClick={handleClose} className="d-flex align-items-center justify-content-center gap-1">
          <FaTimes className="me-1" /> Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;