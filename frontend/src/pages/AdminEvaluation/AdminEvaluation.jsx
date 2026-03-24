import React, { useState, useEffect } from 'react'
import "../../assets/css/CreditInvestigation.css"
import { Row, Col, Form, InputGroup, Button, Table } from 'react-bootstrap'
import { FaSearch, FaRegEye, FaCalendarDay , FaTrash, FaEdit, FaTimes, FaSave, FaUserTie } from 'react-icons/fa'
import SkeletonRowLoading from '../../components/common/Loading/SkeletonRowLoading'

import { useInquiry } from '../../context/InquiryContext/InquiryContext'

import ModalCompare from '../../components/common/EvaluationModals/ModalCompare'

import { dateFormat, timeFormat } from '../../utils/formatters'
import axios from 'axios'


function AdminEvaluation() {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem('token');

  const { inquiriesContext, loading, getInquiriesContext } = useInquiry();

  const [applicationId, setApplicationId] = useState(2);
  const [showModalCompare, setShowModalCompare] = useState(false);

  const handleShowModalCompare = (appID) => {
    setApplicationId(appID);
    setShowModalCompare(true);
  }

  const handleCloseModalCompare = () => {
    setShowModalCompare(false);
  }

  useEffect(() => {
    getInquiriesContext();
  },[getInquiriesContext])

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
            <Button type="submit" variant="primary" className="mt-auto d-flex align-items-center gap-1"><FaRegEye /> Approval</Button>
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
                <th width='10%'>Inquiry ID</th>
                <th width='20%'>Customer Name</th>
                <th width='29%'>Brand/Model/Color</th>
                <th width='20%'>Investigator</th>
                <th width='10%'>Date & Time</th>
                <th width='8%'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                    <SkeletonRowLoading key={index} columns={7} />
                  ))
                ) : (
                  inquiriesContext.map((row, index) => (
                    <tr key={index}>
                      <td></td>
                      <td>{row.inquiry_id}</td>
                      <td>{row.customer.firstName} {row.customer.lastName}</td>
                      <td>{row.motorBrand} / {row.motorModel} / {row.motorColor}</td>
                      <td>No Field Yet</td>
                      <td>{row.date_creditinvestigation} <br /> {row.time_creditinvestigation}</td>
                      <td>
                        <Button 
                          disabled={!row.customer?.credit_application}
                          onClick={()=> handleShowModalCompare(row.customer?.credit_application?.id)}
                          variant="dark" 
                          size="sm" 
                          className={`${!row.customer?.credit_application ? 'd-none' : 'd-flex'} align-items-center p-2 text-white`}>
                          <FaRegEye />
                        </Button>
                      </td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </Table>
        </div>
      </div>

      <ModalCompare 
        show={showModalCompare}
        handleClose={handleCloseModalCompare}
        applicationId={applicationId}
      />

    </div>
  )
}

export default AdminEvaluation
