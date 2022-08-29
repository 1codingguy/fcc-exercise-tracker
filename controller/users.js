// import the model defined
const User = require('../models/users')
const Exercise = require('../models/exercises')

const createUser = async (req, res) => {
  try {
    const user = await User.create({ username: req.body.username })
    const { username, _id } = user
    res.status(200).json({ username, _id })
  } catch (error) {
    res.status(500).json(error)
  }
}

const getUsers = async (req, res) => {
  try {
    const query = await User.find({}).select(['username', '_id'])
    res.status(200).json(query)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteUsers = async (req, res) => {
  try {
    const result = await User.deleteMany({})
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}

const createExercises = async (req, res) => {
  try {
    const { _id } = req.params
    const user = await User.find({ _id })
    console.log(user)
    if (user.length === 0) return res.status(404).send('_id not found')

    const { username } = user[0]

    // destructure description, duration and date from form
    const { description, duration, date } = req.body

    // create an entry
    const exercise = await Exercise.create({ _id, description, duration, date })

    const { date: returned_date } = exercise

    console.log(exercise)

    res
      .status(200)
      .json({
        _id,
        username,
        date: date || returned_date,
        duration,
        description,
      })
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  createUser,
  getUsers,
  deleteUsers,
  createExercises,
}
