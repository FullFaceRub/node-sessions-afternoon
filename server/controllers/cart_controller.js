const swag = require('../models/swag');

module.exports = {
    add: (req, res, next) => {
        const { id } = req.query;
        let { cart } = req.session.user;

        const index = cart.findIndex(swag => swag.id == id)

        if (index === -1) {
            console.log (id)
            const newSwag = swag.find(swag => swag.id == id)
            console.log(newSwag);
            cart.push(newSwag)
            req.session.user.total += newSwag.price;
        }
        res.status(200).send(req.session.user)
    },
    delete: (req, res, next) => {
        const { id } = req.query;
        const { cart } = req.session.user;
        if (swag) {
            const index = cart.findIndex(swag => swag.id == id)
            
            req.session.user.total -= cart[index].price;

            cart.splice(index, 1)
        }
        res.status(200).send(req.session.user);

    },
    checkout: (req, res, next) => {

        req.session.user.cart = [];
        req.session.user.total = 0;
        res.status(200).send(req.session.user)
    }
}