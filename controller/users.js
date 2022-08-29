// import the model defined
const User = require('../models/users')

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

module.exports = {
  createUser,
  getUsers,
  deleteUsers,
}
