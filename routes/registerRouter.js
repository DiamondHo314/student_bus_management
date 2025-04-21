const express = require('express');
const registerRouter = express.Router();
const registerController = require('../controllers/registerCtrl');

registerRouter.get('/', (req, res) => {
    res.render('registerUser')
});

registerRouter.post('/', registerController.registerUser);

module.exports = registerRouter;
