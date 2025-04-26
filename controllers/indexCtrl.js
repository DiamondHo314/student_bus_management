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
  try {
    const userInfo = req.user  
    const users_bus_route = await db.getUsersBusRoute(userInfo.user_id)
    const busRoutes = await db.getAllStuff("Route"); // Fetch all bus routes
    //const usr_balance = await db.getUserBalance(userInfo.user_id)
    // no need for the above line, we can just do user.balance in index.ejs to get the users balance
    res.render("index", {
      user: req.user, 
      busRouteName: users_bus_route,
      busRoutes: busRoutes
    }) //user_balance: usr_balance });
    
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).send("Internal server error");
  }
}

//user boards the bus function
async function userBoardsBus(req, res) {
  try {
    const userId = parseInt(req.params.user_id); 
    const routeId = req.params.route_id; 
    const routePrice = parseFloat(req.params.price);

    console.log('params: ', req.params);
    
    const getUserBalance = await db.getUserBalance(userId)
    const userBalance = parseFloat(getUserBalance.balance); // Fetch user balance
    console.log('user balance:', userBalance);

    if (userBalance - routePrice < 0) {
      console.log('Insufficient balance'); // Log the error
      return res.status(400).send('<script>alert("Insufficient balance, add balance and try again"); window.location.href="/";</script>');
    }

      await db.userBoardsBus(userId, routeId) 
      res.redirect('/'); // Redirect to the user view after boarding the bus
  } catch (error) {
    console.error('Error boarding bus:', error);
    res.status(500).send('Internal server error');
  }
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
  getRatingView,
  userBoardsBus
}