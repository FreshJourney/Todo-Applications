import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4001/user/login",
        {
          Email: email,
          Password: password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert(response.data.message || "Login Successful");
      localStorage.setItem("jwt", response.data.chkUser.token);
      navigateTo("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1>Login Page</h1>
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>

      <button className="btn btn-primary w-100" onClick={loginUser}>
        Login
      </button>
    </div>
  );
}

export default Login;
