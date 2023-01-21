const { pool } = require("../config/db.config");
const runQuery = require('../config/query.config');
exports.create = async (req, res) => {
    try {
        const status = 'pending';
        const query = "INSERT INTO `orders` (`user_id`, `product_id`, `order_code`, `order_date`, `shipped_date`, `order_status`, `require_date`) VALUES (" +
            pool.escape(req.user.id) +
            ", " +
            pool.escape(req.body.product_id) +
            ", " +
            pool.escape(req.body.order_code) +
            ", " +
            pool.escape(req.body.order_date) +
            ", " +

            pool.escape(req.body.shipped_date) +
            ", " +
            pool.escape(status) +
            ", " +
            pool.escape(req.body.require_date) + ")";
        const orderInsert = await runQuery.runQuery(query);
        res.status(201).json({ message: 'Order inserted successfully!', data: orderInsert.data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something is wrong!' });
    }
}
exports.getAll = async (req, res) => {
    try {
        const role = req.user.role;
        let checkQuery = '';
        if (role == 'admin') {
            checkQuery = "SELECT * from `orders`";
        } else {
            checkQuery = "SELECT * from `orders` where user_id=" + pool.escape(req.user.id);
        }
        const products = await runQuery.runQuery(checkQuery);
        if (products.data) {
            res.status(200).json({ message: 'order lists', data: products.data });
        } else {
            res.status(400).json({ message: 'something is wrong!', data: [] });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something is wrong!' });
    }
}


exports.get = async (req, res) => {
    try {
        const role = req.user.role;
        if (role == 'user') {
            let checkOrderQuery = "SELECT * from `orders`  where id=" + pool.escape(req.params.id) + " AND user_id=" + pool.escape(req.user.id) + " limit 1";
            const checkOrder = await runQuery.runQuery(checkOrderQuery);
            if (checkOrder.data && checkOrder.data.length == 0) {
                return res.status(400).json({ message: 'order not found!', data: [] });
            }
        }

        const checkQuery = "SELECT * from `orders` where id=" + pool.escape(req.params.id) + " limit 1";
        const orders = await runQuery.runQuery(checkQuery);
        if (orders.data && orders.data.length > 0) {
            res.status(200).json({ message: 'get order', data: orders.data[0] });
        } else {
            res.status(400).json({ message: 'order not found!', data: [] });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something is wrong!' });
    }
}

exports.update = async (req, res) => {
    try {

        const role = req.user.role;
        if (role == 'user') {
            let checkOrderQuery = "SELECT * from `orders`  where id=" + pool.escape(req.params.id) + " AND user_id=" + pool.escape(req.user.id) + " limit 1";
            const checkOrder = await runQuery.runQuery(checkOrderQuery);
            if (checkOrder.data && checkOrder.data.length == 0) {
                return res.status(400).json({ message: 'order not found!', data: [] });
            }
        }

        const updateQueryData = `UPDATE orders SET 
        order_code=` + pool.escape(req.body.order_code) +
            `,order_date=` + pool.escape(req.body.order_date) +
            `,shipped_date=` + pool.escape(req.body.shipped_date) +
            `,order_status=` + pool.escape(req.body.order_status) +
            `,require_date=` + pool.escape(req.body.require_date) + ` where id=${pool.escape(req.params.id)};`
        const orderUpdate = await runQuery.runQuery(updateQueryData);
        if (orderUpdate.data) {
            res.status(200).json({ message: 'Order updated successfully!', data: orderUpdate.data });
        } else {
            res.status(400).json({ message: 'Order not updated!', data: [] });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something is wrong!' });
    }
}
exports.delete = async (req, res) => {
    try {
        const role = req.user.role;
        if (role == 'user') {
            let checkOrderQuery = "SELECT * from `orders`  where id=" + pool.escape(req.params.id) + " AND user_id=" + pool.escape(req.user.id) + " limit 1";
            const checkOrder = await runQuery.runQuery(checkOrderQuery);
            if (checkOrder.data && checkOrder.data.length == 0) {
                return res.status(400).json({ message: 'order not found!', data: [] });
            }
        }
        var deleteQuery = `DELETE FROM orders WHERE id=${pool.escape(req.params.id)};`
        const productDelete = await runQuery.runQuery(deleteQuery);
        if (productDelete.data) {
            res.status(200).json({ message: 'order deleted successfully!', data: [] });
        } else {
            res.status(400).json({ message: 'order not deleted!', data: [] });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something is wrong!' });
    }
}