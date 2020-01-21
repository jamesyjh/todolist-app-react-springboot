import React, { Component } from "react";
import TaskDataService from "../service/TaskDataService";

class ListTasksComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      message: null
    };
    this.deleteTaskClicked = this.deleteTaskClicked.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.updateTaskClicked = this.updateTaskClicked.bind(this);
    this.addTaskClicked = this.addTaskClicked.bind(this);
  }

  componentDidMount() {
    // called as soon as component is mounted
    // calling refreshList as soon as component is mounted
    this.refreshList();
  }

  refreshList() {
    TaskDataService.getAllTasks(TaskDataService.USERNAME).then(response => {
      console.log(response);
      this.setState({ tasks: response.data });
    });
  }

  deleteTaskClicked(id, description) {
    TaskDataService.deleteTask(TaskDataService.USERNAME, id, description).then(
      response => {
        console.log(id);
        this.setState({ message: `Deleted task: ${description}.` });
        this.refreshList();
      }
    );
  }

  updateTaskClicked(id) {
    console.log("update" + id);
    this.props.history.push(`/tasks/${id}`);
  }

  addTaskClicked() {
    this.props.history.push(`/tasks/-1`);
  }

  render() {
    return (
      <div className="container my-5">
        <h3>Your Tasks</h3>
        {this.state.message && (
          <div className="alert alert-success">{this.state.message}</div>
        )}
        <div className="container my-4">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                {/* <th>Task#</th> */}
                <th>Description</th>
                <th>Remove Task</th>
                <th>Update Task</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tasks.map(
                /**
                 * allows you to loop around list of items
                 * define how each item should be displayed
                 * key={task.id} -> key used to uniquely identify a row
                 * {task.id} -> {} used to execute JS code in JSX
                 */
                task => (
                  <tr key={task.id}>
                    <td>{task.description}</td>

                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          this.deleteTaskClicked(task.id, task.description)
                        }
                      >
                        Remove
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => this.updateTaskClicked(task.id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div className="row">
            <button className="btn btn-success" onClick={this.addTaskClicked}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ListTasksComponent;
