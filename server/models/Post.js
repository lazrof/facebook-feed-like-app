const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const uploader = require('./Uploader');

let postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type:String,
        required: true
    },
    timestamp: {
        type: Date,
        default:Date.now()
    },
    image: String,
    _user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

postSchema.plugin(mongoosePaginate);

postSchema.methods.updateImage = function (path) {
    return uploader(path)
        .then(secure_url => this.saveImageUrl(secure_url, 'image'));
}

postSchema.methods.saveImageUrl = function (secureUrl) {
    this['image'] = secureUrl;
    return this.save();
}

let Post = mongoose.model('Post',postSchema);

module.exports = Post;
