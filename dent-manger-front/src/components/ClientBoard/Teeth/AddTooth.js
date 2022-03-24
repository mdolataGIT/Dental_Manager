import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { addTooth } from "../../../actions/backlogClientActions";
import PropTypes from "prop-types";

class AddTooth extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;

    this.state = {
      numberOfTooth: "",
      place: "",
      status: "",
      priority: 0,
      dueDate: "",
      description: "",
      pesel: id,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newTooth = {
      numberOfTooth: this.state.numberOfTooth,
      place: this.state.place,
      status: this.state.status,
      priority: this.state.priority,
      description: this.state.description,
      dueDate: this.state.dueDate,
    };
    this.props.addTooth(this.state.pesel, newTooth, this.props.history);
  }

  render() {
    const { id } = this.props.match.params;
    const { errors } = this.state;

    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/clientBoard/${id}`} className="btn btn-light">
                Back to Client Board
              </Link>
              <h4 className="display-4 text-center">Add Tooth</h4>

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.numberOfTooth,
                    })}
                    name="numberOfTooth"
                    placeholder="Tooth Number"
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
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>
                <br />
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
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

AddTooth.propTypes = {
  addTooth: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { addTooth })(AddTooth);
