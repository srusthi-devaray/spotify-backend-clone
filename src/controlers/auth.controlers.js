const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registeruser(req, res) {
  const { username, email, password, role = "user" } = req.body;
  const useralreadyexists = await usermodel.findOne({
    $or: [{ username }, { email }],
  });
  if (useralreadyexists) {
    return res.status(409).json({
      message: "this user alredy exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await usermodel.create({
    username,
    email,
    password: hashedPassword,
    role,
  });
  const token = jwt.sign(
    { id: user._id, role: user.role },
    "f7ab7ea2c5d715c8f9d579fcf28fe947676db5234e391361b1decd5ef4e2539c",
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "user created successfully",
    user,
  });
}

async function loginuser(req, res) {
  console.log(req.body);
  const { username, email, password, identifier } = req.body;
  const lookup = (identifier || username || email || "").trim();
  console.log("lookup =", lookup);

  if (!lookup || !password) {
    return res.status(401).json({
      message: "invalid user credentials",
    });
  }

  const user = await usermodel.findOne({
    $or: [
      { username: { $regex: `^${lookup}$`, $options: "i" } },
      { email: { $regex: `^${lookup}$`, $options: "i" } },
    ],
  });
  console.log("user =", user);
  if (!user) {
    return res.status(401).json({
      message: "invalid user credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log("password valid =", isPasswordValid);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "invalid user credentials",
    });
  }

  //verify the password is correct are not
  //   const ispassword = await bcrypt.compare(password, user.password);
  //   if (!ispassword) {
  //     return res.status(401).json({
  //       message: "invalid credinatials",
  //     });
  //   }

  //   try {
  //     const decoded = jwt.verify(
  //       token,
  //       "f7ab7ea2c5d715c8f9d579fcf28fe947676db5234e391361b1decd5ef4e2539c",
  //     );

  //     return res.status(200).json({
  //       message: "logged in successfully",
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    "f7ab7ea2c5d715c8f9d579fcf28fe947676db5234e391361b1decd5ef4e2539c",
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "user logged in  successfully",
    user,
  });
}

async function logoutuser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "user logged out successfully",
  });
}

async function currentuser(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      "f7ab7ea2c5d715c8f9d579fcf28fe947676db5234e391361b1decd5ef4e2539c",
    );
    const user = await usermodel
      .findById(decoded.id)
      .select("username email role");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(401).json({ message: "unauthorized" });
  }
}
module.exports = { registeruser, loginuser, logoutuser, currentuser };
