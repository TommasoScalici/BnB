var app = require('./backend/server.js');
var mongoose = require('mongoose');

// Configurazione e avvio del database MongoDB

var mongoURI = 'mongodb://localhost/bnb';

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function() {
  console.log("DB connection was succesful");
});

// Fine configurazione MongoDB


// Avvio del server

var port = process.env.PORT || 8080;

app.listen(port);

console.log(`Server is listening on port ${port}`);