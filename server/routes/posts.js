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


router.route('/search')
    .get(
        authorizeMiddleware,
        postsController.search)

router.route('/:id')
    //los metodos HTTP pueden rezcibir varios middlewares aparte de controladores
    .get(
        authorizeMiddleware,
        postsController.find, 
        postsController.show)
    .put(
        authorizeMiddleware,
        postsController.find,
        postsController.update,
        postsController.multerMiddleware(),
        postsController.saveImage)
    .delete(
        authorizeMiddleware,
        postsController.find, 
        postsController.destroy)

// router.route('/test')
//     .get(
//         postsController.test)
module.exports = router; 