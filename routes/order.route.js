const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

const validate = require('../middleware/validation.middleware');
// const adminauth = require('../middleware/admin.middleware');
const adminauth = require('../middleware/auth.middleware');
const orderController = require('../controllers/order.controller');

const orderValidation = validate([
    body('product_id').notEmpty(),
    body('order_code').notEmpty(),
    body('order_date').notEmpty(),
    body('require_date').notEmpty(),
    body('shipped_date').notEmpty(),
    body('order_status').notEmpty()
])

const orderUpdateValidation = validate([
    body('order_code').notEmpty(),
    body('order_date').notEmpty(),
    body('require_date').notEmpty(),
    body('shipped_date').notEmpty(),
    body('order_status').notEmpty()
])
router.post('/', [adminauth, orderValidation], orderController.create);
router.get('/', [adminauth], orderController.getAll);
router.get('/:id', [adminauth], orderController.get);
router.put('/:id', [adminauth, orderUpdateValidation], orderController.update);
router.delete('/:id', [adminauth], orderController.delete);
module.exports = router;