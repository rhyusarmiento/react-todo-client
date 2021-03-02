export const API_URL = 
    process.env.REACT_APP_API_URL === "DEVELOPMENT" 
        ? "http://localhost:5000/api"
        : "https://rs-flask-todo-api.herokuapp.com/api";