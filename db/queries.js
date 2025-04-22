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
  await pool.query("UPDATE Bus SET conductor_id = $1 WHERE bus_id= $2",[id,busid]);
}
//delete a user

//delete a driver

//delete a conductor

//add rating given by a user

//add new route

//add new bus


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
}