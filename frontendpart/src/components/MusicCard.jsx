function MusicCard({ music }) {
  return (
    <div style={styles.card}>
      <h3>{music.title}</h3>
      <p>Artist: {music.artist?.username || "Unknown"}</p>
      {music.uri ? <audio controls src={music.uri} style={{ width: "100%" }} /> : null}
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
};

export default MusicCard;
