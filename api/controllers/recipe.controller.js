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

/**
 * @param {{ query: { has: (arg0: string) => any; search: any; }; }} req
 * @param {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: any[]): void; new (): any; }; }; }} res
 */
async function getAll(req, res) {

    let query = 'SELECT * FROM recipe ';

    if (req.query['search']) {
        const search = req.query.search;
        query += `WHERE title LIKE '%${search}%' `;
    }

    query += 'ORDER BY id ASC';

    db.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })

}

async function getById(req, res) {
    const id = req.params.id
    db.query('SELECT * FROM recipe WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })

}

async function deleteById(req, res) {
    const id = req.params.id
    db.query('DELETE FROM recipe WHERE id = $1', [id], (error, results) => {
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