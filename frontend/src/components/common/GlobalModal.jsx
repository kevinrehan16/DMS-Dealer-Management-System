// src/components/common/GlobalModal.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../../assets/css/Modal.css";

export default function GlobalModal({ show, handleClose, title, children, size, footer }) {
  return (
    <Modal show={show} onHide={handleClose} centered size={size} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        {footer} 
      </Modal.Footer>
    </Modal>
  );
}
