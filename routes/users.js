const express = require('express')
const router = express.Router()

const { createUser, getUsers, deleteUsers } = require('../controller/users')

// post request to `api/users`
router.post('/', createUser)

router.get('/', getUsers)

router.delete('/', deleteUsers)
// not required, but needed during development and test
// delete all users
module.exports = router
