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
      res.redirect("/api/secret");
    }
  );

  app.get("/api/secret", (req, res) => {
    if (req.user) {
      res.json({ msg: "You have reached the secret route", user: req.user });
    } else {
      res.json({ err: "No user found" });
    }
  });
  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/auth/google");
  });

};
