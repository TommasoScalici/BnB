const express = require('express');
const db = require('./config/db.js');
const middleware = require('./config/middleware.js');
const routes = require('./config/routes');


require('dotenv').config();

const app = express();

middleware(app, express);
routes(app, express);


db.mongoose.connect(process.env.MONGODB_URI || db.url, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database! (MongoDB)")
}).catch(err => {
    console.log(`Connection to database failed with error:  ${err}`);
    process.exit();
})

module.exports = app;