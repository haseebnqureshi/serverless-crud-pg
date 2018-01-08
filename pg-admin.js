'use strict';

require('dotenv').config();

var run = require('child_process').execSync;

module.exports.backupSchema = function() {
	run(`pg_dump --host=${process.env.PG_HOST} --port=${process.env.PG_PORT} --username=${process.env.PG_USER} --dbname=${process.env.PG_DATABASE} --file=${process.env.PG_DATABASE}_schema.sql --format=p --verbose --schema-only --quote-all-identifiers`)
};

module.exports.backupData = function() {
	run(`pg_dump --host=${process.env.PG_HOST} --port=${process.env.PG_PORT} --username=${process.env.PG_USER} --dbname=${process.env.PG_DATABASE} --file=${process.env.PG_DATABASE}_data.sql --format=p --verbose --quote-all-identifiers`)
};

module.exports.restoreSchema = function() {
	run(`psql --host=${process.env.PG_HOST} --port=${process.env.PG_PORT} --username=${process.env.PG_USER} --dbname=${process.env.PG_DATABASE} --command='\\i ${process.env.PG_DATABASE}_schema.sql'`)
};

module.exports.restoreData = function() {
	run(`psql --host=${process.env.PG_HOST} --port=${process.env.PG_PORT} --username=${process.env.PG_USER} --dbname=${process.env.PG_DATABASE} --command='\\i ${process.env.PG_DATABASE}_data.sql'`)
};
