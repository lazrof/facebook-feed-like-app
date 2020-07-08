const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

const AuthController = require('../controllers/AuthController');

router.route('/')
	.get(
		userController.show
	)
  	.post(
		userController.create,
		AuthController.generateToken,
		AuthController.sendToken
  	);

module.exports = router;
