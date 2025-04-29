const db = require('../db/queries'); // Import database queries

exports.submitRating = async (req, res) => {
    const { bus, driver_rating, conductor_rating, comment } = req.body; 
    const username = req.user.name; 

    try {  
        console.log('Form data received:', req.body);
        console.log('Username from req.user:', username);

        // Get driver and conductor IDs for the selected bus
        const busDetails = await db.getDriverAndConductor(bus);

        if (!busDetails) {
            console.error('Invalid bus selected');
            return res.status(400).send('Invalid bus selected.');
        }

        const { driver_id, conductor_id } = busDetails;

        // Add the rating to the database
        await db.addRating(username, driver_id, conductor_id, driver_rating, conductor_rating, comment);
        console.log('THIS IS THE USERNAME', username);
        console.log('Rating successfully inserted');
        res.redirect('/thankyou'); // Redirect to a thank-you page
    } catch (error) {
        console.error('Error submitting rating:', error);
        res.status(500).send('Internal server error');
    }
};