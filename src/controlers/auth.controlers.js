const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");

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

  //   const hashpassword = await bcrypt.hash(password, 10);
  // always we need to save hashpassword in our database
  const user = await usermodel.create({
    username,
    email,
    password,
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
  const { username, email, password } = req.body;
  const user = await usermodel.findOne({ $or: [{ username }, { email }] });
  if (!user) {
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
module.exports = { registeruser, loginuser, logoutuser };
