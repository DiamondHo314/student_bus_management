const db = require('../db/queries');

exports.submitRating = async (req, res) => {
    const { bus, driver_rating, conductor_rating } = req.body;

    try {
        console.log('Form data received:', req.body); // Debugging

        // Fetch the driver_id and conductor_id for the selected bus
        const busDetails = await db.getDriverAndConductor(bus);

        if (!busDetails) {
            console.error('Invalid bus selected');
            return res.status(400).send('Invalid bus selected.');
        }

        const { driver_id, conductor_id } = busDetails;

        // Insert a new rating into the Ratings table
        await db.addRating(req.user.name || 'test_user', driver_id, conductor_id, driver_rating, conductor_rating);

        console.log('Rating successfully inserted'); // Debugging
        res.redirect('/thankyou'); // Redirect to the thank you page
    } catch (error) {
        console.error('Error submitting rating:', error); // Debugging
        res.status(500).send('Internal Server Error');
    }
};