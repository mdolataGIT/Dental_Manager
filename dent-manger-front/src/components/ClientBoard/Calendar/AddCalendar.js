import React, { Component } from "react";
import axios from "axios";

import "react-datetime/css/react-datetime.css";

import "react-datepicker/dist/react-datepicker.css";
import classnames from "classnames";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { Button, Modal } from "react-bootstrap";

export default class AddCalendar extends Component {
  onDeleteClick = () => {
    window.location.reload();
  };

  reset() {
    this.setState({
      calendarId: "",
      title: "",
      allDay: "",
      start: "",
      end: "",
    });
    window.location.reload();
  }

  constructor(props) {
    super(props);

    this.state = {
      calendarId: "",
      title: "",
      allDay: "",
      start: "",
      end: "",
      show: false,
    };
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state, "add calendar state");
  };

  handleDate = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    this.props.addNewEvent(this.state);
    e.preventDefault();
    axios.post("/api/calendar", this.state).then((response) => {
      console.log(response);
    });
    this.reset();
  };

  render() {
    const { title, allDay, start, end, show } = this.state;
    return (
      <>
        <Button
          className="btn btn-primaly"
          variant="primary"
          onClick={this.handleShow}
        >
          <i className="fas fa-plus-circle"> New Appointment</i>
        </Button>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Appointment </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <div className="center">
              <div>
                <form onSubmit={this.handleSubmit}>
                  <h6>Title</h6>
                  <div class="col-md-6"></div>
                  <div className="col m-auto">
                    <input
                      className={classnames("form-control form-control-lg ")}
                      placeholder="Title"
                      type="text"
                      name="title"
                      value={title}
                      onChange={this.handleChange}
                      required
                    />
                  </div>

                  <h6>Start Date</h6>
                  <div className="col m-auto">
                    <input
                      className="form-control form-control-lg"
                      type="datetime-local"
                      name="start"
                      value={start} // new Date (start)
                      onChange={this.handleChange}
                      required
                    />
                  </div>

                  <h6>End Date</h6>
                  <div className="col m-auto">
                    <input
                      className="form-control form-control-lg"
                      type="datetime-local"
                      name="end"
                      value={end}
                      onChange={this.handleChange}
                      required
                    />
                  </div>

                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4 w-10"
                    value={"Submit"}
                    onSubmit={this.onDeleteClick}
                  />
                </form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
