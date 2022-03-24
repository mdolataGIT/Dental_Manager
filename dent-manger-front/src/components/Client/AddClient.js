import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createClient } from "../../actions/clientActions";
import classnames from "classnames";

class AddClient extends Component {
  constructor() {
    super();

    this.state = {
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
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newClient = {
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
    this.props.createClient(newClient, this.props.history);
  }
  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="client">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Add New Patient</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.clientName,
                      })}
                      placeholder="Patient Name"
                      name="clientName"
                      value={this.state.clientName}
                      onChange={this.onChange}
                    />
                    {errors.clientName && (
                      <div className="invalid-feedback">
                        {errors.clientName}
                      </div>
                    )}
                  </div>
                  <br></br>
                  <div className="form-group">
                    <input
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.clientSurname,
                      })}
                      placeholder="Patient Surname"
                      name="clientSurname"
                      value={this.state.clientSurname}
                      onChange={this.onChange}
                    ></input>
                    {errors.clientSurname && (
                      <div className="invalid-feedback">
                        {errors.clientSurname}
                      </div>
                    )}
                  </div>
                  <br></br>{" "}
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.pesel,
                      })}
                      placeholder="PESEL"
                      name="pesel"
                      value={this.state.pesel}
                      onChange={this.onChange}
                    />
                    {errors.pesel && (
                      <div className="invalid-feedback">{errors.pesel}</div>
                    )}
                  </div>
                  <br></br>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
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
                  <br></br>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
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
                  <br></br>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
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
                  <br></br>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
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
                  <br></br>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.phoneNumber,
                      })}
                      placeholder="Phone number"
                      name="phoneNumber"
                      value={this.state.phoneNumber}
                      onChange={this.onChange}
                    />
                    {errors.phoneNumber && (
                      <div className="invalid-feedback">
                        {errors.phoneNumber}
                      </div>
                    )}
                  </div>
                  <br></br>
                  <h6>Date of birth</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="date_of_birth"
                      value={this.state.date_of_birth}
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
      </div>
    );
  }
}
AddClient.propTypes = {
  createClient: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createClient })(AddClient);
