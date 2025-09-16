const express = require('express')
const route = express.Router()
const { getUserDataByUsername, searchUsersByUsername } = require('../controllers/user')

route.get('/search/:username', searchUsersByUsername)
route.get('/:username', getUserDataByUsername)

module.exports = route
