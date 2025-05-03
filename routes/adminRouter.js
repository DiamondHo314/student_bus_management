const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminCtrl');

adminRouter.use(adminController.ensureAdminAuthenticated) //this is checked before handling every route
 
adminRouter.get('/', adminController.getAdminView)
adminRouter.get('/Bus', adminController.getAllBuses)
adminRouter.get('/Ratings', adminController.getAllRatings)
adminRouter.get('/Driver', adminController.getAllDrivers)
adminRouter.get('/Conductor', adminController.getAllConductors)
adminRouter.get('/Route', adminController.getAllRoutes)
adminRouter.get('/Users', adminController.getAllUsers)

adminRouter.get('/:tableName/addNew', adminController.getAddNew)
adminRouter.post('/:tableName/addNew', adminController.addNew)

//delete requests
adminRouter.get('/delete/:tableName/:primaryKeys', adminController.adminDeleteRow)

//update requests
adminRouter.get('/:tableName/edit/:col/:primaryKeys', adminController.updateTableValue)


module.exports = adminRouter;