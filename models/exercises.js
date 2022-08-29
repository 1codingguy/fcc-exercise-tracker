const mongoose = require('mongoose')

const ExerciseSchema = mongoose.Schema({
  userId: String,
  description: { type: String, required: true },
  duration: {type: Number, required: true},
  date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Exercise', ExerciseSchema)
