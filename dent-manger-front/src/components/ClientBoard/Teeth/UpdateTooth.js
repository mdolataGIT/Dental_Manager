import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { getTooth, updateTooth } from "../../../actions/backlogClientActions";
import PropTypes from "prop-types";

class UpdateTooth extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      clientSequence: "",
      numberOfTooth: "",
      place: "",
      status: "",
      priority: "",
      dueDate: "",
      pesel: "",
      create_At: "",
      description: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { backlogClient_id, t_id } = this.props.match.params;
    this.props.getTooth(backlogClient_id, t_id, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      id,
      clientSequence,
      numberOfTooth,
      place,
      status,
      priority,
      dueDate,
      pesel,
      create_At,
      description,
    } = nextProps.tooth;

    this.setState({
      id,
      clientSequence,
      numberOfTooth,
      place,
      status,
      priority,
      dueDate,
      pesel,
      create_At,
      description,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const UpdateTooth = {
      id: this.state.id,
      clientSequence: this.state.clientSequence,
      numberOfTooth: this.state.numberOfTooth,
      place: this.state.place,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      pesel: this.state.pesel,
      create_At: this.state.create_At,
      description: this.state.description,
    };
    this.props.updateTooth(
      this.state.pesel,
      this.state.clientSequence,
      UpdateTooth,
      this.props.history
    );
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/clientBoard/${this.state.pesel}`}
                className="btn btn-light"
              >
                Back to Patient Board
              </Link>
              <h4 className="display-4 text-center">Update Tooth</h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <h6>Tooth Number</h6>
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.numberOfTooth,
                    })}
                    name="numberOfTooth"
                    placeholder="Tooth Number or Procedure Name"
                    value={this.state.numberOfTooth}
                    onChange={this.onChange}
                  />
                  {errors.numberOfTooth && (
                    <div className="invalid-feedback">
                      {errors.numberOfTooth}
                    </div>
                  )}
                </div>
                <br />
                <div className="form-group">
                  <h6>Place</h6>
                  <select
                    className="form-control form-control-lg"
                    name="place"
                    value={this.state.place}
                    onChange={this.onChange}
                  >
                    <option value="">Select Place</option>
                    <option value="Up Left">Up Left</option>
                    <option value="Up Right">Up Right</option>
                    <option value="Down Left">Down Left</option>
                    <option value="Down Right">Down Right</option>
                  </select>
                </div>
                <br />
                <div className="form-group">
                  <h6>Priority</h6>
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={3}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>
                <br />
                <div className="form-group">
                  <h6>Status</h6>
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="TO_DO">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>
                <br />
                <h6>Suspected</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <h6>Description</h6>
                  <textarea
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.description,
                    })}
                    name="description"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4 w-100"
                  value={"Submit"}
                />
                <br />
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateTooth.propTypes = {
  getTooth: PropTypes.func.isRequired,
  tooth: PropTypes.object.isRequired,
  updateTooth: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tooth: state.backlogClient.tooth,
  errors: state.errors,
});

export default connect(mapStateToProps, { getTooth, updateTooth })(UpdateTooth);
