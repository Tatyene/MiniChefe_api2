require("dotenv").config()
const express = require('express')
var cors = require('cors')
const pool = require('./configs/db.config')
const userRouter = require('./routes/user.route')
const authRouter = require('./routes/auth.route')
const recipeRouter = require('./routes/recipe.route')

var app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const port = process.env.SERVER_PORT

app.get('/', (req, res) => {
    res.send('It\'s working')
})


// // REGISTER A USER
// const bcrypt = require('bcrypt')
// const users = []
// app.post("/user", async (req, res) => {
//     const user = req.body.name
//     const email = req.body.email
//     const hashedPassword = await bcrypt.hash(req.body.password, 10)

//     users.push({ user: user, email: email, password: hashedPassword })
//     res.status(201).send(users)

//     console.log(users)
// })


// // accessTokens
// function generateAccessToken(email) {
//     return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
// }
// // refreshTokens
// let refreshTokens = []
// function generateRefreshToken(email) {
//     const refreshToken =
//         jwt.sign(email, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "20m" })
//     refreshTokens.push(refreshToken)
//     return refreshToken
// }


// //AUTHENTICATE LOGIN AND RETURN JWT TOKEN
// const jwt = require("jsonwebtoken")
// app.post("/login", async (req, res) => {
//     const user = users.find((c) => c.email == req.body.email)
//     //check to see if the user exists in the list of registered users
//     if (user == null) res.status(404).send("User does not exist!")
//     //if user does not exist, send a 400 response
//     if (await bcrypt.compare(req.body.password, user.password)) {
//         const accessToken = generateAccessToken({ email: req.body.email })
//         const refreshToken = generateRefreshToken({ email: req.body.email })
//         console.log({ accessToken: accessToken, refreshToken: refreshToken })
//         res.json({ accessToken: accessToken, refreshToken: refreshToken })
//     }
//     else {
//         res.status(401).send("Password Incorrect!")
//     }
// })


// app.post("/refreshToken", (req, res) => {
//     if (!refreshTokens.includes(req.body.token)) res.status(400).send("Refresh Token Invalid")
//     refreshTokens = refreshTokens.filter((c) => c != req.body.token)
//     //remove the old refreshToken from the refreshTokens list
//     const accessToken = generateAccessToken({ email: req.body.email })
//     const refreshToken = generateRefreshToken({ email: req.body.email })
//     //generate new accessToken and refreshTokens
//     res.json({ accessToken: accessToken, refreshToken: refreshToken })
// })

// app.delete("/logout", (req, res) => {
//     refreshTokens = refreshTokens.filter((c) => c != req.body.token)
//     //remove the old refreshToken from the refreshTokens list
//     res.status(204).send("Logged out!")
// })

// function validateToken(req, res, next) {
//     //get token from request header
//     const authHeader = req.headers["authorization"]
//     const token = authHeader.split(" ")[1]
//     //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
//     if (token == null) res.sendStatus(400).send("Token not present")
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) {
//             res.status(403).send("Token invalid")
//         }
//         else {
//             req.user = user
//             next() //proceed to the next action in the calling function
//         }
//     }) //end of jwt.verify()
// }

// app.get("/posts", validateToken, (req, res) => {
//     console.log("Token is valid")
//     console.log(req.user)

//     res.send(`${req.user} successfully accessed post`)
// })


// app.get("/recipe", (req, res) => {
//     pool.query('SELECT * FROM receita ORDER BY id ASC', (error, results) => {
//         if (error) {
//             throw error
//         }
//         res.status(200).json(results.rows)
//     })

// })

// app.get("/recipe:id", (req, res) => {
//     const id = req.params.id
//     pool.query('SELECT * FROM receita WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         res.status(200).json(results.rows)
//     })

// })

// app.delete("/recipe:id", (req, res) => {
//     const id = req.params.id
//     pool.query('DELETE FROM receita WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         res.status(200).json(results.rows)
//     })

// })

app.use(express.static(__dirname + '/../public/images'));
app.use('/', authRouter);
app.use('/user', userRouter);
app.use('/recipe', recipeRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})