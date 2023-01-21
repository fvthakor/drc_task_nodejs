const { pool } = require("../config/db.config");
const runQuery = require('../config/query.config');
const multer = require('multer');
var path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../images/'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])
    }
});

const multi_upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
}).array('uploadedImages', 2)

exports.uploadFile = async (req, res) => {
    multi_upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end();
            return;
        } else if (err) {
            // An unknown error occurred when uploading.
            if (err.name == 'ExtensionError') {
                res.status(400).send({ error: { message: err.message } }).end();
            } else {
                res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
            }
            return;
        }
        // console.log(req.files);
        const arrImages = [];
        for (let x of req.files) {
            const imageName = `images/${x.filename}`;
            const query = "INSERT INTO `images` (`product_id`, `image`) VALUES (" +
                pool.escape(req.params.id) +
                ", " +
                pool.escape(imageName) + ")";
            await runQuery.runQuery(query);
        }
        res.status(200).json({ message: 'image added successfully!' });
    })
}

exports.create = async (req, res) => {
    try {
        const query = "INSERT INTO `products` (`name`, `size`, `color`, `price`, `quantity`) VALUES (" +
            pool.escape(req.body.name) +
            ", " +
            pool.escape(req.body.size) +
            ", " +
            pool.escape(req.body.color) +
            ", " +
            pool.escape(req.body.price) +
            ", " +
            pool.escape(req.body.quantity) + ")";
        const productInsert = await runQuery.runQuery(query);
        res.status(201).json({ message: 'Product inserted successfully!', data: productInsert.data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something is wrong!' });
    }
}
exports.getAll = async (req, res) => {
    try {
        let { sortby, page } = req.query;

        const newPage = page ? page : 1;
        let limit = 10;
        if (newPage > 1) {
            limit = 12;
        }
        const skip = (newPage - 1) * limit;
        let checkQuery = '';
        if (sortby) {
            checkQuery = "SELECT * from `products` ORDER BY name " + sortby + " limit " + limit + " OFFSET " + skip;
        } else {
            checkQuery = "SELECT * from `products` limit " + limit + " OFFSET " + skip;
        }
        const products = await runQuery.runQuery(checkQuery);
        if (products.data) {
            const getCountQuery = "SELECT count(*) as total from `products`";
            const productCount = await runQuery.runQuery(getCountQuery);

            res.status(200).json({ message: 'product lists', data: products.data, total: productCount.data[0].total });
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
        const checkQuery = "SELECT * from `products` where id=" + pool.escape(req.params.id) + " limit 1";
        const products = await runQuery.runQuery(checkQuery);
        if (products.data && products.data.length > 0) {
            res.status(200).json({ message: 'get product', data: products.data[0] });
        } else {
            res.status(400).json({ message: 'product not found!', data: [] });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something is wrong!' });
    }
}

exports.update = async (req, res) => {
    try {
        const updateQueryData = `UPDATE products SET 
        name=` + pool.escape(req.body.name) +
            `,size=` + pool.escape(req.body.size) +
            `,color=` + pool.escape(req.body.color) +
            `,price=` + pool.escape(req.body.price) +
            `,quantity=` + pool.escape(req.body.quantity) + ` where id=${pool.escape(req.params.id)};`
        const productUpdate = await runQuery.runQuery(updateQueryData);
        if (productUpdate.data) {
            res.status(200).json({ message: 'Product updated successfully!', data: productUpdate.data });
        } else {
            res.status(400).json({ message: 'Product not updated!', data: [] });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something is wrong!' });
    }
}

//

exports.delete = async (req, res) => {
    try {
        var deleteQuery = `DELETE FROM products WHERE id=${pool.escape(req.params.id)};`
        const productDelete = await runQuery.runQuery(deleteQuery);
        if (productDelete.data) {
            res.status(200).json({ message: 'Product deleted successfully!', data: [] });
        } else {
            res.status(400).json({ message: 'Product not deleted!', data: [] });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something is wrong!' });
    }
}