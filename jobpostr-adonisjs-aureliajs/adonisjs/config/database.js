"use strict"

/** @type {import("@adonisjs/framework/src/Env")} */
const Environment = use("Env")

/** @type {import("@adonisjs/ignitor/src/Helpers")} */
const Helpers = use("Helpers")

module.exports = {
	/*
	|--------------------------------------------------------------------------
	| Default Connection
	|--------------------------------------------------------------------------
	|
	| Connection defines the default connection settings to be used while
	| interacting with SQL databases.
	|
	*/
	connection: Environment.get("DB_CONNECTION", "sqlite"),

	/*
	|--------------------------------------------------------------------------
	| Sqlite
	|--------------------------------------------------------------------------
	|
	| Sqlite is a flat file database and can be good choice under development
	| environment.
	|
	| npm i --save sqlite3
	|
	*/
	sqlite: {
		client: "sqlite3",
		connection: {
			filename: Helpers.databasePath(`${ Environment.get("DB_DATABASE", "development") }.sqlite`),
		},
		useNullAsDefault: true,
	},

	/*
	|--------------------------------------------------------------------------
	| MySQL
	|--------------------------------------------------------------------------
	|
	| Here we define connection settings for MySQL database.
	|
	| npm i --save mysql
	|
	*/
	mysql: {
		client: "mysql",
		connection: {
			host: Environment.get("DB_HOST", "localhost"),
			port: Environment.get("DB_PORT", ""),
			user: Environment.get("DB_USER", "root"),
			password: Environment.get("DB_PASSWORD", ""),
			database: Environment.get("DB_DATABASE", "adonis"),
		},
	},

	/*
	|--------------------------------------------------------------------------
	| PostgreSQL
	|--------------------------------------------------------------------------
	|
	| Here we define connection settings for PostgreSQL database.
	|
	| npm i --save pg
	|
	*/
	pg: {
		client: "pg",
		connection: {
			host: Environment.get("DB_HOST", "localhost"),
			port: Environment.get("DB_PORT", ""),
			user: Environment.get("DB_USER", "root"),
			password: Environment.get("DB_PASSWORD", ""),
			database: Environment.get("DB_DATABASE", "adonis"),
		},
	},
}
