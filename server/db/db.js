const mongoose = require('mongoose');
const config = require('config');
const consola = require('consola')
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);

// require("../models/user");

// exports.initSessionStore = function() { //only for the session saving
//     const store = new MongoDBStore({
//         uri: config.get('db'),
//         collection: 'sessions'
//     })

//     store.on('error', (err) => consola.error(new Error(err)))

//     return store;
// }

exports.connect = function() { //actual connecting
    return mongoose.connect(config.get('db'), { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true})
        .then(() => consola.success('Database connected'))
        .catch(err => consola.error(new Error(err)));
}