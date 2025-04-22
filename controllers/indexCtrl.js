const passport = require('../config/passport')
const db = require('../db/queries')

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // user is authenticated, proceed to the next middleware or route handler
  }
  res.redirect('/log-in'); // redirect to the login page if not authenticated
}

async function getUserView(req, res) {
  const userInfo = req.user  
  console.log("User info:", req.user);
  const users_bus_route = await db.getUsersBusRoute(userInfo.user_id)
  //const usr_balance = await db.getUserBalance(userInfo.user_id)
  // no need for the above line, we can just do user.balance in index.ejs to get the users balance
  res.render("index", { user: req.user, busRouteName: users_bus_route}) //user_balance: usr_balance });
}

module.exports = {
  getUserView,
  ensureAuthenticated
}