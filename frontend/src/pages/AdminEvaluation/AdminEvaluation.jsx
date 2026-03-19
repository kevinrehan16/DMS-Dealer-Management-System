import React, { useState, useEffect } from 'react'
import "../../assets/css/CreditInvestigation.css"
import { Row, Col, Form, InputGroup, Button, Table } from 'react-bootstrap'
import { FaSearch, FaRegEye, FaCalendarDay , FaTrash, FaEdit, FaTimes, FaSave, FaUserTie } from 'react-icons/fa'

import { useInquiry } from '../../context/InquiryContext/InquiryContext'

import ModalCompare from '../../components/common/EvaluationModals/ModalCompare'

import { dateFormat, timeFormat } from '../../utils/formatters'
import axios from 'axios'


function AdminEvaluation() {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const [showModalCompare, setShowModalCompare] = useState(false);

  const handleShowModalCompare = () => {
    setShowModalCompare(true);
  }

  const handleCloseModalCompare = () => {
    setShowModalCompare(false);
  }

  return (
    <div>
      <div className="page-header">
        <h4><FaUserTie className='me-2 fs-4'/> ADMIN EVALUATION</h4>
      </div>

      <div className="content-page">
        <Row>
          <Col md={11}>
            <Form className="filter-form">
              <Row className="align-items-end">
                <Col md={4}>
                  <Form.Group controlId="search">
                    <Form.Label>Search</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Search customer..."
                      />
                      <InputGroup.Text>
                        <FaSearch />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>

              </Row>
            </Form>
          </Col>
          <Col md={1} className="d-flex justify-content-end">
            <Button type="submit" variant="primary" className="mt-auto d-flex align-items-center gap-1" onClick={handleShowModalCompare}><FaRegEye /> Evaluation</Button>
          </Col>
        </Row>
        <div className="table-section mt-4">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th width='3%' className='text-center'>
                  <Form>
                    <Form.Check
                      type="checkbox"
                    />
                  </Form>
                </th>
                <th width='9%'>Inquiry ID</th>
                <th width='17%'>Customer Name</th>
                <th width='22%'>Brand/Model/Color</th>
                <th width='9%'>Terms</th>
                <th width='17%'>Investigator</th>
                <th width='15%'>Date & Time</th>
                <th width='8%'>Actions</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </Table>
        </div>
      </div>

      <ModalCompare 
        show={showModalCompare}
        handleClose={handleCloseModalCompare}
      />

    </div>
  )
}

export default AdminEvaluation
