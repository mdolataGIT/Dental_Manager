import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteClient } from "../../actions/clientActions";

class ClientItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteClient(id);
  };

  render() {
    const { client } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{client.pesel}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{client.clientName}</h3>
              <p>{client.clientSurname}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link to={`/clientBoard/${client.pesel}`}>
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1"> Patient Board </i>
                  </li>
                </Link>
                <Link to={`/toPhotos/${client.pesel}`}>
                  <li className="list-group-item update">
                    <i className="fas fa-images pr-1"> Photos</i>
                  </li>
                </Link>
                <Link to={`/updateClient/${client.pesel}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Client Info</i>
                  </li>
                </Link>

                <li
                  className="list-group-item delete"
                  onClick={this.onDeleteClick.bind(this, client.pesel)}
                >
                  <i className="fa fa-minus-circle pr-1"> Delete Patient</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ClientItem.propTypes = {
  deleteClient: PropTypes.func.isRequired,
};

export default connect(null, { deleteClient })(ClientItem);
