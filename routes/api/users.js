const express = require('express')
const router = express.Router();
const userControllers = require('../../controllers/usersController')
router.route('/')
  .get(userControllers.getAllUser)

module.exports = router