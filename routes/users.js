const express = require('express')
const router = express.Router()

const {
  createUser,
  getUsers,
  deleteUsers,
  createExercises,
} = require('../controller/users')

// api/users
router.post('/', createUser)
router.get('/', getUsers)

// api/users/:_id/exercises
router.post('/:_id/exercises', createExercises)

// not required, but needed during development and test
// delete all users
router.delete('/', deleteUsers)

module.exports = router
