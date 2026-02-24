import React, { useState, useEffect } from 'react'
import "../../assets/css/CreditInvestigation.css"
import { Row, Col, Form, InputGroup, Button, Table } from 'react-bootstrap'
import { FaSearch, FaCalendarDay , FaTrash, FaEdit, FaTimes, FaSave } from 'react-icons/fa'

import { useInquiry } from '../../context/InquiryContext/InquiryContext'

import GlobalModal from '../../components/common/GlobalModal'
import ModalCreditInvestigation from '../../components/common/CreditInvestigationModals/ModalCreditInvestigation'

import { dateFormat, timeFormat } from '../../utils/formatters'
import axios from 'axios'
import Swal from 'sweetalert2'


function CreditInvestigation() {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const [thisInquiryid, setThisInquiryid] = useState(0);
  const [showModalCreditInvestigation, setShowModalCreditInvestigation] = useState(false);

  const { inquiriesContext, loading, getInquiriesContext } = useInquiry();
  const [selectedIds, setSelectedIds] = useState([]);
  const [assignSchedule, setAssignSchedule] = useState({
    date_schedule: '',
    time_schedule: ''
  });

  const [scheduleCi, setScheduleCi] = useState(false);

  const handleShowScheduleCi = () => setScheduleCi(true);
  const handleCloseScheduleCi = () => setScheduleCi(false);

  const handleShowModalCreditInvestigation = (inquiryid) => {
    setThisInquiryid(inquiryid);
    setShowModalCreditInvestigation(true); 
  }

  const handleCloseModalCreditInvestigation = () => setShowModalCreditInvestigation(false);

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(inquiriesContext.map(user => user.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleRow = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    const selectedInquiries = inquiriesContext.filter(user => selectedIds.includes(user.id));
    console.log('Saving:', selectedInquiries);
    // Replace with API call: axios.post('/api/save', selectedInquiries)
  };

  const saveAssignSchedule = async () => {
    const selectedInquiries = inquiriesContext.filter(user =>
      selectedIds.includes(user.id)
    );

    if (selectedInquiries.length === 0) {
      alert("Please select at least one inquiry.");
      return;
    }

    if (!assignSchedule.date_schedule || !assignSchedule.time_schedule) {
      alert("Please select Date and Time.");
      return;
    }

    const forScheduleInquiries = {
      id: selectedIds,
      schedule: {
        date_schedule: assignSchedule.date_schedule,
        time_schedule: assignSchedule.time_schedule
      }
    };

    try {
      const res = await axios.patch(`${API_URL}/inquiries/assignschedule`, forScheduleInquiries, {
        headers:{
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      // console.log(res.data);
      Swal.fire({
        icon: "success",
        title: "Schedule assigned successfully",
        text: "Selected customer's schedule has been updated!",
      });

      getInquiriesContext();
      setSelectedIds([]);
      setAssignSchedule({ date_schedule: '', time_schedule: '' });
      handleCloseScheduleCi();
    } catch (error) {
      console.error(error);
    }
  }

  const handleAssignSchedule = (e) => {
    setAssignSchedule({
      ...assignSchedule, [e.target.name]: e.target.value
    });
  }

  useEffect(() => {

  }, [])

  return (
    <div>
      <div className="ci-header">
        <h4 onClick={handleSave}>CREDIT INVESTIGATION</h4>
      </div>

      <div className="ci-page">
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
          <Col md="1" className='d-flex justify-content-end'>
            <Button 
              variant="info" 
              size="md" 
              className="mt-auto d-flex align-items-center gap-1 text-white" 
              onClick={handleShowScheduleCi}>
                <FaCalendarDay /> Assign
            </Button>
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
                      checked={selectedIds.length === inquiriesContext.length}
                      onChange={toggleSelectAll}
                    />
                  </Form>
                </th>
                <th width='9%'>Inquiry ID</th>
                <th width='17%'>Customer Name</th>
                <th width='22%'>Brand/Model/Color</th>
                <th width='9%'>Terms</th>
                <th width='17%'>Investigator</th>
                <th width='15%'>Schedule</th>
                <th width='8%'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    Loading data...
                  </td>
                </tr>
              ) : (
                inquiriesContext.map((row, index) => (
                  <tr key={index}>
                    <td className='text-center'>
                      <Form>
                        <Form.Check
                          type="checkbox"
                          checked={selectedIds.includes(row.id)}
                          onChange={() => toggleRow(row.id)}
                        />
                      </Form>
                    </td>
                    <td>{row.inquiry_id}</td>
                    <td>{row.customer.firstName} {row.customer.lastName}</td>
                    <td>{row.motorBrand} / {row.motorModel} / {row.motorColor}</td>
                    <td>{row.motorInstallmentterm} Month(s)</td>
                    <td>Investigator</td>
                    <td>{row.date_creditinvestigation && row.time_creditinvestigation ? `${dateFormat(row.date_creditinvestigation)} | ${timeFormat(row.time_creditinvestigation)}` : ''}</td>
                    <td className='text-center'>
                      {/* <Button variant="info" size="sm" className="d-inline-block me-1 text-white" onClick={handleShowScheduleCi}>
                        <FaCalendarDay />
                      </Button> */}
                      <Button 
                        onClick={()=> handleShowModalCreditInvestigation(row.id)}
                        variant="warning" 
                        size="sm" 
                        className="d-inline-block me-1 text-white">
                        <FaEdit />
                      </Button>
                      <Button variant="danger" size="sm" className="d-inline-block me-1 text-white">
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>

      <GlobalModal
        show={scheduleCi}
        handleClose={handleCloseScheduleCi}
        title="Set Schedule"
        size="sm"
        footer={
          <>
            <Button variant="primary" className="d-flex align-items-center justify-content-evenly" onClick={()=>saveAssignSchedule()}>
              <FaSave /> Save
            </Button>
            <Button variant="danger" onClick={handleCloseScheduleCi} className="d-flex align-items-center justify-content-evenly">
              <FaTimes /> Close
            </Button>
          </>
        }
      >
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="formCustomerid" className="mb-2">
                <Row>
                  <Col xs={3} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Date</Form.Label>
                  </Col>
                  <Col xs={9}>
                    <Form.Control
                      type="date"
                      name="date_schedule"
                      value={assignSchedule.date_schedule}
                      onChange={handleAssignSchedule}
                      required
                    />
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col xs={3} className="d-flex align-items-center">
                    <Form.Label className="mb-0">Time</Form.Label>
                  </Col>
                  <Col xs={9}>
                    <Form.Control
                      type="time"
                      name="time_schedule"
                      value={assignSchedule.time_schedule}
                      onChange={handleAssignSchedule}
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </GlobalModal>

      <ModalCreditInvestigation 
        inquiryId = {thisInquiryid}
        show={showModalCreditInvestigation} 
        handleClose={handleCloseModalCreditInvestigation} 
      />


    </div>
  )
}

export default CreditInvestigation
