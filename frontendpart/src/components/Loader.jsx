function Loader() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner} />
      <div style={styles.text}>Loading...</div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    color: "#dfeee4",
    padding: 16,
  },
  spinner: {
    width: 18,
    height: 18,
    borderRadius: 9,
    border: "3px solid rgba(255,255,255,0.08)",
    borderTopColor: "#1db954",
    animation: "spin 1s linear infinite",
  },
  text: { fontSize: 14 },
};

export default Loader;

/* Add keyframes via inline style injection (supported in Vite builds) */
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  try {
    styleSheet.insertRule(
      "@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }",
      styleSheet.cssRules.length,
    );
  } catch (e) {}
}
