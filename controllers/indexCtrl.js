const passport = require('../config/passport')
const db = require('../db/queries')

async function getUserView(req, res) {
  const userInfo = req.user  
  console.log("User info:", req.user);
  //const users_bus_route = await db.getUsersBusRoute(userInfo.user_id)
  //const usr_balance = await db.getUserBalance(userInfo.user_id)
  res.render("index", { user: req.user }) //, busRouteName: users_bus_route, user_balance: usr_balance });
}

const logIn = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log("Error during authentication:", err);
      return next(err); // Pass errors to the error handler
    }
    if (!user) {
      console.log("Authentication failed:", info.message);
      return res.redirect("/"); // Redirect on failure
    }
    req.logIn(user, (err) => {
      if (err) {
        console.log("Error during login:", err);
        return next(err); // Pass errors to the error handler
      }
      return res.redirect("/"); // Redirect on success
    });
  })(req, res, next); // Invoke the middleware
};

const logOut = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err); // Pass errors to the error handler
    }
    res.redirect("/"); // Redirect after logout
  });
}

module.exports = {
  getUserView,
  logIn,
  logOut,
}