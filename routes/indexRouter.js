const express = require('express')
const indexRouter = express.Router()
const idxController = require('../controllers/indexCtrl')

indexRouter.get('/', idxController.ensureAuthenticated, idxController.getUserView)

module.exports = indexRouter