/** @format */

const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();

app.use(express.static(__dirname + '/public'));

const hbs = expressHandlebars.create({
	extname: 'hbs',
	defaultLayout: 'layout',
	layoutsDir: __dirname + '/views/layouts',
	partialsDir: __dirname + '/views/partials',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/:page', (req, res) => {
	let banners = {
		blog: 'Our Blog',
		category: 'Shop Category',
		cart: 'Shop Cart',
		checkout: 'Product Checkout',
		confirmation: 'Order Confirmation',
		contact: 'Contact Us',
		login: 'Login',
		register: 'Register',
		single_blog: 'Blog Detail',
		single_product: 'Shop Single',
		tracking_order: 'Order Tracking',
	};
	let page = req.params.page;
	let contentBanner = page.replace('-', '_');
	res.render(page, { banner: banners[contentBanner] });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`App is running on port = ${port}`);
});
