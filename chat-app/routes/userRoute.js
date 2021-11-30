const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const User = mongoose.model("User", userSchema);
const router = express.Router();
// create new user
router.post("/create", async (req, res) => {
  console.log(req.body);
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
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          status: "success",
          token,
        });
      } else {
        res.status(401).json({
          error: "Auth failed!",
        });
      }
    } else {
      res.status(401).json({
        error: "Auth failed!",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
