// import the model defined
const User = require('../models/users')

const createUser = async (req, res) => {
  try {
    const user = await User.create({ username: req.body.username })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({})
    res.status(200).json(allUsers)
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

module.exports = {
  createUser,
  getUsers,
  deleteUsers,
}
