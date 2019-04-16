"use strict"

/** @type {import("@adonisjs/lucid/src/Schema")} */
const Schema = use("Schema")

class UsersSchema extends Schema {
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

	down () {
		this.drop("users")
	}
}

module.exports = UsersSchema
