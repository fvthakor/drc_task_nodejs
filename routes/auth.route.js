const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

const validate = require('../middleware/validation.middleware');
const authController = require('../controllers/auth.controller');

const registerValidation = validate([
    body('name').notEmpty(),
    body('mobile').isNumeric().notEmpty().isLength({ min: 10, max: 10 }),
    body('password').notEmpty().isLength({ min: 6 })
])
router.post('/register', [registerValidation], authController.register);
router.post('/login', authController.login);
module.exports = router;
// module.exports = (app) => {
//     app.
// }