const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieparser = require("cookie-parser");
const authrouter = require("./routes/auth.route");
const connectdb = require("./db/db");
const musicrouter = require("./routes/music.routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5500"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.options(/(.*)/, cors());

connectdb();
app.use("/api/auth", authrouter);
app.use("/api/music", musicrouter);

app.use(express.static(path.join(__dirname, "..", "frontend")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.listen(3000, () => {
  console.log("server is started");
});
