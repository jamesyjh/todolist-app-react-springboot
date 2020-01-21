import React, { Component } from "react";
import TaskApp from "./component/TaskApp";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container">
        <TaskApp />
      </div>
    );
  }
}

export default App;
