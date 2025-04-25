const express = require('express')
const indexRouter = express.Router()
const idxController = require('../controllers/indexCtrl')

indexRouter.get('/', idxController.ensureAuthenticated, idxController.getUserView)
indexRouter.post('/update-balance', idxController.ensureAuthenticated, idxController.updateBalance)
indexRouter.get('/ratings',idxController.ensureAuthenticated, idxController.getRatingView)

//when user boards the bus
indexRouter.get('/buy-ticket/:route_id/:price/:user_id', idxController.ensureAuthenticated, idxController.userBoardsBus)

module.exports = indexRouter