import { Component } from "react";
import axios from 'axios'
import TodoItem from './components/todo-item'
import { API_URL } from './api/api'

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

  handleDelete = (id) => {
    axios({
      method: "DELETE",
      url: `${API_URL}/delete-todo/${id}`
    })
      .then((res) => {
        this.setState({
          todos: this.state.todos.filter(todo => {
            return todo.id !== id
          })
        })
      })
      .then((err) => {
        console.log(err)
      })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${API_URL}/add-todo`,
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
      })
      .catch((err) => {
        console.log(err);
      })
  }

  renderTodos = () => {
    return this.state.todos.map((todo) => {
      return (
        <TodoItem key={todo.id} todo={todo} handleDelete={this.handleDelete} />
      )
    })
  }

  componentDidMount() {
    console.log(API_URL)
    axios({
      method: "GET",
      url: `${API_URL}/get-all-todos`,
    })
      .then(res => {
        this.setState({
          todos: res.data
        })
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
        {this.renderTodos()}
      </div>
    );
  }
}