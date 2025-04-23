const { get } = require('../routes/registerRouter');
const pool = require('./pool'); 

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM Users WHERE name = $1", [username]);
  return rows[0];
}

async function getUsersBusRoute(user_id) {
  const { rows } = await pool.query("SELECT r.route_name FROM Users u INNER JOIN Bus b ON u.bus_id = b.bus_id INNER JOIN Route r ON r.route_id = b.route_id WHERE u.user_id = $1", [user_id])
  return rows[0]
}

async function getUserBalance(user_id) {
  const { rows } = await pool.query("SELECT balance FROM users WHERE user_id = $1", [user_id])
  return rows[0]
}

async function updateUserBalance(user_id, balance) {
  await pool.query('UPDATE Users SET balance = balance + $1 WHERE user_id = $2', [balance, user_id])
}

//register new user
async function registerNewUser(username, password, phone) {
  await pool.query("INSERT INTO Users (name, password, phone) VALUES ($1, $2, $3)", [username, password, phone]);
}

//add new driver
async function addNewDriver(driverid, phone, name){
  await pool.query("INSERT INTO Driver (driver_id,phone,name) VALUES ($1, $2, $3)",[driverid,phone,name]);
}
//add new conductor
async function addNewConductor(id, phone, name){
  await pool.query("INSERT INTO Conductor (conductor_id,phone,name) VALUES ($1, $2, $3)",[id,phone,name]);
}
//update driver of a bus
async function updateDriver(driverid, busid){
  await pool.query("UPDATE Bus SET driver_id = $1 WHERE bus_id= $2",[driverid,busid]);
}
//update conductor of a bus
async function updateConductor(id, busid){
  await pool.query("UPDATE Bus SET conductor_id = $1 WHERE bus_id= $1",[id,busid]);
}
//user boards the bus
async function userBoardsBus(studentid,busid) {
  await pool.query("UPDATE Bus SET capacity = capacity -1 WHERE bus_id = $1",[busid])
  await pool.query("UPDATE Users SET bus_id = $1 WHERE user_id=$2",[busid, studentid])
  const price = await pool.query("SELECT price FROM Bus b INNER JOIN Route r ON b.route_id = r.route_id WHERE bus_id = $1",[busid])
  await pool.query("UPDATE Users SET balance = balance - $1 WHERE user_id = $2",[price,studentid])
  
}
//delete a user
async function deleteUser(user_id) {
  await pool.query("DELETE FROM Users WHERE user_id = $1", [user_id]);
}
//delete a driver
async function deleteDriver(driver_id) {
  await pool.query("DELETE FROM Driver WHERE driver_id = $1", [driver_id]);
}
//delete a conductor
async function deleteConductor(conductor_id) {
  await pool.query("DELETE FROM Conductor WHERE conductor_id = $1", [conductor_id]);
}
//get driver_id and conductor_id of a bus
async function getDriverAndConductor(bus_id) {
  const { rows } = await pool.query("SELECT driver_id, conductor_id FROM Bus WHERE bus_id = $1", [bus_id]);
  return rows[0];
}
//add rating given by a user (Rating deyar shomoy driver_id r conductor_id auto filled-up hobe? uporer query ta diye?)
async function addRating(username, driver_id, conductor_id, driver_rating, conductor_rating) {
  await pool.query("INSERT INTO Ratings (username, driver_id, conductor_id, driver_rating, conductor_rating) VALUES ($1, $2, $3, $4, $5)", [username, driver_id, conductor_id, driver_rating, conductor_rating]);
}
//add new Route
async function addNewRoute(routeid, routename, price){
  await pool.query("INSERT INTO Route (route_id, route_name, price) VALUES ($1, $2, $3)",[routeid,routename,price]);
}
//add new Bus
async function addNewBus(busid, capacity, driverid, conductorid, routeid){
  await pool.query("INSERT INTO Bus (bus_id, capacity, driver_id, conductor_id, route_id) VALUES ($1, $2, $3, $4, $5)",[busid,capacity,driverid,conductorid,routeid]);
}
//delete a bus
async function deleteBus(bus_id) {
  await pool.query("DELETE FROM Bus WHERE bus_id = $1", [bus_id]);
}
//delete a route
async function deleteRoute(route_id) {
  await pool.query("DELETE FROM Route WHERE route_id = $1", [route_id]);
}
//get all buses and routes
async function getAllBusAndRoutes() {
  const { rows } = await pool.query(
    "SELECT b.bus_id, r.route_name, r.price FROM Bus b INNER JOIN Route r ON b.route_id = r.route_id"
  );
  return rows;
}

//get all buses
async function getAllBuses() {
 const { rows } = await pool.query("SELECT * FROM Bus");
 return rows;
}

//get all drivers
async function getAllDrivers() {
 const { rows } = await pool.query("SELECT * FROM Driver");
 return rows;
}

//get all conductors
async function getAllConductors() {
 const { rows } = await pool.query("SELECT * FROM Conductor");
 return rows;
}

//get all routes
async function getAllRoutes() {
 const { rows } = await pool.query("SELECT * FROM Route");
 return rows;
}

//get all ratings
async function getAllRatings() {
 const { rows } = await pool.query("SELECT * FROM Ratings");
 return rows;
}

//get all users
async function getAllUsers() {
 const { rows } = await pool.query("SELECT * FROM Users");
 return rows;
}


module.exports = {
    getUserByUsername,
    getUsersBusRoute,
    getUserBalance,
    updateUserBalance,
    registerNewUser,
    addNewDriver,
    addNewConductor,
    updateDriver,
    updateConductor,
    userBoardsBus,
    deleteUser,
    deleteDriver,
    deleteConductor,
    getDriverAndConductor,
    addRating,
    addNewRoute,
    addNewBus,
    deleteBus,
    deleteRoute,
    getAllBusAndRoutes,
    getAllBuses,
    getAllDrivers,
    getAllConductors,
    getAllRoutes,
    getAllRatings,
    getAllUsers,
   
}