const express = require('express')
const loginRouter = express.Router()
const loginController = require('../controllers/loginCtrl')

loginRouter.get('/', loginController.getLogin)
loginRouter.post('/', loginController.logIn)
loginRouter.get('/log-out', loginController.logOut)

module.exports = loginRouter