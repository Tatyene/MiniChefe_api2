const db = require('../configs/db.config')

async function create(req, res) {
    const recipe = {
        title: req.body.title,
        img: req.file.filename,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
    }


    db.query('INSERT INTO "recipe" (title, img, description, ingredients, instructions) VALUES ($1, $2, $3, $4, $5)', Object.values(recipe), (error, result) => {
        if (error) {
            throw error
        }

        res.status(201).send(recipe)
        //${result.insertId}
    })
}

async function getAll(req, res) {
    db.query('SELECT * FROM receita ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })

}

async function getById(req, res) {
    const id = req.params.id
    db.query('SELECT * FROM receita WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })

}

async function deleteById(req, res) {
    const id = req.params.id
    db.query('DELETE FROM receita WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })

}

module.exports = {
    getAll,
    getById,
    deleteById,
    create
}