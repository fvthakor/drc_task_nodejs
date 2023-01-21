const { pool } = require("./db.config");

const runQuery = (query) => {
    return new Promise((resolve, reject) => {
        pool.query(query, (err, results) => {
            if (err) {
                console.log(err);
                return resolve({ message: "Something is wrong! ", data: null });
            }
            resolve({ data: results, message: '' });
        })
    })
}
module.exports = {
    runQuery
}