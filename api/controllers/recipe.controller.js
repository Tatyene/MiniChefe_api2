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

async function updateById(req, res) {
    const id = req.params.id

    const recipe = {
        title: req.body.title,
        img: req.file.filename,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
    }

    const query = {
        text: 'UPDATE "recipe" SET title = $1, img = $2, description = $3, ingredients = $4, instructions = $5 WHERE id = $6  RETURNING *',
        values: Object.values({ ...recipe, ['id']: id })
    };

    db.query(query, (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Não foi possível atualizar a Tabela.' });
        }

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Receita não encontrada.' });
        }

        const updatedEntity = result.rows[0];
        res.json(updatedEntity);
    })
}

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
    const query = {
        text: 'SELECT * FROM recipe WHERE id = $1 LIMIT 1',
        values: [id],
    };

    db.query(query, (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Ocorreu um erro no banco de dados' });
        }

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Entidade não encontrada.' });
        }

        const entity = result.rows[0];
        res.status(200).json(entity)
    })

}

async function deleteById(req, res) {
    const id = req.params.id
    const query = {
        text: 'DELETE FROM recipe WHERE id = $1',
        values: [id],
    }


    db.query(query, (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })

}

module.exports = {
    getAll,
    getById,
    deleteById,
    create,
    updateById
}