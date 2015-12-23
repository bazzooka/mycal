import React from 'react';
import fullcalendarcss from 'fullcalendar/dist/fullcalendar.css';
import customfullcalendarcss from '../lib/fullcalendar/fullcalendar.scss';
import $ from 'jquery';
import fullcalendar from 'fullcalendar';

const Calendar = React.createClass({
  componentDidMount() {
    $('#calendar').fullCalendar({
      defaultView: 'agendaWeek',
      header: {
        left: '',
        center: '',
        right: 'today, prev, next',
      },
      allDaySlot: false,
      scrollTime: '08:00:00',
      timezone: 'local',
      timeFormat: 'HH:mm',
      firstDay: 1,
      views: {
      basic: {
        columnFormat: 'dddd D/M',
      },
      agenda: {
        displayEventEnd: false,
        columnFormat: 'ddd\n D/M',
        slotLabelFormat: 'HH:mm',
      },
    },
    })
  },

  render() {
    return (
    <div id="calendar"></div>
    )
  },
});

export default Calendar;
