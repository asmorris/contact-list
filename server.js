var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = 'contacts';

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// Creating a db variable outside of the db connection callback to reuse the connection pool in the app.

var db;

// Connect to the db before starting the application server

mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost/mongodb', (err, database) => {
	if (err) {
		console.log(err)
		process.exit(1)
	}

	// Save db object from the callback for reuse
	db = database;
	console.log('Database connection ready');

	// Initialize the app
	var server = app.listen(process.env.port || 3000, () => {
		var port = server.address().port;
		console.log('App now running on port', port);
	})

})

// CONTACTS API ROUTES BELOW HERE

