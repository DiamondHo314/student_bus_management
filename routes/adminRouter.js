const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminCtrl');
 
adminRouter.get('/', adminController.getAdminView)
adminRouter.get('/buses', adminController.getAllBuses)
adminRouter.get('/ratings', adminController.getAllRatings)
adminRouter.get('/drivers', adminController.getAllDrivers)
adminRouter.get('/conductors', adminController.getAllConductors)
adminRouter.get('/routes', adminController.getAllRoutes)
adminRouter.get('/users', adminController.getAllUsers)

//delete requests
adminRouter.get('/delete/:tableName/:primaryKeys', adminController.adminDeleteRow)

module.exports = adminRouter;