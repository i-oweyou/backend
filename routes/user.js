const express = require('express')
const route = express.Router()
const { getUserByUsername, searchUsersByUsername } = require('../controllers/user')

route.get('/search/:username', searchUsersByUsername)
route.get('/:username', getUserByUsername)

module.exports = route
