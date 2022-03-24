import React, { Component, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createXrayPhoto } from "../../../actions/xrayPhotoActions";
import classnames from "classnames";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";

class AddXrayPhoto extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;

    this.state = {
      xrayPhotoLink: "",
      pesel: id,
      description: "",
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
    const newXrayPhoto = {
      xrayPhotoLink: this.state.xrayPhotoLink,
      pesel: this.state.pesel,
      description: this.state.description,
    };
    this.props.createXrayPhoto(newXrayPhoto, this.props.history);
  }
  render() {
    const { id } = this.props.match.params;
    const { errors } = this.state;

    return (
      <div>
        <div className="xrayPhoto">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Add X-ray Image</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <textarea
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.description,
                      })}
                      placeholder="X-ray Title"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                    ></textarea>
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4 w-100"
                    value="Submit"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddXrayPhoto.propTypes = {
  createXrayPhoto: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createXrayPhoto })(AddXrayPhoto);
