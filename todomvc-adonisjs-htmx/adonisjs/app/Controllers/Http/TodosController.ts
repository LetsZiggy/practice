import { DateTime } from "luxon"
import Todo from "App/Models/Todo"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class TodosController {
	public async destroy ({ request, response }: HttpContextContract): Promise<void> {
		const form = request.body()
		const todo = await Todo.findOrFail(Number(form["todo-id"]))

		await todo.delete()

		response.redirect().back()
	}

	public async destroyCompleted ({ request, response }: HttpContextContract): Promise<void> {
		const form = request.body()
		const completedIds: string[] = form["completed-ids"]?.split(",") ?? []

		if (completedIds.length > 0) {
			await Todo
				.query()
				.whereIn("id", completedIds)
				.delete()
		}

		response.redirect().back()
	}

	public async editTodo ({ request, response }: HttpContextContract): Promise<void> {
		const form = request.body()
		const todo = await Todo.findOrFail(Number(form["todo-id"]))

		todo.todo = form["todo-text"]
		await todo.save()

		response.redirect().back()
	}

	public async index ({ routeKey, view }: HttpContextContract): Promise<string> {
		let todos = await Todo.all()
		const completedIds: number[] = []
		const incompletedIds: number[] = []
		const referrer = routeKey.split("/")[1] ?? ""
		const showToggleAll = todos.length > 0

		for (const element of todos) {
			if (!element.isCompleted) {
				incompletedIds.push(element.id)
			}

			if (element.isCompleted) {
				completedIds.push(element.id)
			}
		}

		if (referrer === "active") {
			todos = todos
				.filter((element) => !element.isCompleted)
		}
		else if (referrer === "completed") {
			todos = todos
				.filter((element) => element.isCompleted)
		}

		return await view.render("index", { completedIds, incompletedIds, referrer, showToggleAll, todos })
	}

	public async newTodo ({ request, response }: HttpContextContract): Promise<void> {
		const form = request.body()

		if (typeof form["todo"] === "string" && form["todo"].length > 0) {
			const todo = new Todo()

			todo.todo = form["todo"]
			await todo.save()
		}

		response.redirect().back()
	}

	public async toggle ({ request, response }: HttpContextContract): Promise<void> {
		const form = request.body()
		const isCompleted = form["todo-is-completed"] === "true"
		const todo = await Todo.findOrFail(Number(form["todo-id"]))

		todo.isCompleted = isCompleted
		await todo.save()

		response.redirect().back()
	}

	public async toggleAll ({ request, response }: HttpContextContract): Promise<void> {
		const form = request.body()
		const incompletedIds: string[] = form["incompleted-ids"]?.split(",") ?? []

		await (
			(incompletedIds.length > 0)
				? Todo
						.query()
						.whereIn("id", incompletedIds)
						.update({ updatedAt: DateTime.local(), isCompleted: true })
				: Todo
					.query()
					.select("*")
					.update({ updatedAt: DateTime.local(), isCompleted: false })
		)

		response.redirect().back()
	}
}
