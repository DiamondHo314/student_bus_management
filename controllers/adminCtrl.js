const db = require("../db/queries");

const getAdminView = (req, res) => {
    res.render("admin");
}

//function to show all buses in /admin/buses
async function getAllBuses(req, res) {
    try {
        const buses = await db.getAllBuses();
        res.render("buses", { buses: buses });
    } catch (error) {
        console.error("Error fetching buses:", error);
        res.status(500).send("Internal server error");
    }
}

//function to show all staffs in /admin/staffs

//function to show all routes in /admin/routes

//function to show all ratings in /admin/ratings
async function getAllRatings(req, res) {
    try {
        const ratings = await db.getAllRatings();
        res.render("allRatings", { ratings: ratings });
    } catch (error) {
        console.error("Error fetching ratings:", error);
        res.status(500).send("Internal server error");
    }
}

//function to show all users in /admin/users


module.exports = {
    getAdminView,
    getAllBuses,
    getAllRatings,

}