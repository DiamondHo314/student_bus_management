const db = require("../db/queries");

const getAdminView = (req, res) => {
    res.render("admin");
}

//this function just gets all the attribute names of tables
//so that i can set them as the table headers
function getColNames(obj){
    const colNames = []
    Object.keys(obj).forEach((key) => {
        if (key !== "password") {
            colNames.push(key);
        } 
    } )
    return colNames
}

//WOW SO CLEAN I AM SO COOL 
//basically dbfunction is the query function that we are passing in for example db.getAllBuses
//here, the query function is first being passed in here as an object, yes a function as an object
//then we are calling it in the function with the () operator
//and title is the name of the table we are passing in for example "Buses"
async function renderEntityDetails(req, res, dbFunction, title) {
    try {
        const data = await dbFunction(); 
        //this () simply calls the function that we passed in as object at first
        //because db.getAllBuses won't call the function, but db.getAllBuses() will
        res.render("entityDetails", {
            title: title,
            rowVals: data,
            colNames: getColNames(data[0]), 
        });
    } catch (error) {
        console.error(`Error fetching ${title.toLowerCase()}:`, error);
        res.status(500).send("Internal server error");
    }
}

const getAllBuses = (req, res) => renderEntityDetails(req, res, db.getAllBuses, "Buses");
const getAllConductors = (req, res) => renderEntityDetails(req, res, db.getAllConductors, "Conductors");
const getAllDrivers = (req, res) => renderEntityDetails(req, res, db.getAllDrivers, "Drivers");
const getAllRoutes = (req, res) => renderEntityDetails(req, res, db.getAllRoutes, "Routes");
const getAllRatings = (req, res) => renderEntityDetails(req, res, db.getAllRatings, "Ratings");
const getAllUsers = (req, res) => renderEntityDetails(req, res, db.getAllUsers, "Users");


module.exports = {
    getAdminView,
    getAllBuses,
    getAllRatings,
    getAllDrivers,
    getAllConductors,
    getAllRoutes,
    getAllUsers,
}