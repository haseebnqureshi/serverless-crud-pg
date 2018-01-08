'use strict';

//@see https://www.npmjs.com/package/pg
//@see https://www.npmjs.com/package/pg-types

var db, release;

module.exports.connect = function(callback /* client */) {

	var types = require('pg').types;
	var pool = require('pg').Pool;

	types.setTypeParser(20, function(val) {
		return parseInt(val);
	});

	db = new pool({
		user: process.env.PG_USER,
		database: process.env.PG_DATABASE,
		password: process.env.PG_PASSWORD,
		host: process.env.PG_HOST,
		port: parseInt(process.env.PG_PORT),
		max: parseInt(process.env.PG_MAX),
		idleTimeoutMillis: parseInt(process.env.PG_TIMEOUT)
	});

	db.on('error', function(err, client) {
		console.error('idle client errror', err.message, err.stack);
	});

	db.connect(function(err, client, rel) {
		if (err) {
			console.log({ err });
			return;
		}

		release = rel;
		return callback(client);
	});

};


module.exports.disconnect = function() {
	db.end();
	release();
};

