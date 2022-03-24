import React, { Component } from "react";
import axios from "axios";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import jwt_decode from "jwt-decode";

import "react-datepicker/dist/react-datepicker.css";
import AddCalendar from "./AddCalendar";

export default class CalendarClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calendars: [],
      calendar: {},
    };
  }

  componentDidMount() {
    axios.get("/api/calendar").then((response) => {
      this.setState({
        calendars: response.data,
      });
      console.log(response.data, "Component did mount");
    });
  }

  deleteCalendar = (calendarId) => {
    if (window.confirm("Are you sure?")) {
      console.log(calendarId, "DELETE CAL");

      axios
        .delete(`/api/calendar/${calendarId}`)
        .then(() => window.location.reload());
      //fetch(`/api/calendar/${calendarId}`, {
      //    method: "DELETE",
      //    headers: new Headers({
      //      Authorization: localStorage.jwtToken,
      //      "Content-Type": "application/x-www-form-urlencoded",
      //     }),
      //    }).then(() => window.location.reload());
    }
  };

  addNewEvent = (newEvent) => {
    this.setState((prevstate) => ({
      calendars: [...prevstate.calendars, newEvent],
    }));
  };

  render() {
    const locales = {
      "en-US": require("date-fns/locale/en-US"),
    };

    const localizer = dateFnsLocalizer({
      format,
      parse,
      startOfWeek,
      getDay,
      locales,
    });

    const { calendars } = this.state;
    console.log(calendars);
    return (
      <div className="container">
        <AddCalendar addNewEvent={this.addNewEvent} />
        <Calendar
          localizer={localizer}
          events={calendars.map((item) => ({
            ...item,
            start: new Date(item.start),
            end: new Date(item.end),
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
          onDoubleClickEvent={(e) => {
            console.log(e, "DOUBLE CLICK");
            this.deleteCalendar(e.calendarId);
          }}
        />
      </div>
    );
  }
}
