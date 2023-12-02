const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
// const db = require('../configs/db.config')

const env = process.env;
const Pool = require('pg').Pool

const db = new Pool({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    ssl: false
})


// accessTokens
function generateAccessToken(email) {
    return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
}
// refreshTokens
let refreshTokens = []
function generateRefreshToken(email) {
    const refreshToken =
        jwt.sign(email, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "20m" })
    refreshTokens.push(refreshToken)
    return refreshToken
}


async function login(req, res) {
    let user = null;

    const result = await db.query('SELECT * FROM "user" WHERE email = $1', [req.body.email])

    user = result.rows ? result.rows[0] : null

    //check to see if the user exists in the list of registered users
    if (user == null) res.status(404).send("User does not exist!")
    //if user does not exist, send a 400 response
    if (await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = generateAccessToken({ email: req.body.email })
        const refreshToken = generateRefreshToken({ email: req.body.email })
        console.log({ accessToken: accessToken, refreshToken: refreshToken })
        res.json({ accessToken: accessToken, refreshToken: refreshToken })
    }
    else {
        res.status(401).send("Password Incorrect!")
    }
}

async function logout(req, res) {
    refreshTokens = refreshTokens.filter((c) => c != req.body.token)
    //remove the old refreshToken from the refreshTokens list
    res.status(204).send("Logged out!")
}


async function refreshToken(req, res) {
    if (!refreshTokens.includes(req.body.token)) res.status(400).send("Refresh Token Invalid")
    refreshTokens = refreshTokens.filter((c) => c != req.body.token)
    //remove the old refreshToken from the refreshTokens list
    const accessToken = generateAccessToken({ email: req.body.email })
    const refreshToken = generateRefreshToken({ email: req.body.email })
    //generate new accessToken and refreshTokens
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
}

module.exports = {
    login,
    logout,
    refreshToken
};