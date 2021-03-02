import React, { Component } from "react";
import { API_URL } from './../api/api'

export default class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: props.todo.done
        }
    }

    handleDone = () => {
        fetch(`${API_URL}/edit-done/${this.props.todo.id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            done: !this.state.done,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              done: data.done,
            });
          })
          .catch((err) => console.log(err));
    };
    
    render() {
        const { id, title } = this.props.todo
        const { handleDelete } = this.props
        return (
            <div className="todo-item">
                <input
                    type="checkbox"
                    defaultChecked={this.state.done}
                    onClick={this.handleDone}
                />
                <p className={this.state.done ? "done" : null}>{title}</p>
                <button onClick={() => { handleDelete(id) }}>X</button>
            </div>
        )
    }
}