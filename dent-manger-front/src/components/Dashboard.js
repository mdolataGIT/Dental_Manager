import React, { Component } from "react";
import ClientItem from "./Client/ClientItem";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateClientButton from "./Client/CreateClientButton";
import { connect } from "react-redux";
import { getClients } from "../actions/clientActions";
import PropTypes from "prop-types";
import axios from "axios";
import Clients from "./Clients";
import Pagination from "./Pagination";
import classnames from "classnames";

class Dashboard extends Component {
  componentDidMount() {
    //  this.props.getClients();
  }
  state = {
    clients: [],
    loading: false,
    currentPage: 1,
    clientsPerPage: 5,
    allClients: [],
    userFilter: "",
    currentClients: [],
  };

  componentDidMount() {
    const getClients = async () => {
      this.setState({ loading: true });
      const results = await axios.get("/api/client/all");
      this.setState({ allClients: results.data, clients: results.data });
      this.setState({ loading: false });
    };

    getClients();
  }

  handleChange = (e) => {
    const userFilterName = e.target.value;
    this.setState({ userFilter: userFilterName });
    const clients = this.state.allClients.filter((client) =>
      client.clientSurname.toUpperCase().includes(userFilterName.toUpperCase())
    );
    this.setState({ clients });
  };

  render() {
    const {
      currentPage,
      clientsPerPage,
      clients,
      loading,
      allClients,
      userFilter,
    } = this.state;

    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

    const paginate = (pageNum) => this.setState({ currentPage: pageNum });

    const nextPage = () => this.setState({ currentPage: currentPage + 1 });

    const prevPage = () => this.setState({ currentPage: currentPage - 1 });

    const canGoToNextPage = () => {
      return clients.length >= currentPage * clientsPerPage;
    };

    return (
      <div className="clients">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Patients List</h1>

              <CreateClientButton />
              <br />
              <br />
              <ul className="navbar-nav mr-auto">
                <input
                  type="text"
                  className=" form-control text-center"
                  placeholder="Search by Surname"
                  value={userFilter}
                  onChange={this.handleChange}
                />
              </ul>

              <hr />
              <Clients clients={currentClients} loading={loading} />
              <Pagination
                clientsPerPage={clientsPerPage}
                totalClients={clients.length}
                paginate={paginate}
                nextPage={canGoToNextPage ? nextPage : null}
                prevPage={prevPage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  client: PropTypes.object.isRequired,
  getClients: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  client: state.client,
});

export default connect(mapStateToProps, { getClients })(Dashboard);
