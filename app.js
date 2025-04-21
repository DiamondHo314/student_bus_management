const express = require('express');
const app = express();
const session = require('express-session')
const passport = require('./config/passport')

const indexRouter = require('./routes/indexRouter');
const registerRouter = require('./routes/registerRouter');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session())

app.use('/', indexRouter)
app.use('/register', registerRouter)

app.listen(8080, () => {
    console.log('Server is running on port 8080');
}
);

