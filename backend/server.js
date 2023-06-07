require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/auth', require('./routers/userRouter'))
app.use('/recipes', require('./routers/recipeRouter'))

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING).catch(e => console.log(e))

app.listen(4000, () => {
    console.log('Running on 4000')
})