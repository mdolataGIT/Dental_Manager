import React, { Component } from "react";
import { getClient, createClient } from "../../actions/clientActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateClient extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      clientName: "",
      pesel: "",
      clientSurname: "",
      date_of_birth: "",
      email: "",
      address: "",
      city: "",
      postcode: "",
      phoneNumber: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      id,
      clientName,
      pesel,
      clientSurname,
      date_of_birth,
      email,
      address,
      city,
      postcode,
      phoneNumber,
    } = nextProps.client;

    this.setState({
      id,
      clientName,
      pesel,
      clientSurname,
      date_of_birth,
      email,
      address,
      city,
      postcode,
      phoneNumber,
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getClient(id, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const updateClient = {
      id: this.state.id,
      clientName: this.state.clientName,
      pesel: this.state.pesel,
      clientSurname: this.state.clientSurname,
      date_of_birth: this.state.date_of_birth,
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      postcode: this.state.postcode,
      phoneNumber: this.state.phoneNumber,
    };

    this.props.createClient(updateClient, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update Patient Data</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <br />
                <h6>Patient Name</h6>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.clientName,
                    })}
                    placeholder="Patient Name"
                    name="clientName"
                    value={this.state.clientName}
                    onChange={this.onChange}
                  />
                  {errors.clientName && (
                    <div className="invalid-feedback">{errors.clientName}</div>
                  )}
                  <br />
                </div>
                <h6>Patient Surname</h6>
                <div className="form-group">
                  <input
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.clientSurname,
                    })}
                    placeholder="Patient Surname"
                    name="clientSurname"
                    value={this.state.clientSurname}
                    onChange={this.onChange}
                  />
                  {errors.clientSurname && (
                    <div className="invalid-feedback">
                      {errors.clientSurname}
                    </div>
                  )}
                </div>
                <br />
                <h6>PESEL</h6>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="PESEL"
                    name="pesel"
                    value={this.state.pesel}
                    onChange={this.onChange}
                    disabled
                  />
                  <br />
                </div>
                <h6>City</h6>
                <div className="form-group">
                  <input
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.city,
                    })}
                    placeholder="City"
                    name="city"
                    value={this.state.city}
                    onChange={this.onChange}
                  />
                  {errors.city && (
                    <div className="invalid-feedback">{errors.city}</div>
                  )}
                </div>
                <br />
                <h6>Postcode</h6>
                <div className="form-group">
                  <input
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.postcode,
                    })}
                    placeholder="Postcode"
                    name="postcode"
                    value={this.state.postcode}
                    onChange={this.onChange}
                  />
                  {errors.postcode && (
                    <div className="invalid-feedback">{errors.postcode}</div>
                  )}
                </div>
                <br />
                <h6>Address</h6>
                <div className="form-group">
                  <input
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.address,
                    })}
                    placeholder="Address"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChange}
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>
                <br />
                <h6>Email</h6>
                <div className="form-group">
                  <input
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email,
                    })}
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <br />
                <h6>Phone number</h6>
                <div className="form-group">
                  <input
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.phoneNumber,
                    })}
                    placeholder="Phone number"
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    onChange={this.onChange}
                  />
                  {errors.phoneNumber && (
                    <div className="invalid-feedback">{errors.phoneNumber}</div>
                  )}
                </div>
                <br />
                <h6>Date of birth</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="date_of_birth"
                    value={this.state.date_of_birth}
                    onChange={this.onChange}
                  />
                  <br />
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

UpdateClient.propTypes = {
  getClient: PropTypes.func.isRequired,
  createClient: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  client: state.client.client,
  errors: state.errors,
});

export default connect(mapStateToProps, { getClient, createClient })(
  UpdateClient
);
