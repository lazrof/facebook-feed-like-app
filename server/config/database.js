const mongoose  = require('mongoose');
const secrets   = require('./secrets');

const mongoConnection = secrets.mongoURL
const dbName = secrets.dbName

module.exports = {
    connect : () => mongoose.connect(mongoConnection),
    dbName,
    connection: () => {
        if (mongoose.connection)
            return mongoose.connection;
        return this.connect()
    }
}