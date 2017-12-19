const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000
const checkForSession = require('./middleware/checkForSession');
const swagController = require('./controllers/swag_controller');
const authController = require('./controllers/auth_controller');
const cartController = require('./controllers/cart_controller');
const searchController = require('./controllers/search_controller');

app.use(bodyParser.json());
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));

app.get('/api/swag', swagController.read);
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);
app.post('/api/cart', cartController.add);
app.post('/api/cart/checkout', cartController.checkout);
app.delete('/api/cart', cartController.delete);
app.get('/api/search', searchController.search);



app.listen(port, ()=>console.log(`That's no moon! It's a port ${port}`))