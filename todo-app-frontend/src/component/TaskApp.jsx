import React, { Component } from "react";
import ListTasksComponent from "./ListTasksComponent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TaskComponent from "./TaskComponent";
import Header from "../layout/Header";
import DeletedTasksComponent from "./DeletedTasksComponent";

class TaskApp extends Component {
  //every react class component should extend class Component
  render() {
    return (
      <Router>
        <>
          <Header />
          <Switch>
            <Route path="/" exact component={ListTasksComponent} />
            <Route path="/tasks" exact component={ListTasksComponent} />
            <Route path="/tasks/:id" component={TaskComponent} />
            <Route
              path="/tasks/deleted"
              exact
              component={DeletedTasksComponent}
            />
          </Switch>
        </>
      </Router>
    );
  }
}

export default TaskApp;
