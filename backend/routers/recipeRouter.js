const router = require("express").Router();
const Recipe = require("../models/RecipeModel");
const auth = require("../middleware/auth");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

// add recipe

router.post(
  "/create",
  auth,
  uploadMiddleware.single("file"),
  async (req, res) => {
    try {
      const { title, summary, content, time, cover, author } = req.body;
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      const newRecipe = new Recipe({
        title: title,
        summary: summary,
        content: content,
        time: time,
        cover: newPath,
        author: "author",
      });
      console.log(originalname, path, newPath);
      const savedRecipe = await newRecipe.save();
      res.status(200).json(savedRecipe);
    } catch (e) {
      console.error(e);
      res.status(500).send();
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

module.exports = router;
