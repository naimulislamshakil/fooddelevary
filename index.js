const express = require('express');
const app = express();
const Port = process.env.PORT || 5000;
const cors = require('cors');
const colors = require('colors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import Route
const storeRoute = require('./Route/v1/store.route');
const productRoute = require('./Route/v1/Product.route');
const userRoute = require('./Route/v1/user.route');
const addToCartRoute = require('./Route/v1/AddToCart.route');
const paymentRoute = require('./Route/v1/payment.route');

// Add Meddilware
app.use(cors());
app.use(express.json());

// Add Database
mongoose
	.connect(
		`mongodb+srv://food:${process.env.DB_PASS}@cluster0.jqduyds.mongodb.net/?retryWrites=true&w=majority`
	)
	.then(() => console.log('Database connected successfully.'.red.bold))
	.catch((err) => console.log(err));

// CAll Route
app.use('/api/v1', storeRoute);
app.use('/api/v1', productRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', addToCartRoute);
app.use('/api/v1', paymentRoute);
app.use('/photo', express.static('images'));

// Home Route
app.get('/', (req, res) => {
	res.send('<h1>How Are You?</h1>');
});

// Any Route Not Found
app.use('*', (req, res) => {
	const { baseUrl } = req;

	res.send(`<h1>${baseUrl} Not Found!</h1>`);
});

app.listen(Port, () => {
	console.log(`Food Delivary App Is Running: ${Port}`.yellow.bold);
});
