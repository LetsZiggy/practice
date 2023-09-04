import { DateTime } from "luxon"
import Todo from "App/Models/Todo"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class TodosController {
	public async destroy ({ params, request, response, view }: HttpContextContract): Promise<void> {
		const id = Number(params["id"])
		const todo = await Todo.findOrFail(id)

		await todo.delete()

		const todos = await Todo.all()
		const incompletedIds = todos
			.filter((element) => !element.isCompleted)
			.map((element) => element.id)
		const referrer = request
			.header("referrer")
			?.split("/")
			.at(-1) ?? ""
		const showToggleAll = todos.length > 0

		response
			.status(200)
			.send(await view.render("destroy", { incompletedIds, referrer, showToggleAll, todos }))
	}

	public async destroyCompleted ({ request, view }: HttpContextContract): Promise<string> {
		await Todo
			.query()
			.where("is_completed", "=", "TRUE")
			.delete()

		let todos = await Todo.all()
		const incompletedIds = todos
			.filter((element) => !element.isCompleted)
			.map((element) => element.id)
		const referrer = request
			.header("referrer")
			?.split("/")
			.at(-1) ?? ""
		const showToggleAll = todos.length > 0

		if (referrer === "active") {
			todos = todos
				.filter((element) => !element.isCompleted)
		}
		else if (referrer === "completed") {
			todos = todos
				.filter((element) => element.isCompleted)
		}

		return await view.render("destroy_completed", { incompletedIds, referrer, showToggleAll, todos })
	}

	public async editTodoSwap ({ params, request, view }: HttpContextContract): Promise<string> {
		const element = request.qs()["t"]
		const id = Number(params["id"])
		const editing = { id, t: element }
		const todo = await Todo.findOrFail(id)

		return await view.render("components/todo_item", { editing, todo })
	}

	public async editTodoUpdate ({ params, request, view }: HttpContextContract): Promise<string> {
		const value = request.body()["value"]
		const id = Number(params["id"])
		const editing = { id }
		const todo = await Todo.findOrFail(id)

		if (typeof value === "string" && value !== todo.todo && value.length > 0) {
			todo.todo = value
			await todo.save()
		}

		return await view.render("components/todo_item", { editing, todo })
	}

	public async index ({ routeKey, view }: HttpContextContract): Promise<string> {
		let todos = await Todo.all()
		const incompletedIds = todos
			.filter((element) => !element.isCompleted)
			.map((element) => element.id)
		const referrer = routeKey.split("/")[1] ?? ""
		const showToggleAll = todos.length > 0

		if (referrer === "active") {
			todos = todos
				.filter((element) => !element.isCompleted)
		}
		else if (referrer === "completed") {
			todos = todos
				.filter((element) => element.isCompleted)
		}

		return await view.render("index", { incompletedIds, referrer, showToggleAll, todos })
	}

	public async newTodo ({ request, view }: HttpContextContract): Promise<string> {
		const value = request.body()["value"]
		const newTodo = new Todo()

		if (typeof value === "string" && value.length > 0) {
			newTodo.todo = value
			await newTodo.save()
		}

		let todos = await Todo.all()
		const incompletedIds = todos
			.filter((element) => !element.isCompleted)
			.map((element) => element.id)
		const referrer = request
			.header("referrer")
			?.split("/")
			.at(-1) ?? ""
		const showToggleAll = todos.length > 0

		if (referrer === "active") {
			todos = todos
				.filter((element) => !element.isCompleted)
		}
		else if (referrer === "completed") {
			todos = todos
				.filter((element) => element.isCompleted)
		}

		return await view.render("new_todo", { incompletedIds, referrer, showToggleAll, todo: newTodo, todos })
	}

	public async toggle ({ params, request, view }: HttpContextContract): Promise<string> {
		const id = Number(params["id"])
		const isCompleted = request.body()["todo-is-completed"] === "on"
		const todo = await Todo.findOrFail(id)

		todo.isCompleted = isCompleted
		await todo.save()

		let todos = await Todo.all()
		const incompletedIds = todos
			.filter((element) => !element.isCompleted)
			.map((element) => element.id)
		const referrer = request
			.header("referrer")
			?.split("/")
			.at(-1) ?? ""
		const showToggleAll = todos.length > 0

		if (referrer === "active") {
			todos = todos
				.filter((element) => !element.isCompleted)
		}
		else if (referrer === "completed") {
			todos = todos
				.filter((element) => element.isCompleted)
		}

		return await view.render("toggle_todo", { incompletedIds, referrer, showToggleAll, todo, todos })
	}

	public async toggleAll ({ request, view }: HttpContextContract): Promise<string> {
		const currentIncompletedIds: number[] = request.body()["incompletedIds"]?.split(",").map(Number) ?? []

		await (
			(currentIncompletedIds.length > 0)
				? Todo
						.query()
						.whereIn("id", currentIncompletedIds)
						.update({ updatedAt: DateTime.local(), isCompleted: true })
				: Todo
					.query()
					.select("*")
					.update({ updatedAt: DateTime.local(), isCompleted: false })
		)

		let todos = await Todo.all()
		const incompletedIds = todos
			.filter((element) => !element.isCompleted)
			.map((element) => element.id)
		const referrer = request
			.header("referrer")
			?.split("/")
			.at(-1) ?? ""
		const showToggleAll = todos.length > 0

		if (referrer === "active") {
			todos = todos
				.filter((element) => !element.isCompleted)
		}
		else if (referrer === "completed") {
			todos = todos
				.filter((element) => element.isCompleted)
		}

		return await view.render("toggle_all", { incompletedIds, referrer, showToggleAll, todos })
	}
}
