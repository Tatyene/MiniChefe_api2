const express = require('express');
const middleware = require("../middleware/auth.middleware");
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');

const multer = require("multer");
const storageEngine = multer.diskStorage({
    destination: "./public/images/recipes",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});
const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 1000000 },
});

router.post("/", [middleware.verifySignUp, upload.single('img')], recipeController.create);
router.get("/", middleware.verifySignUp, recipeController.getAll);
router.get("/:id", middleware.verifySignUp, recipeController.getById);
router.delete("/:id", middleware.verifySignUp, recipeController.deleteById);

module.exports = router;