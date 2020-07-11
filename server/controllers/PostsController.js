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
        res.json(err);
    })
}

function search(req, res) {
    const page = !req.query.page ? 1 : req.query.page; 
    const options = {
        page,
        limit: 5,
    };

    if (!req.user) return res.status(400).json({ message: "Invalid Request, missing Token" });
    
    const searchTitle = 'Vadin';
    
    Post.paginate(
    {
        $and: [
            {'_user': req.user.id},
            {
                $or: [ 
                { title: { $regex: `/${searchTitle}/`, $options: 'i' } }, 
                { content: { $regex: `/${searchTitle}/`, $options: 'i' } }, 
                ]
            }
        ]
    } 
    ,options)
    .then(docs=>{
        res.json(docs);
    }).catch(err=>{
        res.json(err);
    })
}

function find(req, res, next) {

    if (!req.user) return res.status(400).json({ message: "Invalid Request, missing Token" });

    Post.findOne({_id:req.params.id, _user:req.user.id})
    .then(post=>{
        req.post = post;
        next();
    }).catch(err=>{
        res.status(400).json({ message: "Invalid Request, Post Not Found" });
    });
}

function show(req, res) {
    if (req.post){
        res.json(req.post);
    } else {
        res.status(404).json({ message: "Post Not Found" });
    }
}

function update(req, res, next){

    if (req.post){
        const params = buildParams(validParams,req.body);

        req.post = Object.assign(req.post,params);
        req.post.save().then(doc=>{
            req.post = doc;
            next();
        }).catch(err=>{
            next(err);
        });

    } else {
        return res.status(400).json({ message: "Can't update post, missing Token" });
    }
}

function destroy(req,res){

    if (req.post){
        
        req.post.remove().then(doc=>{
            res.json({})
        }).catch(err=>{
            res.json(err);
        });
    } else {
        return res.status(400).json({ message: "Can't delete post, missing Token" });
    }

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
    // Uploading Image to server
	return upload.single('image')
}

function saveImage(req, res) {
    // Uploading To Cloudinary
	if(req.post){

		if(req.file){

			let path = req.file.path;
			req.post.updateImage(path).then(result =>{
                res.json(req.post);
            }).catch(err => {
			    res.json(err);
            });
		} else {

            res.json(req.post);
        }


	}else{
		res.status(422).json({message: 'Could not save post'});
	}
	
}

module.exports = {index, find, show, create, update, destroy, multerMiddleware, saveImage, search};