const musicmodel = require("../models/music.mode");
const uploadfile = require("../service/storage.services");
const jwt = require("jsonwebtoken");
async function createmusic(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      "f7ab7ea2c5d715c8f9d579fcf28fe947676db5234e391361b1decd5ef4e2539c",
    );

    if (decoded.role != "artist") {
      return res.status(403).json({
        message: "you dont have a access to create a music",
      });
    }

    const file = req.file;
    const { title } = req.body;
    console.log(req.file);
    console.log(req.body);
    const result = await uploadfile(file.buffer.toString("base64"));

    const music = await musicmodel.create({
      uri: result.url,
      title,
      artist: decoded.id,
    });

    return res.status(201).json({
      message: "music created successfully",
      music: {
        id: music._id,
        title: music.title,
        artist: music.artist,
        uri: music.uri,
      },
    });
    console.log(music);
  } catch (err) {
    console.error("Upload Error:", err);

    return res.status(500).json({
      message: err.message,
    });
  }
}
module.exports = { createmusic };
