import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import MusicCard from "../components/MusicCard";
// Upload form moved to /upload page
/* import UploadMusicForm from "../components/UploadMusicForm"; */
import Loader from "../components/Loader";

function Home() {
  const navigate = useNavigate();
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMusic = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/music/", {
        withCredentials: true,
      });
      setMusics(res.data.musics || []);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
        return;
      }
      alert(error.response?.data?.message || "Failed to load music");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMusic();
  }, []);

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <p></p>
        {loading ? (
          <Loader />
        ) : (
          musics.map((music) => <MusicCard key={music._id} music={music} />)
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#121212" },
  container: { maxWidth: 900, margin: "0 auto", padding: 24 },
};

export default Home;
