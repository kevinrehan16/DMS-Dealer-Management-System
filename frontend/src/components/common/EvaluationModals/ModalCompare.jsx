import React, { useState } from 'react';
import { Modal, Row, Col, Table, Button } from 'react-bootstrap';
import { FaUserTimes, FaUserCheck, FaUserSlash, FaTimes } from "react-icons/fa";
import { CircularProgress } from '@mui/material';

import CreditApplication from './ModalChild/CreditApplication';
import CreditInvestigation from './ModalChild/CreditInvestigation';

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

const ModalCompare = ({ show, handleClose, applicationId, investigationId, onUpdateStatus, isUpdating, stats }) => {

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
            <CreditApplication applicationId={applicationId} />
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
            <CreditInvestigation investigationId={investigationId} />
          </Col>

        </Row>
      </Modal.Body>

      <Modal.Footer className="bg-light">
        <Button 
          className="d-flex align-items-center justify-content-center gap-1" 
          variant="success" 
          disabled={isUpdating}
          onClick={()=>onUpdateStatus('APPROVED')}>
          {isUpdating && stats === "APPROVED" ? 
            (<><CircularProgress size={10} color="inherit" /> Applying...</>)
            :
            (<><FaUserCheck /> Approve</>)
          }
        </Button>
        <Button 
          className="d-flex align-items-center justify-content-center gap-1" 
          variant="danger" 
          disabled={isUpdating}
          onClick={()=>onUpdateStatus('DISAPPROVED')}>
          {isUpdating && stats === "DISAPPROVED" ? 
            (<><CircularProgress size={10} color="inherit" /> Applying...</>)
            :
            (<><FaUserSlash /> Disapprove</>)
          }
        </Button>
        <Button 
          className="d-flex align-items-center justify-content-center gap-1 text-white" 
          variant="warning" 
          disabled={isUpdating}
          onClick={()=>onUpdateStatus('REASSESS')}>
          {isUpdating && stats === "REASSESS" ? 
            (<><CircularProgress size={10} color="inherit" /> Applying...</>)
            :
            (<><FaUserTimes /> Reassess</>)
          }
        </Button>
        <Button className="d-flex align-items-center justify-content-center gap-1" variant="secondary" onClick={handleClose}>
          <FaTimes /> Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(ModalCompare);