var express = require('express');
var router = express.Router();

const postsController = require('../controllers/PostsController');
const authorizeMiddleware = require('../middlewares/authorize');

router.route('/')
    .get(
        authorizeMiddleware,
        postsController.index)
    .post(
        authorizeMiddleware,
        postsController.multerMiddleware(), 
        postsController.create,
        postsController.saveImage);

router.route('/:id')
    //los metodos HTTP pueden rezcibir varios middlewares aparte de controladores
    .get(
        postsController.find, 
        postsController.show)
    /* .put(postsController.find, postsController.update)
    .delete(postsController.find, postsController.destroy) */
module.exports = router; 