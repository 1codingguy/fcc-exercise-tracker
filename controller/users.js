// import the model defined
const User = require('../models/users')
const Exercise = require('../models/exercises')
const { getUsername, convertDate, createLogArray } = require('./helpers')

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

const createExercises = async (req, res) => {
  try {
    // retrieve the username with _id
    const { username, userId } = await getUsername(req, res)

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
    // optional query parameter
    const { from, to, limit } = req.query
    // console.log(from, to, limit)

    // retrieve the username with _id
    const { username, userId } = await getUsername(req, res)

    // userId is a must to add into the query
    const query = { userId }

    if (from) {
      query.date = { $gte: from }
    }
    if (to){
      query.date = {...query.date, $lte: to}
    }
  
    const exercise = await Exercise.find(query)
    // console.log(exercise)


    const count = exercise.length
    // limit is undefined if not specify
    const log = createLogArray(exercise, limit)

    res.status(200).json({ username, count, _id: userId, log })
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
