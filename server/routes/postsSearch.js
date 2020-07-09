var express = require('express');
var router = express.Router();

const postsController = require('../controllers/PostsController');
const authorizeMiddleware = require('../middlewares/authorize');

router.route('/search')
    .get(
        authorizeMiddleware,
        postsController.search)

module.exports = router; 