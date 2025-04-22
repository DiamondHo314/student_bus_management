const express = require('express')
const indexRouter = express.Router()
const idxController = require('../controllers/indexCtrl')

indexRouter.get('/', idxController.ensureAuthenticated, idxController.getUserView)
indexRouter.post('/update-balance', idxController.ensureAuthenticated, idxController.updateBalance)

module.exports = indexRouter