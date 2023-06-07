const jwt = require('jsonwebtoken')

async function auth(req, res, next) {
    try {
        const token = req.cookies.token

        if (!token) { return res.status(401).json({ errorMessage: 'User not authorised' }) }

        const verified = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified.user

        next()

    } catch (e) {
        console.error(e)
        res.status(401).json({ errorMessage: 'User not authorised' })
    }
}

module.exports = auth