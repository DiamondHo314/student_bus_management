const express = require('express')
const indexRouter = express.Router()
const idxController = require('../controllers/indexCtrl')

indexRouter.get('/', idxController.getUserView)
indexRouter.post('/log-in', idxController.logIn)
indexRouter.get('/log-out', idxController.logOut)

module.exports = indexRouter