import React from 'react'
import { Row, Col, Modal, Button } from 'react-bootstrap'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FaTimes } from 'react-icons/fa'
import CalendarTable from '../CalendarTable'

import { useGetAllScheduleCi } from '../../../hooks/HooksInquiry/useInquiry'

const ModalAllScheduleCi = ({ show, handleClose }) => {

  const { data: scheduleci, isLoading: loadingScheduleCi } = useGetAllScheduleCi();

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="xl" scrollable={false}>
      <Modal.Header closeButton>
        <Modal.Title>Credit Investigation Schedule</Modal.Title>
      </Modal.Header>
        <Modal.Body className="p-0" style={{ overflow: 'visible !important' }}>
          <Row className='g-0'>
            <Col xs={12} md={12} lg={12} style={{ height: '80vh' }}>
              <div className="flex-grow-1 px-3 pb-3 custom-calendar-scroll" 
              style={{ overflowY: 'auto', overflowX: 'hidden' }}>
                <CalendarTable 
                  filteredSchedules={scheduleci}
                  handleDateClick=''
                />
              </div>
            </Col>
          </Row>
        </Modal.Body>

      </Modal>
    </div>
  )
}

export default ModalAllScheduleCi
