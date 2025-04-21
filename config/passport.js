const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/queries'); 
const pool = require('../db/pool'); 
const bcrypt = require('bcryptjs');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserByUsername(username); 
    if(!user) {
        // user not found       
        return done(null, false, { message: "Incorrect username" });
      }
    // Check if the password matches

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
    // passwords do not match!
    return done(null, false, { message: "Incorrect password" })
    }
    return done(null, user); // this line is used to authenticate the user, important!
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log('user:', user);
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM Users WHERE user_id = $1", [id]); 
    console.log('id:', id);

    if (rows.length === 0) {
      console.log("No user found with ID:", id);
      return done(null, false);
    }

    console.log("user found", rows[0]);
    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;