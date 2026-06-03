import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FaUser } from 'react-icons/fa';

const CalendarTable = ({ filteredSchedules, handleDateClick }) => {
  return (
    <>
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
    </>
  )
}

export default CalendarTable
