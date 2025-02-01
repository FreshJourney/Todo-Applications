import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [todos, Settodo] = useState([]);
  const [loading, Setloading] = useState(false);
  const [error, Seterror] = useState("");
  const [newTodos, SetnewTodos] = useState("");
  const [isDarkMode, setisDarkMode] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchtodos = async () => {
      try {
        Setloading(true);
        const response = await axios.get("http://localhost:4001/todo/fetch", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        Settodo(response.data.todos);
      } catch (error) {
        Seterror("Failed to fetch todos.");
      } finally {
        Setloading(false);
      }
    };

    fetchtodos();
  }, []);

  const todoCreate = async () => {
    if (!newTodos) return;

    try {
      const response = await axios.post(
        "http://localhost:4001/todo/create",
        {
          text: newTodos,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );
      Settodo([...todos, response.data.newTodo]);
      SetnewTodos("");
    } catch (error) {
      Seterror("Failed to create todo");
    }
  };

  const todoStatus = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      if (!todo) throw new Error("Todo not found");

      const response = await axios.put(
        `http://localhost:4001/todo/update/${id}`,
        { ...todo, completed: !todo.completed },
        { withCredentials: true }
      );

      Settodo(
        todos.map((t) =>
          t._id === id ? { ...t, completed: response.data.completed } : t
        )
      );
    } catch (error) {
      Seterror("Failed to update todo status");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/todo/delete/${id}`, {
        withCredentials: true,
      });
      Settodo(todos.filter((t) => t._id !== id));
    } catch (error) {
      Seterror("Error deleting todo");
    }
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:4001/user/logout");
      localStorage.removeItem("jwt");
      Seterror(null);
      alert("User Logout Successfull");
      navigateTo("/Login");
    } catch (error) {
      Seterror("Failed to logout");
    }
  };

  const ChangeTheme = () => {
    setisDarkMode(!isDarkMode);
  };

  return (
    <div
      className="container mt-5"
      style={{
        backgroundColor: isDarkMode ? "black" : "white",
        color: isDarkMode ? "white" : "black",
        height: "100vh",
      }}
    >
      <button type="button" onClick={ChangeTheme} className="btn btn-success">
        ChangeBG
      </button>
      <h1 className="text-center mb-4">Todo App</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading...</div>}

      <div className="d-flex mb-4">
        <input
          type="text"
          value={newTodos}
          onChange={(e) => SetnewTodos(e.target.value)}
          className="form-control mr-2"
          placeholder="Add a new task"
        />
        <button className="btn btn-primary" onClick={todoCreate}>
          Add
        </button>
      </div>

      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => todoStatus(todo._id)}
                className="mr-2"
              />
              <span>{todo.text}</span>
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => todoDelete(todo._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3"></p>
      <button className="btn btn-secondary mt-3" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}

export default Home;
