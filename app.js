const express = require('express');
const app = express();
var cors = require('cors')
app.use(express.json())
require('dotenv').config()

const cookieParser = require('cookie-parser')

app.use(cookieParser());

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello nodejs');
});
const authRoute = require('./routes/auth.route');
const productRoute = require('./routes/product.route');
const orderRoute = require('./routes/order.route');
app.use('/auth', authRoute);
app.use('/product', productRoute);
app.use('/order', orderRoute);

app.listen(5000, () => {
    console.log('server start on 5000');
});


//image upload and multiple image upload multer
