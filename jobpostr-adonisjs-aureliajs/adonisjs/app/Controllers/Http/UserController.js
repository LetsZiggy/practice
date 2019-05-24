"use strict"

const User = use("App/Models/User")
const Logger = use("Logger")

Logger.level = "debug"

class UserController {
	async check ({ auth, request, response }) {
		try {
			const user = await auth
				.getUser()

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

	async signin ({ auth, request, response }) {
		try {
			const { password, username } = request.all()

			const user = await auth
				.attempt(username, password)

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

	async signout ({ auth, response }) {
		await auth
			.logout()

		response
			.ok({
				success: true,
			})
	}

	async signup ({ auth, request, response }) {
		try {
			const user = await User
				.create(request.only(["username", "email", "password"]))

			await auth
				.login(user)

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
