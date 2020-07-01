const token = require('../tools/token')
module.exports = {
    authenticated: authenticated = fn => async(req, res) => {
        token.verifyToken(req.headers.authorization).then(status => {
            if (!status.error && status.decoded) {
                return fn(req, res)
            }
            res.status(500).json({ message: "Sorry you aren't authenticated " })
        })
    }
}