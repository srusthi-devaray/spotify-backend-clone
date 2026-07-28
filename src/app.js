const express = require("express");
const cookieparser = require("cookie-parser");
const authrouter = require("./routes/auth.route");
const connectdb = require("./db/db");
const musicrouter = require("./routes/music.routes");

const app = express();
app.use(express.json());
connectdb();
app.use(cookieparser());
app.use("/api/auth", authrouter);
app.use("/api/music", musicrouter);

app.listen(3000, () => {
  console.log("server is started");
});
