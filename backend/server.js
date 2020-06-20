const express = require('express');
const db = require('./config/db.js');
const middleware = require('./config/middleware.js');
const routes = require('./config/routes');
const mailreminder = require('./config/mail-reminder.js');


require('dotenv').config();

const app = express();

middleware(app, express);
routes(app, express);
mailreminder(app, express);


const url = process.env.MONGODB_URI || db.url;

db.mongoose.connect(url, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Connected to database (MongoDB), at ${url}`)
}).catch(err => {
    console.log(`Connection to database failed with error:  ${err}`);
    process.exit();
})

module.exports = app;