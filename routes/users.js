const express = require('express')
const router = express.Router()

const {
  createUser,
  getUsers,
  deleteUsers,
  createExercises,
  getLogs,
  deleteAllExercises,
} = require('../controller/users')

// api/users
router.post('/', createUser)
router.get('/', getUsers)

// api/users/:_id/exercises
router.post('/:_id/exercises', createExercises)

// api/users/:id/logs
router.get('/:_id/logs', getLogs)

// not required, but needed during development and test
// delete all users
router.delete('/', deleteUsers)

router.delete('/deleteAllExercises', deleteAllExercises)

module.exports = router
