const express = require('express')
const bcrypt = require('bcrypt')

const app = express()

app.use(express.json())

const users = []

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = {
        username: req.body.username,
        password: hashedPassword
    }
    users.push(user)
    res.status(201).send()
})

app.post('/login', async (req, res) => {
    const user = users.find(x => x.username === req.body.username)
    if (!user) {
        res.send('No user found')
    } else {
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                res.send('Success')
            } else {
                res.send('Invalid password')
            }
        } catch (e) {
            res.send(e)
        }
    }

})

app.listen(4000)