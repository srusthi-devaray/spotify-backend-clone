import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import AlbumCard from "../components/AlbumCard";
import AlbumForm from "../components/AlbumForm";
import Loader from "../components/Loader";

function Albums() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlbums = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/music/getallalbum`,
        { withCredentials: true },
      );
      setAlbums(res.data.album || []);
      console.log(res.data.album);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
        return;
      }
      alert(error.response?.data?.message || "Failed to load albums");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <h2>Albums</h2>
        <AlbumForm onCreated={fetchAlbums} />
        {loading ? (
          <Loader />
        ) : (
          albums.map((album) => <AlbumCard key={album._id} album={album} />)
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#121212" },
  container: { maxWidth: 900, margin: "0 auto", padding: 24 },
};

export default Albums;
