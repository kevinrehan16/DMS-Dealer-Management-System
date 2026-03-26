import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";

import { useForm } from "react-hook-form";

import AddressForm from "./ModalChild/AddressForm";

export default function ModalAddress({ show, handleClose, onSelect }) {

  const { register, setValue, watch, handleSubmit, reset } = useForm();

  const allValues = watch();

  const handleDone = () => {
    // Bubuuin natin ang string gaya ng ginagawa mo sa Laravel API Resource
    const parts = [
      allValues.addressnum,
      allValues.addressbldg,
      allValues.addressstreet,
      allValues.addressssubd,
      allValues.addresssbrgy,
      allValues.addressscity,
      allValues.addresssprovince,
      allValues.addresssregion
    ];

    // Filter para sa mga walang laman, tapos pagsamahin gamit ang comma
    const fullAddressString = parts.filter(Boolean).join(', ');

    // Ipapasa pabalik sa parent field
    onSelect(fullAddressString);
    
    // Linisin ang form at isara
    reset();
    handleClose();
  };

  useEffect(() => {
    if (show) {
      // I-reset sa specific empty values pagka-open na pagka-open
      reset({
        addressnum: "",
        addressbldg: "",
        addressstreet: "",
        addressssubd: "",
        addresssbrgy: "",
        addressscity: "",
        addresssprovince: "",
        addresssregion: ""
      });
    }
  }, [show, reset]);

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>Select Address</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <AddressForm setFormValue={setValue} register={register} />
      </Modal.Body>
      <Modal.Footer>
        {/* Tinatawag ang handleDone pag click ng success button */}
        <Button variant="success" onClick={handleDone} className="d-flex align-items-center gap-1">
          <FaCheck /> Done
        </Button>
        <Button variant="danger" onClick={handleClose} className="d-flex align-items-center gap-1">
          <FaTimes /> Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}