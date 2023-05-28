// This file will not go normally to the repository
require('dotenv').config();
const secretKey = process.env.APP_SECRET_KEY;
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;
const mongoHost = process.env.MONGO_HOST;
const dbName = 'facebook_like_app';

//'mongodb://root:example@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000'
//`mongodb+srv://${mongoUser}:${mongoPass}@${mongoHost}/${dbName}?retryWrites=true&w=majority`
const mongoURL   = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}/?retryWrites=true&w=majority`

const cloudinary = {
    api_key: '439583423256799',
    cloud_name: 'djgzmwinb',
    api_secret: 'SmtcOABl3spQ6AZq5u6vzs7zyv8'
}

module.exports = { mongoURL, dbName, secretKey, cloudinary }