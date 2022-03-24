import React, { Component } from "react";
import { Link } from "react-router-dom";
import BacklogClient from "./BacklogClient";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklogClient } from "../../actions/backlogClientActions";

class ClientBoard extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBacklogClient(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { teeth } = this.props.backlogClient;
    const { errors } = this.state;

    let BoardContent;

    const boardAlgorithm = (errors, teeth) => {
      if (teeth.length < 1) {
        if (errors.clientNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.clientNotFound}
            </div>
          );
        } else if (errors.pesel) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.pesel}
            </div>
          );
        } else {
          return (
            <div className="alert alert-info text-center" role="alert">
              No Teeth on this board
            </div>
          );
        }
      } else {
        return <BacklogClient teeth_prop={teeth} />;
      }
    };

    BoardContent = boardAlgorithm(errors, teeth);

    return (
      <div className="container">
        <Link to={`/addTooth/${id}`} className="btn btn-primary">
          <i className="fas fa-plus-circle"> Create Tooth</i>
        </Link>
        <br />
        <hr />
        {BoardContent}
      </div>
    );
  }
}

ClientBoard.propTypes = {
  backlogClient: PropTypes.object.isRequired,
  getBacklogClient: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  backlogClient: state.backlogClient,
  errors: state.errors,
});

export default connect(mapStateToProps, { getBacklogClient })(ClientBoard);
