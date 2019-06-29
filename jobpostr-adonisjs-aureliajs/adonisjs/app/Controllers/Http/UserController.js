"use strict"

const GE = require("@adonisjs/generic-exceptions")

const User = use("App/Models/User")
const Token = use("App/Models/Token")
const Logger = use("Logger")

Logger.level = "debug"

class UserController {
	async check ({ auth, request, response }) {
		try {
			const user = await auth
				.getUser()

			const token = await Token
				.findByOrFail("identifier", request.input("identifier", 0))

			token.merge({
				identifier: user.id,
				anonymous: false,
			})

			await token.save()

			response
				.ok({
					data: {
						isSignin: true,
						userId: user.id,
						username: user.username,
					},
				})
		}
		catch {
			response
				.badRequest({
					data: {
						isSignin: false,
						userId: 0,
						username: "",
					},
				})
		}
	}

	async endSession ({ request, response }) {
		try {
			await Token
				.query()
				.where("token", request.input("token", 0))
				.delete()

			response
				.ok({
					success: true,
				})
		}
		catch {
			response
				.badRequest({
					success: false,
				})
		}
	}

	async signin ({ auth, request, response }) {
		try {
			const token = await Token
				.findByOrFail("identifier", request.input("identifier", 0))

			if (token.token !== request.input("token", 0)) {
				throw new GE.HttpException("Invalid CSRF token", 403, "EBADCSRFTOKEN")
			}

			const { password, username } = request.all()

			const user = await auth
				.attempt(username, password)

			token.merge({
				identifier: user.id,
				anonymous: false,
			})

			await token.save()

			response
				.ok({
					success: true,
					data: {
						isSignin: true,
						userId: user.id,
						username: user.username,
					},
				})
		}
		catch (error) {
			Logger
				.debug("userSigninError: %j", error)

			response
				.badRequest({
					success: false,
					data: {
						isSignin: false,
						userId: 0,
						username: "",
					},
					errors: error,
				})
		}
	}

	async signout ({ auth, request, response }) {
		const token = await Token
			.findByOrFail("identifier", auth.user.id)

		await auth
			.logout()

		token.merge({
			identifier: request.nonce,
			anonymous: true,
		})

		await token.save()

		response
			.ok({
				success: true,
				data: {
					identifier: request.nonce,
				},
			})
	}

	async signup ({ auth, request, response }) {
		try {
			const token = await Token
				.findByOrFail("identifier", request.input("identifier", 0))

			if (token.token !== request.input("token", 0)) {
				throw new GE.HttpException("Invalid CSRF token", 403, "EBADCSRFTOKEN")
			}

			const user = await User
				.create(request.only(["username", "email", "password"]))

			await auth
				.login(user)

			token.merge({
				identifier: user.id,
				anonymous: false,
			})

			await token.save()

			response
				.created({
					success: true,
					data: {
						isSignin: true,
						userId: user.id,
						username: user.username,
					},
				})
		}
		catch (error) {
			Logger
				.debug("userSignupError: %j", error)

			response
				.badRequest({
					success: false,
					data: {
						isSignin: false,
						userId: 0,
						username: "",
					},
					errors: error,
				})
		}
	}
}

module.exports = UserController
