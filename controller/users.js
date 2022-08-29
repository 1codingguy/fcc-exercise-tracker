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



const createExercises = async (req, res) => {
  try {
    const { _id: userId } = req.params
    const user = await User.find({ _id: userId })
    // console.log(user)
    if (user.length === 0) return res.status(404).send('userId not found')

    // there should only be one user, so user[0] should work
    const { username } = user[0]

    // destructure description, duration and date from form
    let { description, duration, date } = req.body
    // convert custom date to ISO string
    date = date && new Date(date).toISOString()

    // create an entry to DB
    const exercise = await Exercise.create({
      userId,
      description,
      duration,
      date,
    })

    // use the returned date string because there's always one
    // turn the date string into target format
    const returned_date = new Date(exercise.date).toDateString()

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
  // try {
  //   const { _id } = req.params
  //   const user = await User.find({ _id })
  //   console.log(user)
  //   if (user.length === 0) return res.status(404).send('user not found')

  //   const { username } = user[0]

  //   const exercise = await Exercise.find({ _id })

  //   const date = new Date(exercise[0].date).toDateString()
  //   console.log(date)



  //   res.send('getLogs')
  // } catch (error) {
  //   res.status(500).json(error)
  // }
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
