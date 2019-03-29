const Knex = require('knex')
const connection = require('../knexfile')
const { Model } = require('objection')

const knexConnection = Knex(connection)

Model.knex(knexConnection)

class User extends Model {
  static get tableName() {
    return "users";
  }
}

module.exports = User;

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const UserSchema = new Schema({
//   googleId: String
// });

// module.exports = mongoose.model("users", UserSchema);
