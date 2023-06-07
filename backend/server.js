require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use('/auth', require('./routers/userRouter'))

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING).catch(e => console.log(e))

app.listen(4000, () => {
    console.log('Running on 4000')
})