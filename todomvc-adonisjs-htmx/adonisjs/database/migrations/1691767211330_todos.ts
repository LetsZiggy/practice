/* eslint-disable @stylistic/newline-per-chained-call */

import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class extends BaseSchema {
	protected tableName = "todos"

	public override async down (): Promise<void> {
		this.schema.dropTable(this.tableName)
	}

	public override async up (): Promise<void> {
		this.schema.createTable(this.tableName, (table) => {
			table.increments("id").primary()
			table.timestamp("created_at", { useTz: true }).notNullable()
			table.timestamp("updated_at", { useTz: true }).notNullable()
			table.boolean("is_completed").notNullable().defaultTo(false)
			table.string("todo", 255).notNullable().defaultTo("")
		})
	}
}
