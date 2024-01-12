require('dotenv').config();

const mongoose = require('mongoose');

const { DB_URI } = process.env;
const uri = DB_URI;

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('********* CONEXIÓN CORRECTA *******');
	})
	.catch((err) => {
		console.log('********* ERROR DE CONEXIÓN *******');
		console.error(err);
	});
