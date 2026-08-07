import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

function AlbumDetails() {
  const navigate = useNavigate();
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/music/getallalbum/${albumId}`,
          { withCredentials: true },
        );
        setAlbum(res.data.album);
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/login");
          return;
        }
        alert(error.response?.data?.message || "Failed to load album");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [albumId]);

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        {loading ? <Loader /> : null}
        {album ? (
          <>
            <h2>{album.title}</h2>
            <p>Artist: {album.artist?.username || "Unknown"}</p>
            <h3>Songs</h3>
            {album.musics?.map((music) => (
              <div key={music._id} style={styles.card}>
                <h4>{music.title}</h4>
                {music.uri ? (
                  <audio controls src={music.uri} style={{ width: "100%" }} />
                ) : null}
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#121212" },
  container: { maxWidth: 900, margin: "0 auto", padding: 24, color: "white" },
  card: {
    background: "#181818",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
};

export default AlbumDetails;
