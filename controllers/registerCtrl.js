const db = require("../db/queries");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { username, password, phone } = req.body;
  console.log("Registering user:", username, password, phone);

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await db.registerNewUser(username, hashedPassword, phone);

    res.redirect("/log-in");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  registerUser,
};