const express = require('express')

const app = express()

const middleware = (req, res, next) => {
    console.log('This is a middleware')
    next()
}

const errorMiddleware = (err, req, res, next) => {
    if (err) {
        res.send('<h1>Error handled</h1>')
    }
}

app.use(middleware)

app.get('/', (req, res) => {
    console.log('Get request')
    res.send('<h1>This is a get request</h1>')
})

app.use(errorMiddleware)

app.listen(4000)