var jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        if (!token) {
            return res.status(403).send({
                message: "No token provided",
            });
        }
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized",
                });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(401).json({ message: 'unauthorized access', data: [] });
    }
}