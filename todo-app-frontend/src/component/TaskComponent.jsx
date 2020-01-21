import React, { Component } from "react";
import TaskDataService from "../service/TaskDataService";
import { Formik, Field, Form, ErrorMessage } from "formik";

/**
 * Class to update task details
 */
class TaskComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      description: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    console.log(this.state.id);
    //initialize state in the constr
    if (this.state.id == -1) {
      return;
    }

    TaskDataService.getTask(TaskDataService.USER, this.state.id).then(
      response =>
        this.setState({
          description: response.data.description
        })
    );
  }

  onSubmit(values) {
    let username = TaskDataService.USERNAME;
    let task = {
      id: this.state.id,
      description: values.description,
      targetDate: values.targetDate
    };

    if (this.state.id === -1) {
      TaskDataService.createTask(username, task).then(() =>
        this.props.history.push("/tasks")
      );
    } else {
      TaskDataService.updateTask(username, this.state.id, task).then(() =>
        this.props.history.push("/tasks")
      );
    }

    console.log(values);
  }

  validate(values) {
    /**
     * check for empty description
     * check for a minimum length of 5
     */
    let errors = {};
    if (!values.description) {
      errors.description = "Enter a description";
    } else if (values.description.length < 5) {
      errors.description = "Description must have at least 5 characters";
    }

    return errors;
  }

  render() {
    let { id, description } = this.state;

    return (
      <div>
        <h3>Task</h3>
        <div className="container">
          <Formik
            initialValues={{ id, description }}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {/*  Initialing Formik with the values loaded from state */}
            {props => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>Id</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="id"
                    disabled
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                  />
                </fieldset>
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default TaskComponent;
