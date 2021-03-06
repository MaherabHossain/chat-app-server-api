const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const checkLogin = require("../middlewares/checkLogin");
const User = mongoose.model("User", userSchema);
const router = express.Router();
// create new user
router.post("/create", async (req, res) => {
  try {
    const hashPass = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
    });
    await user.save();
    res.status(200).json({
      status: "success",
      message: "user created successfully",
    });
  } catch (err) {
    res.status(503).json({
      error: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    console.log(user.length);
    if (user.length > 0) {
      const isValid = await bcrypt.compare(req.body.password, user[0].password);
      if (isValid) {
        console.log(process.env.SECRET_KEY);
        const token = jwt.sign(
          {
            id: user[0]._id,
            name: user[0].name,
            email: req.body.email,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "1400h",
          }
        );
        res.status(200).json({
          status: "success",
          token,
        });
      } else {
        res.status(401).json({
          error: "Auth failed! 1",
        });
      }
    } else {
      res.status(401).json({
        error: "Auth failed!2",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/", checkLogin, async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch {
    res.status(500).json({
      error: "server side problem!",
    });
  }
});
module.exports = router;
