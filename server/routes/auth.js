const express = require('express');
const router = express.Router();

const authController = require('../controllers/AuthController');

router.route('/login')
  	.post(
		authController.authenticate,
		authController.generateToken,
		authController.sendToken
  	);

module.exports = router;
