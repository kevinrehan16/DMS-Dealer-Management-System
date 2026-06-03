import React, { useState, useMemo } from 'react';
import { CircularProgress } from '@mui/material';
import { Row, Col, Form, ListGroup, Modal, Button } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FaUserSecret, FaCalendarAlt, FaClock, FaUser, FaSave } from 'react-icons/fa';

import { useGetAllScheduleCi } from '../../../hooks/HooksInquiry/useInquiry';
import { useUsers } from '../../../hooks/HooksUser/useUsers';

import axios from 'axios'
import Swal from 'sweetalert2'

const AssignScheduleModal = ({ show, handleClose, selectedIds, setSelectedIds, onSuccess }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem('token');
  const [isAssigning, setIsAssigning] = useState(false);

  const { data: scheduleci, loading: loadingSchedule, refetch: refetchScheduleci } = useGetAllScheduleCi();
  const { data:  users = [], loading: loadingUsers } = useUsers('');

  const [assignSchedule, setAssignSchedule] = useState({
    investigator_id: '',
    date_schedule: '',
    time_schedule: ''
  });

  // Auto-fill date pag clinick sa calendar
  const handleDateClick = (arg) => {
      setAssignSchedule(prev => ({ ...prev, date_schedule: arg.dateStr }));
  };

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setAssignSchedule(prev => ({ ...prev, [name]: value }));
  };

  const saveAssignSchedule = async () => {

    if (selectedIds.length === 0) {
      alert("Please select (✅) at least one customer inquiry in the table to schedule a Credit Investigation.");
      return;
    }

    if(!assignSchedule.investigator_id) {
      alert("Please assign the investigator to schedule a Credit Investigation.");
      return;
    }

    if (!assignSchedule.date_schedule || !assignSchedule.time_schedule) {
      alert("Please select the target Date and Time to schedule a Credit Investigation.");
      return;
    }

    const forScheduleInquiries = {
      id: selectedIds,
      investigator_id: assignSchedule.investigator_id,
      date_creditinvestigation: assignSchedule.date_schedule,
      time_creditinvestigation: assignSchedule.time_schedule
    };

    setIsAssigning(true);
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

      onSuccess();
      refetchScheduleci();
      setSelectedIds([]);
      setAssignSchedule({ investigator_id: '', date_schedule: '', time_schedule: '' });
      handleClose();
    } catch (error) {
      console.error("Error in scheduling the Credit Investigation: ", error);
    } finally {
      setIsAssigning(false);
    }
  }

  // 1. FRONTEND FILTERING: Kunin lang ang events ng napiling investigator
  // Gagamitin natin ito para sa detalyadong view sa loob ng popover
  const filteredSchedules = useMemo(() => {
    if (!assignSchedule.investigator_id) return [];

    const result = scheduleci.filter(event => 
        // Baka 'id' ang property name sa data mo, hindi 'investigator_id'
        String(event.investigator_id) === String(assignSchedule.investigator_id)
    );

    return result;
  }, [scheduleci, assignSchedule.investigator_id]);

  return (
    <Modal show={show} onHide={handleClose} size="xl" scrollable={false}>
      <Modal.Header closeButton>
        <Modal.Title>Schedule Credit Investigation</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="p-0">
        <Row className="g-0">
          {/* LEFT SIDE: CALENDAR AREA */}
          {/* Inalis ang overflow: hidden dito para makita ang border hanggang ilalim */}
          <Col md={8} className="border-end d-flex flex-column" style={{ height: '80vh' }}>
            <div 
              className="flex-grow-1 px-3 pb-3 custom-calendar-scroll" 
              style={{ overflowY: 'auto', overflowX: 'hidden' }} // Ginawang scrollable ang mismong calendar wrapper
            >
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                showNonCurrentDates={false} // Hides days of prev & next months
                fixedWeekCount={false} // Optional: Para malinis din yung lines sa grid
                eventTimeFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                  meridiem: 'short', // Lalabas dito yung 'am' o 'pm'
                  hour12: true       // Para 12-hour format (hindi military time)
                }}
                initialView="dayGridMonth"
                height="100%" 
                contentHeight="100%"
                aspectRatio={1.35} // Adjust mo 'to (pataas para lumiit ang rows)
                handleWindowResize={true}
                expandRows={true} // Pinupuno niya yung space para pantay-pantay
                stickyHeaderDates={true} 
                headerToolbar={{ 
                  left: 'prev,next today', 
                  center: 'title',
                  right: '', 
                  //!! right: 'dayGridMonth,timeGridWeek,timeGridDay' //IF YOU WANT MONTH/WEEKS/DAYS buttons
                }}
                // Para sa custom label ng buttons (Optional)
                buttonText={{
                  today: 'Today',
                  month: 'Month',
                  week: 'Week',
                  day: 'Day'
                }}
                // Eto yung configuration para sa Week/Day view para hindi magulo
                views={{
                  timeGridWeek: {
                    slotLabelFormat: {
                      hour: 'numeric',
                      minute: '2-digit',
                      omitZeroMinute: false,
                      meridiem: 'short'
                    }
                  },
                  timeGridDay: {
                    slotLabelFormat: {
                      hour: 'numeric',
                      minute: '2-digit',
                      meridiem: 'short'
                    }
                  }
                }}
                dayHeaderFormat={{ weekday: 'short' }}
                events={filteredSchedules}
                dayMaxEvents={0}
                moreLinkClick="popover"
                moreLinkContent={(args) => {
                  return (
                    <div 
                      className="d-flex align-items-center justify-content-center gap-1 rounded-2 shadow-sm" 
                      style={{ 
                        backgroundColor: '#1a1d20', // Mas soft na black kaysa pure bg-dark
                        color: '#ffffff',
                        fontSize: '0.7rem', 
                        fontWeight: '600',
                        padding: '4px 2px',
                        width: '100%',
                        border: '1px solid rgba(255,255,255,0.1)', // Subtle border
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#000000'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1a1d20'}
                    >
                      <FaUser size={10} style={{ opacity: 0.8, color: '#ffc107' }} />
                      <span>{args.num} Schedule{args.num > 1 ? 's' : ''}</span>
                    </div>
                  );
                }}
                dateClick={handleDateClick}
                eventContent={(eventInfo) => {
                    return (
                      <div className="bg-dark text-white rounded w-100 shadow-sm" 
                        style={{ 
                          fontSize: '11px', 
                          whiteSpace: 'normal', 
                          wordBreak: 'break-word',
                          borderLeft: '4px solid #ffc107' // Optional: Blue accent para maganda
                        }}>
                        {/* Eto yung fix: kailangan ng extendedProps */}
                        <div style={{ fontWeight: '500' }}>
                          {eventInfo.event.extendedProps.subTitle} - <small style={{ opacity: 0.8, fontSize: '10px' }}>{eventInfo.timeText}</small>
                        </div>
                      </div>
                    );
                }}
              />
            </div>
          </Col>

          {/* RIGHT SIDE: FORM AREA (FIXED) */}
          <Col md={4} className="d-flex flex-column bg-white" style={{ height: '80vh' }}>
            {/* Ginawang scrollable din itong area na to para kung sakaling maliit ang screen, hindi mawawala ang fields */}
            <div className="p-4 flex-grow-1" style={{ overflowY: 'auto' }}>
              <h6 className="fw-bold text-secondary mb-4 small text-uppercase">Assignment Details</h6>
              
              <ListGroup variant="flush" className="border rounded shadow-sm">
                <ListGroup.Item className="py-3">
                  <Form.Label className="small fw-bold text-muted text-uppercase">Investigator</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-white"><FaUserSecret className="text-warning" /></span>
                    <Form.Select 
                      name="investigator_id" 
                      value={assignSchedule.investigator_id}
                      onChange={handleInputChange} 
                      className="bg-light"
                    >
                      <option value="">Choose Personnel...</option>
                      {users
                        .slice() 
                        .sort((a, b) => a.firstName.localeCompare(b.firstName)) 
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
                        value={assignSchedule.date_schedule}
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
                        value={assignSchedule.time_schedule}
                        onChange={handleInputChange} 
                        className="bg-light" 
                      />
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </div>

            {/* FOOTER: Fixed sa ilalim ng right column */}
            <div className="p-4 border-top bg-white mt-auto">
              <div className="alert alert-info py-2 small mb-3 border-0" style={{ fontSize: '0.75rem' }}>
                Check investigator's load before confirming.
              </div>
              <Button 
                variant="primary" 
                className="d-flex align-items-center justify-content-center gap-2 w-100 py-3 fw-medium shadow border-0" 
                onClick={saveAssignSchedule}
              >
                {isAssigning ? 
                  (<><CircularProgress size={20} color="inherit" /> Saving schedule...</>)
                  :
                  (<><FaSave /> Save Schedule</>)
                }
              </Button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default AssignScheduleModal;