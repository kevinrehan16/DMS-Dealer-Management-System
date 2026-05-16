import React from 'react';
import { Row, Col, Form, ListGroup, Modal, Button } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FaUserSecret, FaCalendarAlt, FaClock } from 'react-icons/fa';

import { useGetAllScheduleCi } from '../../../hooks/HooksInquiry/useInquiry';
import { useUsers } from '../../../hooks/HooksUser/useUsers';

const AssignScheduleModal = ({ show, handleClose, assignSchedule, setAssignSchedule, investigators, events, handleSave }) => {

  const { data: scheduleci, loading: loadingSchedule } = useGetAllScheduleCi();
  const { data:  users = [], loading: loadingUsers } = useUsers('');

  // Auto-fill date pag clinick sa calendar
  const handleDateClick = (arg) => {
      setAssignSchedule(prev => ({ ...prev, date_schedule: arg.dateStr }));
  };

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setAssignSchedule(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered scrollable={false}>
      <Modal.Header closeButton>
        <Modal.Title>Schedule Credit Investigation</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="p-0">
        <Row className="g-0">
          {/* LEFT SIDE: CALENDAR AREA */}
          <Col md={8} className="border-end d-flex flex-column" style={{ height: '80vh', overflow: 'hidden' }}>
            <div className="flex-grow-1 px-3 pb-3 custom-calendar-scroll">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                height="auto" 
                stickyHeaderDates={true} 
                headerToolbar={{ 
                  left: 'prev,next today', 
                  center: 'title', 
                  right: '' 
                }}
                dayHeaderFormat={{ weekday: 'short' }}
                events={scheduleci}
                dayMaxEvents={2}
                dateClick={(info) => setAssignSchedule({...assignSchedule, date_schedule: info.dateStr})}
                eventContent={(eventInfo) => (
                  <div className="fc-custom-badge bg-dark border border-1 border-gray-800 text-white">
                    <b>{eventInfo.timeText}</b> {eventInfo.event.title}
                  </div>
                )}
              />
            </div>
          </Col>

          {/* RIGHT SIDE: FORM AREA (FIXED) */}
          <Col md={4} className="d-flex flex-column" style={{ height: '80vh' }}>
            <div className="p-4 flex-grow-1">
              <h6 className="fw-bold text-secondary mb-4 small text-uppercase">Assignment Details</h6>
              
              <ListGroup variant="flush" className="border rounded shadow-sm">
                <ListGroup.Item className="py-3">
                  <Form.Label className="small fw-bold text-muted text-uppercase">Investigator</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-white"><FaUserSecret className="text-warning" /></span>
                    <Form.Select 
                      name="investigator_id" 
                      // value={assignSchedule.investigator_id}
                      onChange={handleInputChange} 
                      className="bg-light"
                    >
                      <option value="">Choose Personnel...</option>
                      {users
                          .slice() // Gawa muna ng kopya para hindi ma-mutate ang original array
                          .sort((a, b) => a.firstName.localeCompare(b.firstName)) // Alphabetical order by First Name
                          .map(u => (
                              <option key={u.id} value={u.id}>
                                  {u.firstName} {u.lastName}
                              </option>
                          ))
                      }
                    </Form.Select>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item className="py-3">
                  <Form.Label className="small fw-bold text-muted text-uppercase">Target Date</Form.Label>
                  <div className="input-group">
                      <span className="input-group-text bg-white"><FaCalendarAlt className="text-primary" /></span>
                      <Form.Control 
                        type="date" 
                        name="date_schedule" 
                        // value={assignSchedule.date_schedule}
                        onChange={handleInputChange} 
                        className="bg-light" 
                      />
                  </div>
                </ListGroup.Item>

                <ListGroup.Item className="py-3 border-0">
                  <Form.Label className="small fw-bold text-muted text-uppercase">Time Slot</Form.Label>
                  <div className="input-group">
                      <span className="input-group-text bg-white"><FaClock className="text-info" /></span>
                      <Form.Control 
                        type="time" 
                        name="time_schedule" 
                        // value={assignSchedule.time_schedule}
                        onChange={handleInputChange} 
                        className="bg-light" 
                      />
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </div>

            <div className="p-4 border-top bg-white mt-auto">
              <div className="alert alert-info py-2 small mb-3 border-0" style={{ fontSize: '0.75rem' }}>
                Check investigator's load before confirming.
              </div>
              <Button variant="primary" className="w-100 py-3 fw-bold shadow border-0" onClick={handleSave}>
                Confirm Assignment
              </Button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default AssignScheduleModal;