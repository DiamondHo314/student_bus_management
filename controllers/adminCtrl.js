const db = require("../db/queries");

const getAdminView = (req, res) => {
    res.render("admin");
}

//this function just gets all the attribute names of tables
//so that i can set them as the table headers
function getColNames(obj){
    const colNames = []
    Object.keys(obj).forEach((key) => {
        if (key !== "password" & key !== "balance") {
            colNames.push(key);
        } 
    } )
    return colNames
}

//WOW SO CLEAN I AM SO COOL 
//basically dbfunction is the query function that we are passing in for example db.getAllBuses
//here, the query function is first being passed in here as an object, yes a function as an object
//then we are calling it in the function with the () operator
//NAH ITS EVEN BETTER NOW, we just pass in table name for example "Bus"
//then we can just call db.getAllStuff(tableName) and it will call the function
//and title is the name of the table we are passing in for example "Buses"
async function renderEntityDetails(req, res, title, tableName, pk) {
    try {
        const data = await db.getAllStuff(tableName); 
        const idsOfTablesObjs = await db.getAllIdFromTable(pk, tableName); //gets all pk from table, but as object at first
        const idsOfTables = idsOfTablesObjs.map(obj => obj[pk]); // then extract the IDs from the objects
        const idColumn = tableName === "Users" ? "user_id" : tableName === "Ratings" ? "rating_id" : tableName === "Bus" ? "bus_id" : tableName === "Driver" ? "driver_id" : tableName === "Conductor" ? "conductor_id" : tableName === "Route" ? "route_id" : null;
       
        res.render("entityDetails", {
            title: title,
            rowVals: data,
            colNames: getColNames(data[0]), 
            primaryKeys: idsOfTables,
            tableName: tableName,
            idColumn: idColumn,
        });
    } catch (error) {
        console.error(`Error fetching ${title.toLowerCase()}:`, error);
        res.status(500).send("Internal server error");
    }
}

const getAllBuses = (req, res) => renderEntityDetails(req, res,  "Buses", "Bus", 'bus_id');
const getAllConductors = (req, res) => renderEntityDetails(req, res,  "Conductors", "Conductor", "conductor_id");
const getAllDrivers = (req, res) => renderEntityDetails(req, res, "Drivers", "Driver", "driver_id");
const getAllRoutes = (req, res) => renderEntityDetails(req, res,  "Routes", "Route", "route_id");
const getAllRatings = (req, res) => renderEntityDetails(req, res, "Ratings", "Ratings", "rating_id");
const getAllUsers = (req, res) => renderEntityDetails(req, res,  "Users", "Users", "user_id");

//handling delete requests
async function adminDeleteRow(req, res) {
    const tableName = req.params.tableName;
    const given_id = req.params.primaryKeys;
    const id = tableName === "Users" ? "user_id" : tableName === "Ratings" ? "rating_id" : tableName === "Bus" ? "bus_id" : tableName === "Driver" ? "driver_id" : tableName === "Conductor" ? "conductor_id" : tableName === "Route" ? "route_id" : null;

    try {
        await db.deleteRow(tableName, id, given_id);
        res.redirect(`/admin/${tableName}`);
    } catch (error) {
        console.error(`Error deleting ${tableName}:`, error);
        res.status(500).send("Internal server error");
    }
}

async function updateTableValue(req, res) {
    const tableName = req.params.tableName;
    const columnName = req.params.col;
    const idColumn = tableName === "Users" ? "user_id" : tableName === "Ratings" ? "rating_id" : tableName === "Bus" ? "bus_id" : tableName === "Driver" ? "driver_id" : tableName === "Conductor" ? "conductor_id" : tableName === "Route" ? "route_id" : null;
    const idValue = req.params.primaryKeys;
    const newValue = req.query.newValue; // Assuming the new value is passed as a query parameter

    if (columnName.includes("id")) {
        const extractedTableName = columnName.split("_")[0]; // Extract the table name from the column name
        const result = await db.getAllStuffById(extractedTableName, columnName, newValue)
        if(result.length != 1){
            console.log('id not found in table:', extractedTableName);
            return res.status(400).send('<script>alert("ID does not exist"); window.location.href="/admin";</script>');
        }
    }
    // why did this take me so long

    console.log('newValue:', newValue);
    console.log('columnName:', columnName);

    //console.log('req query:', req.query);
    //console.log('req.params:', req.params);

    try {
        await db.updateColumnValueOfTable(tableName, columnName, newValue, idColumn, idValue);
        res.redirect(`/admin/${tableName}`);
    } catch (error) {
        console.error(`Error updating ${tableName}:`, error);
        res.status(500).send("Internal server error");
    }
    
}

//get add staff page
async function getAddNew(req, res) {
    try {
        const tablename = req.params.tableName
        const data = await db.getAllStuff(tablename)
        const colnames = getColNames(data[0])
        console.log('column anames:', colnames)
        console.log('testing query string:', colnames.join(', '))

        console.log('req params of getaddstaff:', req.params)
        res.render('addNew', {
            tableName : tablename,
            colNames : colnames,
        })
    } catch (error) {
        console.log(error)
    }
}

//add new staff
async function addNew(req, res){
    try {
        const tablename = req.params.tableName
        console.log('req body of addnew:', req.body)
        const values = Object.values(req.body)
        console.log('values:', values)
        const colnames = Object.keys(req.body)

        await db.insertIntoTable(tablename, colnames, values)

        res.redirect(`/admin/${tablename}`)
    } catch (error) {
        console.log(error)
    }
}

function ensureAdminAuthenticated(req, res, next) {
    if (req.isAuthenticated() && req.user && req.user.role === 'admin') {
        return next(); // User is authenticated and has the 'admin' role
    }
    res.redirect('/log-in'); // Redirect to login if not authenticated
}


module.exports = {
    getAdminView,
    getAllBuses,
    getAllRatings,
    getAllDrivers,
    getAllConductors,
    getAllRoutes,
    getAllUsers,
    adminDeleteRow,
    updateTableValue, 
    addNew,
    getAddNew,
    ensureAdminAuthenticated,
}