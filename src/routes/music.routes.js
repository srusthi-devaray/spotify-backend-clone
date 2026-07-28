const express = require("express");
const musiccontroller = require("../controlers/music.controlers");
const multer = require("multer");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});
router.post("/upload", upload.single("music"), musiccontroller.createmusic);
module.exports = router;
