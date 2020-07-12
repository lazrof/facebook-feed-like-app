const express = require('express');
const router = express.Router();

const usersController = require('../controllers/UsersController');
const authController = require('../controllers/AuthController');
const authorizeMiddleware = require('../middlewares/authorize');

router.route('/')
	.get(
		authorizeMiddleware,
		usersController.show
	)
  	.post(
		usersController.create,
		authController.generateToken,
		authController.sendToken
  	);

module.exports = router;
