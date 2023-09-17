const bcrypt = require('bcrypt')
const db = require('../configs/db.config')

async function create(req, res) {
    const name = req.body.name
    const email = req.body.email
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const user = [name, email, hashedPassword];

    db.query('INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3)', user, (error, result) => {
        if (error) {
            throw error
        }

        res.status(201).send(user) //${result.insertId}
    })


}

module.exports = {
    create
}