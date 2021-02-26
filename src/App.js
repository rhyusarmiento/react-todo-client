import { Component } from "react";
import axios from 'axios'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      todos: []
    }
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5000/api/add-todo",
      data: {
        title: this.state.title,
        done: false,
      },
    })
      .then((res) => {
        this.setState({
          todos: [res.data, ...this.state.todos],
          title: ""
        })
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  componentDidMount() {
    axios({
      method: "GET",
      url: "http://localhost:5000/api/get-all-todos",
    })
      .then(res => {
        this.setState({
          todos: res.data
        })
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="app">
        <h1>Todo List</h1>
        <form onSubmit={this.handleSubmit} className="add-todo">
          <input
            type="text"
            placeholder="Add Todo"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <button type="submit">Add</button>
        </form>
        <div>

        </div>
      </div>
    );
  }
}