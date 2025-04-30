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

//update driver of a bus
async function updateDriver(driverid, busid){
  await pool.query("UPDATE Bus SET driver_id = $1 WHERE bus_id= $2",[driverid,busid]);
}
//update conductor of a bus
async function updateConductor(id, busid){
  await pool.query("UPDATE Bus SET conductor_id = $1 WHERE bus_id= $1",[id,busid]);
}
//user boards the bus
async function userBoardsBus(studentid, routeid) {
  const { rows: busRows } = await pool.query("SELECT bus_id FROM Bus WHERE route_id = $1", [routeid]);
  const busid = busRows[0]?.bus_id;

  //await pool.query("UPDATE Bus SET capacity = capacity -1 WHERE bus_id = $1",[busid])
  await pool.query("UPDATE Users SET bus_id = $1 WHERE user_id=$2",[busid, studentid])

  const { rows: priceRows } = await pool.query("SELECT price FROM Route WHERE route_id = $1", [routeid]);
  const price = priceRows[0]?.price;

  console.log("price:",price);
  console.log("bus id:", busid);
  await pool.query("UPDATE Users SET balance = balance - $1 WHERE user_id = $2",[price ,studentid])
  
}


//get driver_id and conductor_id of a bus
async function getDriverAndConductor(bus_id) {
  const { rows } = await pool.query("SELECT driver_id, conductor_id FROM Bus WHERE bus_id = $1", [bus_id]);
  return rows[0];
}
//add rating given by a user (Rating deyar shomoy driver_id r conductor_id auto filled-up hobe? uporer query ta diye?)
async function addRating(username, driver_id, conductor_id, driver_rating, conductor_rating,comment) {
  await pool.query("INSERT INTO Ratings (username, driver_id, conductor_id, driver_rating, conductor_rating,comment) VALUES ($1, $2, $3, $4, $5,$6)", [username, driver_id, conductor_id, driver_rating, conductor_rating, comment]);
}

//get all buses and routes
async function getAllBusAndRoutes() {
  const { rows } = await pool.query(
    "SELECT b.bus_id, r.route_name, r.price FROM Bus b INNER JOIN Route r ON b.route_id = r.route_id"
  );
  return rows;
}


//get all stuff
async function getAllStuff(tableName) {
  const { rows } = await pool.query(`SELECT * FROM ${tableName}`);
  return rows;
}

//get all id from table
async function getAllIdFromTable(id, tableName) {
  const { rows } = await pool.query(`SELECT ${id} FROM ${tableName}`);
  return rows;
}

//update column value of row in given table
async function updateColumnValueOfTable(tableName, columnName, newValue, idColumn, idValue) {
  await pool.query(`UPDATE ${tableName} SET ${columnName} = $1 WHERE ${idColumn} = $2`, [newValue, idValue]);
}


//delete row
async function deleteRow(tableName, id, given_id) {
  await pool.query(`DELETE FROM ${tableName} WHERE ${id} = $1`, [given_id]);
}

async function getAllStuffById(tableName, idColumn, id) {
  const { rows } = await pool.query(`SELECT * FROM ${tableName} WHERE ${idColumn} = $1`, [id]);
  return rows;
}

async function insertIntoTable(tableName, columns, values) {
  const escapeVals = () => {
    return values.map((_, i) => `$${i + 1}`).join(", ")
  }

  const query = `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${escapeVals()})`;
  await pool.query(query, values);
}


module.exports = {
    getUserByUsername,
    getUsersBusRoute,
    getUserBalance,
    updateUserBalance,
    registerNewUser,
    updateDriver,
    updateConductor,
    userBoardsBus,
    deleteRow,
    getDriverAndConductor,
    addRating,
    getAllBusAndRoutes,
    getAllStuff,
    getAllIdFromTable,
    updateColumnValueOfTable,
    getAllStuffById,
    insertIntoTable
}