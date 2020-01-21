import axios from "axios";

const USERNAME = "hongjame";
const BACKEND_API_URL = "http://localhost:8080";
const USERS_URL = `${BACKEND_API_URL}/users/${USERNAME}`;

class TaskDataService {
  getAllTasks(name) {
    return axios.get(`${USERS_URL}/tasks`);
  }

  getTask(name, id) {
    return axios.get(`${USERS_URL}/tasks/${id}`);
  }

  deleteTask(name, id) {
    //executes the delete request to a specific course API URL.
    console.log("::executed Delete::");
    return axios.delete(`${USERS_URL}/tasks/${id}`);
  }

  updateTask(name, id, task) {
    return axios.put(`${USERS_URL}/tasks/${id}`, task);
  }

  createTask(name, task) {
    return axios.post(`${USERS_URL}/tasks/`, task);
  }
}

export default new TaskDataService();
