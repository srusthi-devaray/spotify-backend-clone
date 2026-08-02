const jwt = require("jsonwebtoken");

async function authartist(req, res, next) {
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
        message: "you dont have a access",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }
}
async function authuser(req, res, next) {
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

    if (decoded.role !== "user" && decoded.role !== "artist") {
      return res.status(403).json({
        message: "you dont have a  an access",
      });
    }
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({
      message: "unauthorized",
    });
  }
}
module.exports = { authartist, authuser };
