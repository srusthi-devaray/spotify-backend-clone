const musicmodel = require("../models/music.mode");
const uploadfile = require("../service/storage.services");
const albummodel = require("../models/album.model");
const jwt = require("jsonwebtoken");

async function createmusic(req, res) {
  const file = req.file;
  const { title } = req.body;
  console.log(req.file);
  console.log(req.body);
  const result = await uploadfile(file.buffer.toString("base64"));

  const music = await musicmodel.create({
    uri: result.url,
    title,
    artist: req.user.id,
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
}

async function createalbum(req, res) {
  console.log(req.cookies);
  console.log(req.cookies.token);

  const { title, musics } = req.body;

  const album = await albummodel.create({
    title,
    artist: req.user.id,
    musics: musics,
  });
  res.status(201).json({
    message: "album created successfully",
    album: {
      id: album._id,
      artist: album.artist,
      title: album.title,
      musics: album.musics,
    },
  });
}

async function getallmusic(req, res) {
  const musics = await musicmodel.find().populate("artist");

  return res.status(200).json({
    message: "musics fetched successfully",
    musics: musics,
  });
}

async function getallalbum(req, res) {
  const album = await albummodel
    .find()
    .select("title artist")
    .populate("artist", "username email")
    .populate("musics");
  res.status(200).json({
    message: "album fetched successfully",
    album: album,
  });
}

async function albumbyid(req, res) {
  const albumbyid = req.params.albumid;
  const album = await albummodel
    .findById(albumbyid)
    .populate("artist", "username email");

  return res.status(200).json({
    message: "album fethced by id successfully",
    album: album,
  });
}

async function deletemusicbyid(req, res) {
  try {
    const deleteid = req.params.deletebyid;
    const music = await musicmodel.findById(deleteid);
    if (!music) {
      return res.status(404).json({
        message: "this music doesnot exists",
      });
    }
    if (music.artist.toString() !== req.user.id) {
      return res.status(403).json({
        message: "you dont have a access to delete this music",
      });
    }
    await musicmodel.findByIdAndDelete(deleteid);

    return res.status(200).json({
      message: "this music has been deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
}

module.exports = {
  createmusic,
  createalbum,
  getallmusic,
  getallalbum,
  albumbyid,
  deletemusicbyid,
};
