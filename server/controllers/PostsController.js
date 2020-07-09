const Post          = require('../models/Post');
const upload        = require('../config/upload');
const buildParams   = require('./helpers').buildParams;

const validParams = ['title','content','image'];

function find(req,res,next) {
    Post.findOne({id:req.params.id})
    .then(post=>{
        req.post = post;
        next();
    }).catch(err=>{
        next(err);
    });
}

// function index(req,res){
//     //Todos los lugares
//     Place.paginate({},{ page: req.query.page || 1, limit:8, sort: {'_id': -1}  })
//     .then(docs=>{
//       res.json(docs);
//     }).catch(err=>{
//       console.log(err);
//       res.json(err);
//     })
// }

function create(req, res, next){
    //Crear nuevos lugares
    const params = buildParams(validParams,req.body);
    //console.log(req.user);
    //params['_user'] = req.user.id;
    params['_user'] = '5f0564b9539f4c12f5b326c9';
    console.log('#### params');
    console.log(params)
    Post.create(params).then(doc=>{
        req.post = doc;
        next();
    }).catch(err=>{
        console.log('--- function create(req,res)')
        console.log(err)
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
module.exports = {create, multerMiddleware, saveImage, test};