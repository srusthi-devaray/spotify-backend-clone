import { Link } from "react-router-dom";

function AlbumCard({ album }) {
  return (
    <div style={styles.card}>
      <h3>{album.title}</h3>
      <p>Artist: {album.artist?.username || "Unknown"}</p>
      <Link to={`/albums/${album._id}`} style={styles.link}>View Details</Link>
    </div>
  );
}

const styles = {
  card: {
    background: "#181818",
    padding: 16,
    borderRadius: 12,
    color: "white",
    marginBottom: 12,
  },
  link: { color: "#1db954", textDecoration: "none" },
};

export default AlbumCard;
