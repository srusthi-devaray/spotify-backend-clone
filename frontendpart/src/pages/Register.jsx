import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../login.css";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/auth/register",
        { username, email, password, role },
        { withCredentials: true },
      );
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form">
        <h2>Register</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="artist">Artist</option>
        </select>
        <button type="submit">Register</button>
        <p style={{ textAlign: "center", marginTop: 8 }}>
          Already have an account? <Link to="/login" style={{ color: "#1db954" }}>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
