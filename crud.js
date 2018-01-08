'use strict';

/*
we use knexjs to easily, quickly, and reliably build psql queries
and use the resulting sql and bindings in our own pg connection.

@see https://www.npmjs.com/package/knex
*/

var knex = require('knex')({ client: 'pg' });

var hash = require('object-hash');

var client;

var makeQuery = function(query, callback) {
	client.query(query.sql, query.bindings, function(err, result) {
		if (err) {
			console.log(err);
			return callback([])
		}
		return callback(result.rows);
	})
};

/*
all of these methods are generalized, so that out-of-the-box, 
we can start generating and managing content to any table.
*/

module.exports = function(cl) {

	client = cl;

	return {

		create: function(table, item, callback) {
			item.hash = hash(item);
			return makeQuery(
				knex(table)
					.insert(item)
					.toSQL()
					.toNative(),
				callback
			)
		},

		read: function(table, predicate, callback) {
			return makeQuery(
				knex(table)
					.where(predicate)
					.toSQL()
					.toNative(),
				callback
			)
		},

		update: function(table, predicate, item, callback) {
			return makeQuery(
				knex(table)
					.where(predicate)
					.update(item)
					.toSQL()
					.toNative(),
				callback
			)
		},

		delete: function(table, predicate, callback) {
			return makeQuery(
				knex(table)
					.where(predicate)
					.delete()
					.toSQL()
					.toNative(),
				callback
			)
		}

	}
};

