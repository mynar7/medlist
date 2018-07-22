require('dotenv').config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const passport = require('./auth/passport-setup');
const PORT = process.env.PORT || 3001;
const db = require('./models');
const authRouter = require('./routes/auth-routes');
const apiRouter = require('./routes/api-routes');
const app = express();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set up session cookies
app.use(cookieSession({
  name: process.env.COOKIE_NAME,
  maxAge: 1000 * 60 * 60 * 24,
  keys: [
    process.env.COOKIE_KEY1,
    process.env.COOKIE_KEY2,
    process.env.COOKIE_KEY3,
  ]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
//if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
//}

// Define API routes here
app.use('/api', apiRouter);
app.use('/auth', authRouter);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync({})
  .then(
    app.listen(PORT, () => {
      console.log(`🌎 ==> Server now on port ${PORT}!`);
    })
  );
