const express = require("express");
const musiccontroller = require("../controlers/music.controlers");
const multer = require("multer");
const authmiddleware = require("../middlewares/auth.middleware");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/upload",
  authmiddleware.authartist,
  upload.single("music"),
  musiccontroller.createmusic,
);
router.post("/album", authmiddleware.authartist, musiccontroller.createalbum);

router.get("/", authmiddleware.authuser, musiccontroller.getallmusic);

router.get(
  "/getallalbum",
  authmiddleware.authuser,
  musiccontroller.getallalbum,
);

router.get(
  "/getallalbum/:albumid",
  authmiddleware.authuser,
  musiccontroller.albumbyid,
);

module.exports = router;
