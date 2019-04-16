"use strict"

/** @type {import("@adonisjs/lucid/src/Schema")} */
const Schema = use("Schema")

class UsersSchema extends Schema {
	down () {
		this.drop("users")
	}

	up () {
		this.create("users", (table) => {
			table
				.increments()

			table
				.timestamps()

			table
				.string("username", 80)
				.notNullable()
				.unique()

			table
				.string("email", 254)
				.notNullable()
				.unique()

			table
				.string("password", 60)
				.notNullable()
		})
	}
}

module.exports = UsersSchema
