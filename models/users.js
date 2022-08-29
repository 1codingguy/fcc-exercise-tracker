const mongoose = require('mongoose')

// Schema begins with capital letter
const UserSchema = mongoose.Schema({
  username: String,
})

// by calling .model(), it's exporting a model
// seems the naming convention is same as Schema, singular noun begins with capital letter
module.exports = mongoose.model('User', UserSchema)