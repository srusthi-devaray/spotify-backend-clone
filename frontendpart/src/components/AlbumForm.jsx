import { useState } from "react";
import axios from "axios";

function AlbumForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [musics, setMusics] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:3000/api/music/album",
        {
          title,
          musics: musics
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        },
        { withCredentials: true },
      );
      setTitle("");
      setMusics("");
      onCreated();
    } catch (error) {
      alert(error.response?.data?.message || "Album creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Create Album</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Album title"
        required
        style={styles.input}
      />
      <input
        value={musics}
        onChange={(e) => setMusics(e.target.value)}
        placeholder="Music IDs"
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button} disabled={loading}>
        {loading ? "Creating..." : "Create Album"}
      </button>
    </form>
  );
}

const styles = {
  form: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 },
  input: { padding: 10, borderRadius: 8, border: "1px solid #444" },
  button: {
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#1db954",
    color: "white",
    cursor: "pointer",
  },
};

export default AlbumForm;
