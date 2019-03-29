const express = require("express");
const app = express();
require("./services/passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const passport = require("passport");
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions
require("./routes/authRoutes")(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public'))
  app.get(/.*/, (req, res) => res.sendFile(__dirname + './public/index.html'))
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}!`));
