const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth.middleware')
const authController = require('../controllers/auth.controller')

router.post("/login", authController.login);
router.post("/logout", middleware.verifySignUp, authController.logout);
router.post("/refreshToken", middleware.verifySignUp, authController.refreshToken);

module.exports = router;