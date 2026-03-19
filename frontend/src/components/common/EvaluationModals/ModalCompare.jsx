import React, { useState } from 'react';
import { Modal, Row, Col, Table, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaInfoCircle, FaTimes } from "react-icons/fa";

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

const DataHeader = ({ title }) => (
  <h5 className="text-primary border-bottom pb-2 mb-3 fs-6 fw-bold uppercase_text">
    {title || '---'} {/* Add this to display the value */}
  </h5>
);

const ModalCompare = ({ show, handleClose }) => {

  const [creditinfo, setCreditInfo] = useState({
    lastName: 'Macandog',
    middleName: 'Francisco',
    firstName: 'Kevin',

  })

  return (
    <Modal show={show} onHide={handleClose} size="xl" backdrop="static" keyboard={false} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          APPLICATION & INVESTIGATION COMPARISON
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          
          {/* LEFT COLUMN: FORM 1 STRUCTURE */}
          <Col 
            md={6} 
            className="border-end p-4" 
            style={{
              backgroundColor: '#ccd6e0',
              maxHeight: '65vh',
              overflowY: 'auto'
            }}
          >
            <h4 className="text-muted text-center pb-2 mb-4 fw-bold uppercase_text">
              CREDIT APPLICATION
            </h4>

            <DataHeader title="Customer Information"></DataHeader>
            <Row className="g-2">
              <Col md={4}><DataBlock label="Last Name" value={creditinfo.lastName}/></Col>
              <Col md={4}><DataBlock label="First Name" value={creditinfo.firstName}/></Col>
              <Col md={4}><DataBlock label="Middle Name" value={creditinfo.middleName}/></Col>
            </Row>

            <Row className="g-2">
              <Col md={4}><DataBlock label="Birthday" /></Col>
              <Col md={4}><DataBlock label="Age" /></Col>
              <Col md={4}><DataBlock label="Gender" /></Col>
            </Row>

            <Row className="g-2">
              <Col md={4}><DataBlock label="Civil Status" /></Col>
              <Col md={4}><DataBlock label="Education" /></Col>
              <Col md={4}><DataBlock label="Mobile #" /></Col>
            </Row>

            <hr className='dotted' />

            <Row className="g-2">
              <Col md={4}><DataBlock label="Spouse Name" /></Col>
              <Col md={4}><DataBlock label="Birthday" /></Col>
              <Col md={4}><DataBlock label="Age" /></Col>
            </Row>

            <Row className="g-2">
              <Col md={4}><DataBlock label="No. of Children" /></Col>
              <Col md={4}><DataBlock label="No. of Studying" /></Col>
              <Col md={4}><DataBlock label="No. of Dependent" /></Col>
            </Row>

            <DataBlock label="Full Address" />

            <hr className='dotted' />

            <DataHeader title="Income Information"></DataHeader>
            <h6 className="mt-1 text-muted small fw-medium">Other Sources Of Income</h6>
            <Row>
              <Col md={8}>
                <Table bordered hover size="sm" className="small shadow-sm">
                  <thead className="table-secondary">
                    <tr>
                      <th>Nature</th>
                      <th>Address</th>
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
            </Row>

            <hr className='dotted' />

            <DataHeader title="References Information"></DataHeader>
            <h6 className="mt-1 text-muted small fw-medium">Credit References</h6>
            <Row>
              <Col md={12}>
                <Table bordered hover size="sm" className="small shadow-sm">
                  <thead className="table-secondary">
                    <tr>
                      <th>Creditor</th>
                      <th>Address</th>
                      <th>Date Granted</th>
                      <th>Original Balance</th>
                      <th>Present Balance</th>
                      <th>Monthly Installment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ height: '30px' }}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <hr className='dotted'/>
            <h6 className="mt-1 text-muted small fw-medium">Personal References</h6>
            <Row>
              <Col md={12}>
                <Table bordered hover size="sm" className="small shadow-sm">
                  <thead className="table-secondary">
                    <tr>
                      <th>Full Name</th>
                      <th>Address</th>
                      <th>Contact Number</th>
                      <th>Relationship</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ height: '30px' }}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>

            <hr className='dotted' />

            <DataHeader title="Other Information"></DataHeader>
            <h6 className="mt-1 text-muted small fw-medium">Real and/or Personal Properties Owned</h6>
            <Row>
              <Col md={12}>
                <Table bordered hover size="sm" className="small shadow-sm">
                  <thead className="table-secondary">
                    <tr>
                      <th>Kind</th>
                      <th>Location</th>
                      <th>Value</th>
                      <th>Imbursement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ height: '30px' }}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>

            <hr className='dotted' />

            <DataHeader title="Attachment Information"></DataHeader>
            <h6 className="mt-1 text-muted small fw-medium">Documents</h6>
            <Row>
              <Col md={12}>
                <Table bordered hover size="sm" className="small shadow-sm">
                  <thead className="table-secondary">
                    <tr>
                      <th>File name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ height: '30px' }}></td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            
          </Col>

          {/* RIGHT COLUMN: FORM 2 STRUCTURE */}
          <Col 
            md={6} 
            className="p-4" 
            style={{ 
              backgroundColor: '#e2e8a4',
              maxHeight: '65vh',
              overflowY: 'auto'
            }}
          >
            <h4 className="text-muted text-center pb-2 mb-4 fw-bold uppercase_text">
              CREDIT INVESTIGATION
            </h4>
            <h5 className="text-success border-bottom pb-2 mb-3 fs-6 fw-bold uppercase_text">
              Customer Information
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
        <Button className="d-flex align-items-center justify-content-center gap-1" variant="danger" onClick={handleClose}>
          <FaTimes /> Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(ModalCompare);