const express = require('express');
const router = express.Router();

const usersController = require('../controllers/UsersController');
const authController = require('../controllers/AuthController');

router.route('/')
	.get(
		usersController.show
	)
  	.post(
		usersController.create,
		authController.generateToken,
		authController.sendToken
  	);

module.exports = router;
