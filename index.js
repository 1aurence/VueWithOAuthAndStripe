const express = require("express");
const app = express();
require("./services/passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const passport = require("passport");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions
require("./routes/authRoutes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}!`));
