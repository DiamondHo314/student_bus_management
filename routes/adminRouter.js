const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminCtrl');
 
adminRouter.get('/', adminController.getAdminView)
adminRouter.get('/buses', adminController.getAllBuses)
adminRouter.get('/ratings', adminController.getAllRatings)

module.exports = adminRouter;