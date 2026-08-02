import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;
    axios
      .get("http://localhost:3000/api/auth/me", { withCredentials: true })
      .then((res) => {
        if (mounted) setUser(res.data.user);
      })
      .catch(() => {
        if (mounted) setUser(null);
      });
    return () => (mounted = false);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true },
      );
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>Spotify Clone</div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/albums" style={styles.link}>
          Albums
        </Link>
        <Link to="/upload" style={styles.link}>
          Upload
        </Link>
        {user ? (
          <>
            <span style={{ marginRight: 8 }}>{user.username}</span>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    background: "#121212",
    color: "white",
    borderBottom: "1px solid #282828",
  },
  brand: { fontSize: 22, fontWeight: 700 },
  links: { display: "flex", gap: 16, alignItems: "center" },
  link: { color: "white", textDecoration: "none" },
  button: {
    background: "#1db954",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default Navbar;
