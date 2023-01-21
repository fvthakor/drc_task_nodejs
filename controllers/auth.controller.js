const { pool } = require("../config/db.config");
const bcrypt = require('bcrypt');
const runQuery = require('../config/query.config');
var jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const checkQuery = "SELECT id from `drc_task`.`users` WHERE mobile=" + req.body.mobile + " LIMIT 1";
        const checkUser = await runQuery.runQuery(checkQuery);
        console.log(checkUser);
        if (checkUser.data && checkUser.data.length > 0) {
            return res.status(400).json({ message: 'user already exits!', data: null })
        }
        const hash = bcrypt.hashSync(req.body.password, 10);
        const query = "INSERT INTO `drc_task`.`users` (`name`, `mobile`, `password`) VALUES (" +
            pool.escape(req.body.name) +
            ", " +
            pool.escape(req.body.mobile) +
            ", " +
            pool.escape(hash) + ")";
        const userInsert = await runQuery.runQuery(query);
        res.status(201).json({ message: 'Register user', data: userInsert.data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something is wrong!' });
    }
}

exports.login = async (req, res) => {
    try {
        const checkQuery = "SELECT * from `users` WHERE mobile=" + req.body.mobile + " LIMIT 1";
        const checkUser = await runQuery.runQuery(checkQuery);
        if (checkUser.data && checkUser.data.length > 0) {
            const user = checkUser.data[0]
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const userdata = {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    id: user.id,
                }
                var token = jwt.sign(userdata, process.env.JWT_KEY);
                const data = { ...user, token: token }
                res.status(200).json({ message: 'user login', data: data });
            } else {
                res.status(401).json({ message: 'Email or password is wrong', data: [] });
            }
        } else {
            res.status(401).json({ message: 'Email or password is wrong', data: [] });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something is wrong!' });
    }
}