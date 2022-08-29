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

const getUsername = async (req, res) => {
  try {
    const { _id: userId } = req.params
    const user = await User.find({ _id: userId })
    if (user.length === 0) return res.status(404).send('userId not found')
    return { username: user[0].username, userId }
  } catch (error) {
    res.status(500).json(error)
  }
}

const convertDate = dateString => {
  return new Date(dateString).toDateString()
}

const createExercises = async (req, res) => {
  try {
    // retrieve the username with _id
    const { username, userId } = await getUsername(req, res)
    console.log(username, userId)

    // destructure description, duration and date from form
    let { description, duration, date } = req.body

    // convert custom date to ISO string if date isn't undefined
    date = date && convertDate(date)

    // create an entry to DB
    const exercise = await Exercise.create({
      userId,
      description,
      duration,
      date,
    })

    // use the returned date string because there's always one
    // turn the date string into target format
    const returned_date = convertDate(exercise.date)

    res.status(200).json({
      _id: userId,
      username,
      date: returned_date,
      duration,
      description,
    })
  } catch (error) {
    res.status(500).json(error)
  }
}

const getLogs = async (req, res) => {
  try {
    // retrieve the username with _id
    const { username, userId } = await getUsername(req, res)

    const exercise = await Exercise.find({ userId })

    const date = convertDate(exercise[0].date)
    console.log(date)

    res.send('getLogs')
  } catch (error) {
    res.status(500).json(error)
  }
}

// helper functions which are not part of the requirement
const deleteUsers = async (req, res) => {
  try {
    const result = await User.deleteMany({})
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteAllExercises = async (req, res) => {
  try {
    const result = await Exercise.deleteMany({})
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  createUser,
  getUsers,
  deleteUsers,
  createExercises,
  getLogs,
  deleteAllExercises,
}
