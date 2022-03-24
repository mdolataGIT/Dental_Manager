import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteTooth } from "../../../actions/backlogClientActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Tooth extends Component {
  onDeleteClick(backlogClient_id, t_id) {
    this.props.deleteTooth(backlogClient_id, t_id);
  }
  render() {
    const { tooth } = this.props;
    let priorityString;
    let priorityClass;

    if (tooth.priority === 1) {
      priorityClass = "bg-danger text-white";
      priorityString = "HIGH";
    }

    if (tooth.priority === 2) {
      priorityClass = "bg-warning text-white";
      priorityString = "MEDIUM";
    }

    if (tooth.priority === 3) {
      priorityClass = "bg-info text-white";
      priorityString = "LOW";
    }

    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary ${priorityClass}`}>
          Priority: {priorityString}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">Tooth Number: {tooth.numberOfTooth}</h5>
          <p className="card-text text-truncate ">{tooth.place}</p>
          <Link
            to={`/updateTooth/${tooth.pesel}/${tooth.clientSequence}`}
            className="btn btn-primary"
          >
            View / Update
          </Link>
          &ensp;
          <button
            className="btn btn-danger ml-4"
            onClick={this.onDeleteClick.bind(
              this,
              tooth.pesel,
              tooth.clientSequence
            )}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
Tooth.propTypes = {
  deleteTooth: PropTypes.func.isRequired,
};
export default connect(null, { deleteTooth })(Tooth);
