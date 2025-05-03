const express = require('express')
const loginRouter = express.Router()
const loginController = require('../controllers/loginCtrl')

loginRouter.get('/', loginController.getLogin)
loginRouter.post('/', loginController.logIn)
loginRouter.get('/log-out', loginController.logOut)

//admin login routes
loginRouter.get('/admin', loginController.getAdminLogin)
loginRouter.post('/admin', loginController.handleLoginAdmin)

module.exports = loginRouter