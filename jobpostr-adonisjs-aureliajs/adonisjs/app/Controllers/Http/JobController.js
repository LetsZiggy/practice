"use strict"

const Job = use("App/Models/Job")
const Logger = use("Logger")

Logger.level = "debug"

class JobController {
	async deleteJob ({ auth, request, response }) {
		try {
			await auth
				.user
				.jobs()
				.where("id", request.input("id", 0))
				.delete()

			response
				.ok({
					success: true,
				})
		}
		catch (error) {
			Logger
				.debug("jobDeleteError: %j", error)

			response
				.badRequest({
					success: false,
					errors: error,
				})
		}
	}

	async editJob ({ auth, request, response }) {
		try {
			await auth
				.user
				.jobs()
				.where("id", request.input("id", 0))
				.update(request.only(["title", "link", "description"]))

			response
				.ok({
					success: true,
				})
		}
		catch (error) {
			Logger
				.debug("jobEditError: %j", error)

			response
				.badRequest({
					success: false,
					errors: error,
				})
		}
	}

	async list ({ request, response }) {
		try {
			const t = Number(request.input("t", 0))
			const jobs = (t === 0)
				? await Job
					.all()
				: await Job
					.query()
					.where("updated_at", ">", new Date(t))
					.fetch()

			response
				.ok({
					success: true,
					data: {
						jobs,
					},
				})
		}
		catch (error) {
			Logger
				.debug("jobAllError: %j", error)

			response
				.badRequest({
					success: false,
					errors: error,
				})
		}
	}

	async newJob ({ auth, request, response }) {
		try {
			await auth
				.user
				.jobs()
				.create(request.only(["title", "link", "description"]))

			response
				.ok({
					success: true,
				})
		}
		catch (error) {
			Logger
				.debug("jobCreateError: %j", error)

			response
				.badRequest({
					success: false,
					errors: error,
				})
		}
	}
}

module.exports = JobController
