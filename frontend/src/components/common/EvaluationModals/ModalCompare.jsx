import React from 'react';
import { Modal, Row, Col, Table, Button } from 'react-bootstrap';
import { FaUser, FaFileInvoiceDollar, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";

// Reusable structural component for the "Label + Value" look
const DataBlock = ({ label, value }) => ( // Add 'value' here
  <div className="mb-3">
    <label className="text-muted small fw-bold mb-1 d-block text-uppercase">
      {label}
    </label>
    <div 
      className="p-2 border-bottom bg-light rounded-1" 
      style={{ minHeight: '35px', fontSize: '0.9rem' }}
    >
      {value || '---'} {/* Add this to display the value */}
    </div>
  </div>
);

const ModalCompare = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl" backdrop="static" keyboard={false} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          DATA COMPARISON VIEW
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          
          {/* LEFT COLUMN: FORM 1 STRUCTURE */}
          <Col md={6} className="border-end p-4" style={{ backgroundColor: '#f8f9fa' }}>
            <h5 className="text-primary border-bottom pb-2 mb-3 fs-6 fw-bold">
              <FaUser className="me-2" /> PRIMARY FORM DETAILS
            </h5>
            
            <Row className="g-2">
              <Col md={4}><DataBlock label="Last Name" value="Kevin Macandog"/></Col>
              <Col md={4}><DataBlock label="First Name" /></Col>
              <Col md={4}><DataBlock label="Middle Name" /></Col>
            </Row>

            <Row className="g-2">
              <Col md={4}><DataBlock label="Birthday" /></Col>
              <Col md={3}><DataBlock label="Age" /></Col>
              <Col md={5}><DataBlock label="Gender" /></Col>
            </Row>

            <DataBlock label="Full Address" />

            <h6 className="mt-4 text-secondary small fw-bold">TABLE DATA SECTION</h6>
            <Table bordered hover size="sm" className="small shadow-sm mt-2">
              <thead className="table-secondary">
                <tr>
                  <th>COLUMN A</th>
                  <th>COLUMN B</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ height: '30px' }}></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Col>

          {/* RIGHT COLUMN: FORM 2 STRUCTURE */}
          <Col md={6} className="p-4 bg-white">
            <h5 className="text-success border-bottom pb-2 mb-3 fs-6 fw-bold">
              <FaFileInvoiceDollar className="me-2" /> SECONDARY FORM DETAILS
            </h5>

            <Row className="g-2">
              <Col md={6}><DataBlock label="Field Title 1" /></Col>
              <Col md={6}><DataBlock label="Field Title 2" /></Col>
            </Row>

            <h6 className="mt-3 text-secondary small fw-bold">
              <FaMapMarkerAlt className="me-1" /> LOCATION GROUP
            </h6>
            <Row className="g-2">
              <Col md={6}><DataBlock label="Address Type A" /></Col>
              <Col md={6}><DataBlock label="Address Type B" /></Col>
            </Row>

            <h6 className="mt-3 text-secondary small fw-bold">
                <FaInfoCircle className="me-1" /> SUMMARY TABLE
            </h6>
            <Table striped bordered size="sm" className="small mt-2">
              <tbody>
                <tr>
                  <td className="bg-light fw-bold" width="30%">Label 1</td>
                  <td></td>
                  <td className="bg-light fw-bold" width="30%">Label 2</td>
                  <td></td>
                </tr>
                <tr>
                  <td className="bg-light fw-bold">Label 3</td>
                  <td></td>
                  <td className="bg-light fw-bold text-primary">TOTAL</td>
                  <td className="fw-bold"></td>
                </tr>
              </tbody>
            </Table>
          </Col>

        </Row>
      </Modal.Body>

      <Modal.Footer className="bg-light">
        <Button variant="secondary" onClick={handleClose}>
          Close View
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(ModalCompare);