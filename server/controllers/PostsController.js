const Post          = require('../models/Post');
const upload        = require('../config/upload');
const buildParams   = require('./helpers').buildParams;

const validParams = ['title','content','image'];

function index(req, res){

    const page = !req.query.page ? 1 : req.query.page; 
    const options = {
        page,
        limit: 5,
    };
    
    if (!req.user) return res.status(400).json({ message: "Invalid Request, missing Token" });
    
    Post.paginate({'_user': req.user.id},options)
    .then(docs=>{
        res.json(docs);
    }).catch(err=>{
      console.log(err);
        res.json(err);
    })
}

function find(req, res, next) {
    Post.findOne({_id:req.params.id})
    .then(post=>{
        req.post = post;
        next();
    }).catch(err=>{
        next(err);
    });
}

function show(req, res) {
    res.json(req.post);
}

function create(req, res, next){

    const params = buildParams(validParams,req.body);
    params['_user'] = req.user.id;

    Post.create(params).then(doc=>{
        req.post = doc;
        next();
    }).catch(err=>{
        next(err);
    });
}

function multerMiddleware() {

	// si es un solo archivo usamos .single
	// el resultado de este return es un middleware por eso, en las routes queda instanciada la función
	return upload.single('image')
}

function saveImage(req, res) {

	if(req.post){

		if(req.file){

			let path = req.file.path;
			req.post.updateImage(path).then(result =>{
                res.json(req.post);
            }).catch(err => {
                console.log(err);
			    res.json(err);
            });
		} else {
            res.status(400).json({message: 'Image error'});
        }


	}else{
		res.status(422).json({message: 'Could not save post'});
	}
	
}

function test(req, res) {
    res.json('working')
}
module.exports = {index, find, show, create, multerMiddleware, saveImage, test};