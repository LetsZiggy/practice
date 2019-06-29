"use strict"

/** @type {import("@adonisjs/lucid/src/Schema")} */
const Schema = use("Schema")

class TokensSchema extends Schema {
	down () {
		this.drop("tokens")
	}

	up () {
		this.create("tokens", (table) => {
			table
				.increments()

			table
				.timestamps()

			table
				.string("identifier", 255)
				.notNullable()
				.unique()

			table
				.string("token", 255)
				.notNullable()
				.unique()

			table
				.boolean("anonymous")
				.defaultTo(true)
		})
	}
}

module.exports = TokensSchema
