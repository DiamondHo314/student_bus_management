const passport = require('../config/passport')
const db = require('../db/queries')

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // user is authenticated, proceed to the next middleware or route handler
  }
  res.redirect('/log-in'); // redirect to the login page if not authenticated

}

async function updateBalance(req, res) {
  try {
    const userId = req.user.user_id; 
    const { amount } = req.body    

    console.log("User ID:", userId);
    console.log("Amount to update:", amount);
   

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).send('Invalid amount');
    }

    await db.updateUserBalance(userId, amount);     
    res.status(200).send('Balance updated successfully');
    //200 status needed so that updatBalance function in index.ejs can work
    //we need this 200 to because we set 'if(response.ok)', 200 status sets this as true

  } catch (error) {
    console.error('Error updating balance:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
}

async function getUserView(req, res) {
  const userInfo = req.user  
  console.log("User info:", req.user);
  const users_bus_route = await db.getUsersBusRoute(userInfo.user_id)
  //const usr_balance = await db.getUserBalance(userInfo.user_id)
  // no need for the above line, we can just do user.balance in index.ejs to get the users balance
  res.render("index", { user: req.user, busRouteName: users_bus_route}) //user_balance: usr_balance });
}

async function getRatingView(req, res) {
  try {
    const busesAndRoutes = await db.getAllBusAndRoutes(); // Fetch buses and routes
    res.render("ratings", { busesAndRoutes }); // Pass data to the view
  } catch (error) {
    console.error("Error fetching buses and routes:", error);
    res.status(500).send("Internal server error");
  }
}
module.exports = {
  getUserView,
  ensureAuthenticated,
  updateBalance,
  getRatingView
}