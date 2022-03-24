import React, { Component } from "react";
import Tooth from "./Teeth/Tooth";

class BacklogClient extends Component {
  render() {
    const { teeth_prop } = this.props;

    const teeth = teeth_prop.map((tooth) => (
      <Tooth key={tooth.id} tooth={tooth} />
    ));

    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];

    for (let i = 0; i < teeth.length; i++) {
      if (teeth[i].props.tooth.status === "TO_DO") {
        todoItems.push(teeth[i]);
      }

      if (teeth[i].props.tooth.status === "IN_PROGRESS") {
        inProgressItems.push(teeth[i]);
      }

      if (teeth[i].props.tooth.status === "DONE") {
        doneItems.push(teeth[i]);
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>To Do</h3>
              </div>
            </div>
            {todoItems}
            {
              // insert teeth here
            }
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {inProgressItems}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {doneItems}
          </div>
        </div>
      </div>
    );
  }
}

export default BacklogClient;
