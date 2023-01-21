const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

const validate = require('../middleware/validation.middleware');
const adminauth = require('../middleware/admin.middleware');
const auth = require('../middleware/auth.middleware');
const productController = require('../controllers/product.controller');

const productValidation = validate([
    body('name').notEmpty(),
    body('size').notEmpty(),
    body('color').notEmpty(),
    body('price').notEmpty().isDecimal(),
    body('quantity').isNumeric().notEmpty()
])


router.post('/', [adminauth, productValidation], productController.create);
router.get('/', [auth], productController.getAll);
router.get('/:id', productController.get);
router.put('/:id', [adminauth, productValidation], productController.update);
router.delete('/:id', [adminauth], productController.delete);
// router.post('/add-image/:id', [adminauth], productController.uploadFile);
router.post('/add-image/:id', productController.uploadFile);
module.exports = router;