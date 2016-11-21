var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = 'contacts';

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
console.log('Hia there')

// Creating a db variable outside of the db connection callback to reuse the connection pool in the app.

var db;

// Connect to the db before starting the application server

mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost/mongodb', function (err, database) {
	if (err) {
		console.log(err)
		console.log("Hello")
		process.exit(1)
	}

	// Save db object from the callback for reuse
	db = database;
	console.log('Database connection ready');

	// Initialize the app
	var server = app.listen(process.env.port || 8080, function () {
		var port = server.address().port;
		console.log('App now running on port', port);
	})

})

// CONTACTS API ROUTES BELOW HERE

// Generic error handler which will be used by all of the endpoints.

function handleError(res, reason, message, code) {
	console.log("ERROR: " + reason);
	res.status(code || 500).json({"error": message});
}

/*
	"/contacts"
	GET: find all contacts
	POST: creates a new contact
 */

app.get('/contacts', function (req, res) {

});

app.post("/contacts", function (req, res) {
	var newContact = req.body;
	newContact.createDate = new Date();

	if (!(req.body.firstName || req.body.lastName)) {
		handleError(res, "Invalid User input", "Must provide a first or last name", 400);
	}

	db.collection(CONTACTS_COLLECTION).insertOne(newContact, function (err, doc) {
		if (err) {
			handleError(res, err.message, "Failed to create a new contact.");
		} else {
			res.status(201).json(doc.ops[0]);
		}
	});
});

/*
	'/contacts/:id'
	GET: find contact by id
	PUT: update contact by id
	DELETE: deletes contact by id
 */

app.get('/contacts/:id', function (req, res) {

});

app.put('/contacts/:id', function (req, res) {

});

app.delete('/contacts/:id', function (req, res) {

});
