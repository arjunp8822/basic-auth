const router = require("express").Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register

router.post("/register", async (req, res) => {
  try {
    const { username, password, passwordVerify } = req.body;

    // validation

    if (!username || !password || !passwordVerify) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }

    if (password.length < 6) {
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });
    }

    if (password !== passwordVerify) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter the same password twice." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        errorMessage: "An account with this username already exists.",
      });
    }

    // hash password

    const passwordHash = await bcrypt.hash(password, 10);

    // save new user account to database

    const newUser = new User({
      username,
      passwordHash,
    });

    const savedUser = await newUser.save();

    // log user in once account has been created and send a JWT

    const token = jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET);

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send(savedUser.username);
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

// login

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // validation

    if (!username || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }

    // authenticate user

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res
        .status(401)
        .json({ errorMessage: "Wrong username or password." });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect) {
      return res
        .status(401)
        .json({ errorMessage: "Wrong username or password." });
    }

    const token = jwt.sign({ user: existingUser._id }, process.env.JWT_SECRET);

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send(existingUser.username);
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

// logout

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

// is logged in

router.get("/loggedin", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.send(false);
    }
    const verified = await jwt.verify(token, process.env.JWT_SECRET);
    res.send(true);
  } catch (e) {
    res.send(false);
  }
});

module.exports = router;
