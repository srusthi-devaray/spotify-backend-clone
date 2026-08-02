import Navbar from "../components/Navbar";
import UploadMusicForm from "../components/UploadMusicForm";
import AlbumForm from "../components/AlbumForm";

function Upload() {
  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <h2>Upload & Create</h2>
        <UploadMusicForm onUploaded={() => {}} />
        <AlbumForm onCreated={() => {}} />
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#121212" },
  container: { maxWidth: 900, margin: "0 auto", padding: 24, color: "white" },
};

export default Upload;
