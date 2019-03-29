const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/secret");
    }
  );

  app.get("/secret", (req, res) => {
    if (req.user) {
      res.json({ msg: "You have reached the secret route", user: req.user });
    } else {
      res.json({ err: "no user found" });
    }
  });
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/auth/google");
  });

};
