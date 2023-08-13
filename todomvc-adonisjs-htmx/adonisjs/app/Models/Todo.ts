import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm"
import { DateTime } from "luxon"

export default class Todo extends BaseModel {
	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column({ isPrimary: true })
	public id: number

	@column()
	public isCompleted: boolean

	@column()
	public todo: string

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime
}
