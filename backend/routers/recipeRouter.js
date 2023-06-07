const router = require('express').Router()
const Recipe = require('../models/RecipeModel')
const auth = require('../middleware/auth')

// add recipe

router.post('/', auth, async (req, res) => {
    try {
        const { name } = req.body
        const newRecipe = new Recipe({
            name: name
        })
        const savedRecipe = await newRecipe.save()
        res.status(200).json(savedRecipe)
    } catch (e) {
        console.error(e)
        res.status(500).send()
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const recipes = await Recipe.find()
        res.json(recipes)
    } catch (e) {
        console.error(e)
        res.status(500).send()
    }
})

module.exports = router