import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [newUsername, setnewUsername] = useState("");
  const [newEmail, setnewEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const navigateTo = useNavigate();

  const CreateUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4001/user/signup",
        {
          Username: newUsername,
          Email: newEmail,
          Password: newPassword,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert(response.data.message || "User Registered Successfully");
      localStorage.setItem("jwt", response.data.token);
      navigateTo("/Login");
      setnewUsername("");
      setnewEmail("");
      setnewPassword("");
    } catch (error) {
      console.log(response.data);
      console.error("Error creating user:", error);
      alert(error.response.data.message || "User Registration Failed");
    }
  };
  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1>Registration Page</h1>
      </div>

      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="form-control"
          value={newUsername}
          onChange={(e) => setnewUsername(e.target.value)}
          placeholder="Enter username"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={newEmail}
          onChange={(e) => setnewEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={newPassword}
          onChange={(e) => setnewPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>

      <button className="btn btn-primary w-100" onClick={CreateUser}>
        Register
      </button>
    </div>
  );
}

export default Register;
