const pool = require('./pool'); 

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM Users WHERE name = $1", [username]);
  return rows[0];
}

async function getUsersBusRoute(user_id) {
  const { rows } = await pool.query("select r.route_name from users u inner join bus b on u.bus_id = b.bus_id inner join route r on r.route_id = b.route_id where u.user_id = $1", [user_id])
  return rows[0]
}

async function getUserBalance(user_id) {
  const { rows } = await pool.query("select balance from users where user_id = $1", [user_id])
  return rows[0]
}

async function updateUserBalance(balance) {
  await pool.query('update users set balance = balance + $1', [balance])
}

//register new user
async function registerNewUser(username, password, phone) {
  await pool.query("INSERT INTO Users (name, password, phone) VALUES ($1, $2, $3)", [username, password, phone]);
}

//add new driver

//add new conductor

//update driver of a bus

//update conductor of a bus

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
}