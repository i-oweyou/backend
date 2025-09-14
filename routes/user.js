const express = require('express')
const route = express.Router()
const { getUserByUsername, searchUsersByUsername } = require('../controllers/user')

route.get('/:username', getUserByUsername)
route.get('/search/:username', searchUsersByUsername)

module.exports = route
