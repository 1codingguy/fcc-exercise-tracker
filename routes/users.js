const express = require('express')
const router = express.Router()

const { createUser } = require('../controller/users')

// post request to `api/users`
router.post('/', createUser)

module.exports = router
