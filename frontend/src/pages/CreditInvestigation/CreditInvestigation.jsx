import React, { useState, useEffect } from 'react'
import "../../assets/css/CreditInvestigation.css"
import { Row, Col, Form, InputGroup, Button, Table } from 'react-bootstrap'
import { FaSearch, FaCalendarDay , FaTrash, FaEdit, FaUserAltSlash, FaUserSecret, FaMotorcycle, FaRegCalendarAlt } from 'react-icons/fa'

// import { useInquiry } from '../../context/InquiryContext/InquiryContext'
import { useInquiry } from '../../hooks/HooksInquiry/useInquiry'

import SkeletonRowLoading from '../../components/common/Loading/SkeletonRowLoading'
import GlobalModal from '../../components/common/GlobalModal'
// import ModalCreditInvestigation from '../../components/common/CreditInvestigationModals/ModalCreditInvestigation-BACKUP'
import ModalCreditInvestigation from '../../components/common/CreditInvestigationModals/ModalCreditInvestigation'
import ModalScheduleCi from '../../components/common/CreditInvestigationModals/ModalScheduleCi'

import { dateFormat, timeFormat, formatAmount } from '../../utils/formatters'
import axios from 'axios'
import Swal from 'sweetalert2'


function CreditInvestigation() {
  const { data: inquiries = [], isLoading: loadingInquiry, isFetching: fetchingInquiry, refetch: refetchInquiry } = useInquiry('')

  const [thisInquiryid, setThisInquiryid] = useState(0);
  const [showModalCreditInvestigation, setShowModalCreditInvestigation] = useState(false);
  const [showModalScheduleCi, setShowModalScheduleCi] = useState(false);

  // const { inquiriesContext, loading, getInquiriesContext } = useInquiry();
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
      setSelectedIds(inquiries.map(user => user.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleRow = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // const saveAssignSchedule = async () => {
  //   const selectedInquiries = inquiriesContext.filter(user =>
  //     selectedIds.includes(user.id)
  //   );

  //   if (selectedInquiries.length === 0) {
  //     alert("Please select at least one inquiry.");
  //     return;
  //   }

  //   if (!assignSchedule.date_schedule || !assignSchedule.time_schedule) {
  //     alert("Please select Date and Time.");
  //     return;
  //   }

  //   const forScheduleInquiries = {
  //     id: selectedIds,
  //     schedule: {
  //       date_schedule: assignSchedule.date_schedule,
  //       time_schedule: assignSchedule.time_schedule
  //     }
  //   };

  //   try {
  //     const res = await axios.patch(`${API_URL}/inquiries/assignschedule`, forScheduleInquiries, {
  //       headers:{
  //         Authorization: `Bearer ${token}`,
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     // console.log(res.data);
  //     Swal.fire({
  //       icon: "success",
  //       title: "Schedule assigned successfully",
  //       text: "Selected customer's schedule has been updated!",
  //     });

  //     getInquiriesContext();
  //     setSelectedIds([]);
  //     setAssignSchedule({ date_schedule: '', time_schedule: '' });
  //     handleCloseScheduleCi();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const handleAssignSchedule = (e) => {
    setAssignSchedule({
      ...assignSchedule, [e.target.name]: e.target.value
    });
  }

  useEffect(() => {

  }, [])

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', width: '100%', backgroundColor: '#f8f9fa', overflow: 'hidden' }}>

      {/* HEADER SECTION */}
      <div className="bg-white border-bottom shadow-sm px-3 py-2">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="icon-box-float text-dark">
              <FaUserSecret size={20}/>
            </div>
            <div>
              <h5 className="fw-bold mb-0 text-dark">CREDIT INVESTIGATION</h5>
              <small className="text-muted" style={{ fontSize: '11px' }}>Application for Credit Investigaiton Management</small>
            </div>
          </div>
          <Button 
            variant="info" 
            size="md" 
            className="rounded px-4 fw-medium shadow-sm d-flex align-items-center gap-2 border-0 text-white" 
            // onClick={handleShowScheduleCi}
            onClick={()=>setShowModalScheduleCi(true)}
          >
              <FaCalendarDay /> Set Schedule
          </Button>
        </div>
      </div>

      {/* FILTER & TABLE AREA */}
      <div className="flex-grow-1 p-3 d-flex flex-column overflow-hidden">
        <div className="bg-white rounded-3 shadow-sm border d-flex flex-column h-100 overflow-hidden">
          
          <div className="px-3 py-2 bg-light border-bottom">
            <Row className="g-2 align-items-center"> {/* added align-items-center to be sure */}
              {/* SEARCH INPUT */}
              <Col md={4} className="d-flex">
                <InputGroup className="bg-white rounded border shadow-none" style={{ height: '38px' }}>
                  <InputGroup.Text className="bg-transparent border-0 pe-1">
                    <FaSearch className="text-muted" size={14} />
                  </InputGroup.Text>
                  <Form.Control 
                    className="border-0 shadow-none small" 
                    placeholder="Search..." 
                    style={{ fontSize: '14px' }}
                  />
                </InputGroup>
              </Col>

              {/* BRANCH SELECT */}
              <Col md={2} className="d-flex">
                <Form.Select 
                  className="rounded border-secondary-subtle shadow-none small" 
                  style={{ fontSize: '14px', height: '38px' }}
                >
                  <option value="">All Branches</option>
                </Form.Select>
              </Col>
            </Row>
          </div>
          <div className="table-responsive flex-grow-1" style={{ overflowY: 'auto' }}>
            <Table hover className="align-middle mb-0" style={{ minWidth: '1100px' }}>
              <thead className="bg-dark text-white sticky-top" style={{ zIndex: 10 }}>
                <tr className="small text-uppercase fw-bold" style={{ fontSize: '12px' }}>
                  <th width='3%' className='text-center ps-2 py-3'>
                    <div className="checkbox-design-wrapper">
                      <Form>
                        <Form.Check
                          type="checkbox"
                          className="custom-check-shadow"
                          checked={selectedIds.length === inquiries.length}
                          onChange={toggleSelectAll}
                        />
                      </Form>
                    </div>
                  </th>
                  <th width='19%' className="ps-2 py-3">Customer Name</th>
                  <th width='12%' className="ps-2 py-3">Schedule</th>
                  <th width='19%' className="ps-2 py-3">Investigator</th>
                  <th width='25%' className="ps-2 py-3">Motorcycle Unit</th>
                  <th width='14%' className="text-end ps-2 py-3">Monthly/Term</th>
                  <th width='8%' className="ps-2 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingInquiry ? (
                  [...Array(5)].map((_, i) => <SkeletonRowLoading key={i} columns={7} />)
                ) : (
                  inquiries.map((row, index) => (
                    <tr key={index}>
                      <td className='text-center'>
                        <div className="checkbox-design-wrapper">
                          <Form>
                            <Form.Check
                              type="checkbox"
                              className="custom-check-shadow"
                              checked={selectedIds.includes(row.id)}
                              onChange={() => toggleRow(row.id)}
                            />
                          </Form>
                        </div>
                      </td>
                      <td className="ps-3 py-2">
                        <div className="fw-bold text-primary mb-0" style={{ fontSize: '14px' }}>{row.customer.firstName} {row.customer.lastName}</div>
                        <div className="text-secondary fw-medium" style={{ fontSize: '11px' }}>ID-{row.inquiry_id}</div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className={`rounded p-2 me-2 d-flex align-items-center justify-content-center border 'border-secondary-subtle bg-secondary-subtle text-secondary`}>
                            <FaRegCalendarAlt size={14} />
                          </div>
                          <div style={{ lineHeight: '1.2' }}>
                            {row.date_creditinvestigation && row.time_creditinvestigation ? 
                            (<>
                              <div className="fw-bold text-dark mb-0" style={{ fontSize: '12px' }}>{dateFormat(row.date_creditinvestigation)}</div>
                              <div className="text-muted" style={{ fontSize: '10px' }}>{timeFormat(row.time_creditinvestigation)}</div>
                            </>) 
                            :
                            (
                              <>
                                <div className="fw-bold text-dark mb-0" style={{ fontSize: '12px' }}>No schedule</div>
                                <div className="text-muted" style={{ fontSize: '10px' }}>00:00:00</div>
                              </>
                            )}
                          </div>
                        </div>  
                      </td>
                      <td>
                        {row?.investigator?.firstName ? (
                          <>
                          <div className="d-flex align-items-center gap-1 fw-normal mb-0" style={{ fontSize: '14px' }}>
                            <FaUserSecret size={12} className='text-dark' />  {row?.investigator?.firstName} {row?.investigator?.lastName}
                          </div>
                          </>
                        ) : (
                          <>
                            <div className="d-flex align-items-center text-secondary gap-1 mb-0" style={{ fontSize: '14px' }}>
                            <FaUserAltSlash size={14} className='text-secondary' />  Unassigned
                          </div>
                          </>
                        )}
                      </td>
                      <td className="text-dark small" style={{ whiteSpace: 'nowrap' }}>
                        <div className="d-flex align-items-center">
                          <div className={`rounded p-2 me-2 d-flex align-items-center justify-content-center border ${row.unit_type === 'Brand_New' ? 'border-success-subtle bg-success-subtle text-success' : 'border-danger-subtle bg-danger-subtle text-danger'}`}>
                            <FaMotorcycle size={14} />
                          </div>
                          <div style={{ lineHeight: '1.2' }}>
                            <div className="fw-bold text-dark mb-0" style={{ fontSize: '12px' }}>{row.motorBrand} {row.motorModel}</div>
                            <div className="text-muted" style={{ fontSize: '10px' }}>{row.motorColor}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-end">
                        <div className="fw-bold text-success font-monospace mb-0">₱ {formatAmount(row.motorMonthlyinstallment)}</div>
                        <div className="text-muted small" style={{ fontSize: '10px' }}>{row.motorInstallmentterm} Months</div>
                      </td>
                      <td className='text-center'>
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
          {/* Ilagay ito sa ilalim ng iyong table container */}
          <div className="d-flex justify-content-between align-items-center px-3 py-2 bg-white border-top shadow-sm rounded-bottom-4">
            
            {/* Left Side: Summary Info */}
            <div className="text-muted small">
              Showing <span className="fw-bold text-dark">1</span> to <span className="fw-bold text-dark">10</span> of <span className="fw-bold text-dark">150</span> inquiries
            </div>

            {/* Right Side: Pagination Controls */}
            <nav aria-label="Inquiry pagination">
              <ul className="pagination pagination-sm mb-0 gap-1">
                
                {/* Previous Button */}
                <li className="page-item disabled">
                  <button className="page-link rounded-2 border-0 bg-light text-muted px-3" tabIndex="-1">
                    Previous
                  </button>
                </li>

                {/* Page Numbers */}
                <li className="page-item active shadow-sm" aria-current="page">
                  <button className="page-link rounded-2 border-0 px-3 fw-bold" 
                    style={{ background: 'linear-gradient(45deg, #ffc107, #e0a800)', color: '#000' }}>
                    1
                  </button>
                </li>
                
                <li className="page-item">
                  <button className="page-link rounded-2 border-0 text-dark px-3 hover-bg-light">
                    2
                  </button>
                </li>
                
                <li className="page-item d-none d-md-block">
                  <button className="page-link rounded-2 border-0 text-dark px-3 hover-bg-light">
                    3
                  </button>
                </li>

                <li className="page-item disabled">
                  <span className="page-link border-0 bg-transparent">...</span>
                </li>

                <li className="page-item">
                  <button className="page-link rounded-2 border-0 text-dark px-3 hover-bg-light">
                    15
                  </button>
                </li>

                {/* Next Button */}
                <li className="page-item">
                  <button className="page-link rounded-2 border-0 bg-light text-dark px-3 fw-medium" 
                    style={{ border: '1px solid #dee2e6' }}>
                    Next
                  </button>
                </li>

              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* <GlobalModal
        show={scheduleCi}
        handleClose={handleCloseScheduleCi}
        title="Schedule"
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
      </GlobalModal> */}

      <ModalScheduleCi 
        show={showModalScheduleCi}
        handleClose = {()=>setShowModalScheduleCi(false)}
        selectedIds = {selectedIds}
        setSelectedIds={setSelectedIds}
        onSuccess={refetchInquiry}
      />

      <ModalCreditInvestigation 
        inquiryId = {thisInquiryid}
        show={showModalCreditInvestigation} 
        handleClose={handleCloseModalCreditInvestigation} 
      />


    </div>
  )
}

export default CreditInvestigation
