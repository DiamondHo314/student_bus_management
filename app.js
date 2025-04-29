const express = require('express');
const app = express();
const session = require('express-session')
const passport = require('./config/passport')

const indexRouter = require('./routes/indexRouter');
const registerRouter = require('./routes/registerRouter');
const loginRouter = require('./routes/loginRouter');
const adminRouter = require('./routes/adminRouter');
const ratingRoutes = require('./routes/rating'); 

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('public')); // Serve static files from the "public" folder

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use('/log-in', loginRouter);
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/admin', adminRouter);
app.use('/', ratingRoutes);

app.get('/thankyou', (req, res) => {
    res.render('thankyou');
});

// Handle undefined routes (404)
app.use((req, res) => {
    res.status(404).render('404'); // Render the 404.ejs page
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
}
);

