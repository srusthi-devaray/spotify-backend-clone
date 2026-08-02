import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../login.css";

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/api/auth/login",
        { identifier, password },
        { withCredentials: true },
      );
      console.log(identifier);
      console.log(password);

      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p style={{ textAlign: "center", marginTop: 8 }}>
          Dont have an account?{" "}
          <Link to="/register" style={{ color: "#1db954" }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
