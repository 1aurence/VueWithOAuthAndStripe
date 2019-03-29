// Update with your config settings.

const pg = require("pg");
const keys = require("./config/keys");
pg.defaults.ssl = true;
module.exports = {
  client: "pg",
  connection:
    process.env.NODE_ENV == "production"
      ? process.env.DATABASE_URL
      : keys.databaseURL
};
