import { useState } from "react";
import axios from "axios";

function UploadMusicForm({ onUploaded }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("music", file);
    formData.append("title", title);

    try {
      await axios.post("http://localhost:3000/api/music/upload", formData, {
        withCredentials: true,
      });
      setTitle("");
      setFile(null);
      onUploaded();
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Upload Music</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Song title" required style={styles.input} />
      <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files[0])} required style={styles.input} />
      <button type="submit" style={styles.button} disabled={loading}>{loading ? "Uploading..." : "Upload"}</button>
    </form>
  );
}

const styles = {
  form: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 },
  input: { padding: 10, borderRadius: 8, border: "1px solid #444" },
  button: { padding: 10, borderRadius: 8, border: "none", background: "#1db954", color: "white", cursor: "pointer" },
};

export default UploadMusicForm;
