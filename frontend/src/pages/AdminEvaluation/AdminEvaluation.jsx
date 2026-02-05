import React, { useState, useEffect } from 'react'
import "../../assets/css/CreditInvestigation.css"
import { Row, Col, Form, InputGroup, Button, Table } from 'react-bootstrap'
import { FaSearch, FaCalendarDay , FaTrash, FaEdit, FaTimes, FaSave } from 'react-icons/fa'

import { useInquiry } from '../../context/InquiryContext/InquiryContext'

import GlobalModal from '../../components/common/GlobalModal'

import { dateFormat, timeFormat } from '../../utils/formatters'
import axios from 'axios'


function AdminEvaluation() {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  return (
    <div>
      <div className="ci-header">
        <h4>ADMIN EVALUATION</h4>
      </div>

      <div className="ci-page">
        <Row>
          <Col md={12}>
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



    </div>
  )
}

export default AdminEvaluation
