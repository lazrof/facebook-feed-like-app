const mongoose  = require('mongoose');
const secrets   = require('./secrets');

const dbName = 'fb_like_app'
const mongoConnection = secrets.atlasDB.replace('<dbname>', dbName);

module.exports = {
    connect : () => mongoose.connect(mongoConnection),
    dbName,
    connection: () => {
        if (mongoose.connection)
            return mongoose.connection;
        return this.connect()
    }
}