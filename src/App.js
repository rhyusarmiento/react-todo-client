import { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      done: false,
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
    console.log("haah");
  }

  render() {
    return (
      <div className="App">
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