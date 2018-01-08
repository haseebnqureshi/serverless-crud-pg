'use strict';

/* expected values in .env */

// PG_HOST=
// PG_USER=
// PG_DATABASE=
// PG_PASSWORD=
// PG_PORT=5432
// PG_MAX=10
// PG_TIMEOUT=30000

require('dotenv').config();

var pg = require('pg.js');

var crud = require('crud.js');

module.exports.createItem = function(event, context, callback) {
	pg.connect(function(client) {
		var item = JSON.parse(event.body);
		crud(client).create('items', item, function(rows) {
			pg.disconnect();
			return callback(null, {
				statusCode: 200,
				body: JSON.stringify(rows),
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
					"Content-Type": "application/json",
					"X-Instacontract-Items-Total": rows.length
				}
			})
		})
	})
};

module.exports.readItems = function(event, context, callback) {
	pg.connect(function(client) {
		var predicate = { group_id: 0 };
		crud(client).read('items', predicate, function(rows) {
			pg.disconnect();
			return callback(null, {
				statusCode: 200,
				body: JSON.stringify(rows),
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
					"Content-Type": "application/json",
					"X-Instacontract-Items-Total": rows.length
				}
			})
		})
	})
};

module.exports.updateItem = function(event, context, callback) {
	pg.connect(function(client) {
		var predicate = { group_id: 0, id: event.pathParameters.id };
		var item = JSON.parse(event.body); //new values
		crud(client).update('items', predicate, item, function(rows) {
			pg.disconnect();
			return callback(null, {
				statusCode: 200,
				body: JSON.stringify(rows),
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
					"Content-Type": "application/json",
					"X-Instacontract-Items-Total": rows.length
				}
			})
		})
	})
};

module.exports.deleteItem = function(event, context, callback) {
	pg.connect(function(client) {
		var predicate = { group_id: 0, id: event.pathParameters.id };
		crud(client).delete('items', predicate, function() {
			pg.disconnect();
			return callback(null, {
				statusCode: 200,
				body: JSON.stringify([]),
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
					"Content-Type": "application/json"
				}
			})
		})
	})
};

