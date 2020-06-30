const jwt = require('jsonwebtoken');
module.exports = {
    createToken: async function createToken(object) {
        return jwt.sign(await object, process.env.SECRET, { expiresIn: '24h' })
    },
    verifyToken: async function verifyToken(token) {
        const status = {}
        jwt.verify(await token, process.env.SECRET, (err, decoded) => {
            status.err = err ? err : null
            status.decoded = decoded ? decoded : null
        })
        return status
    }
}