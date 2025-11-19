import React, { useState, useEffect } from 'react'
import "../../assets/css/CreditInvestigation.css"
import { Row, Col, Form, InputGroup, Button, Table } from 'react-bootstrap'
import { FaSearch, FaCalendarDay , FaTrash, FaEdit, FaTimes, FaSave } from 'react-icons/fa'

import { useInquiry } from '../../context/InquiryContext/InquiryContext'

import GlobalModal from '../../components/common/GlobalModal'


function CreditInvestigation() {
  const { inquiriesContext, loading } = useInquiry();
  const [selectedIds, setSelectedIds] = useState([]);

  const [scheduleCi, setScheduleCi] = useState(false);

  const handleShowScheduleCi = () => setScheduleCi(true);
  const handleCloseScheduleCi = () => setScheduleCi(false);

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
    const selectedUsers = inquiriesContext.filter(user => selectedIds.includes(user.id));
    console.log('Saving:', selectedUsers);
    // Replace with API call: axios.post('/api/save', selectedUsers)
  };


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
        </Row>
        <div className="table-section mt-4">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>
                  <Form>
                    <Form.Check
                      type="checkbox"
                      checked={selectedIds.length === inquiriesContext.length}
                      onChange={toggleSelectAll}
                    />
                  </Form>
                </th>
                <th width='10%'>Inquiry ID</th>
                <th width='17%'>Customer Name</th>
                <th width='22%'>Brand/Model/Color</th>
                <th width='10%'>Terms</th>
                <th width='17%'>Investigator</th>
                <th width='12%'>Date & Time</th>
                <th width='10%'>Actions</th>
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
                    <td>
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
                    <td>Date & Time</td>
                    <td className='text-center'>
                      <Button variant="info" size="sm" className="d-inline-block me-1 text-white" onClick={handleShowScheduleCi}>
                        <FaCalendarDay />
                      </Button>
                      <Button variant="warning" size="sm" className="d-inline-block me-1 text-white">
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
            <Button variant="primary" className="d-flex align-items-center justify-content-evenly">
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
                      className="uppercase_text"
                      name="date_schedule"
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
                      className="uppercase_text"
                      name="date_schedule"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </GlobalModal>



    </div>
  )
}

export default CreditInvestigation
