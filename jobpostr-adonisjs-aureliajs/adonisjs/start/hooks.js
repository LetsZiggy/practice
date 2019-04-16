const { hooks } = require("@adonisjs/ignitor")

hooks.after.providersBooted(() => {
	const Exception = use("Exception")
	const Logger = use("Logger")

	Logger.level = "debug"

	Exception.handle("ValidationException", async (error, { response, session }) => {
		Logger.debug("ValidationException: %j", error)

		await session
			.commit()

		response
			.unauthorized({
				success: false,
				errors: error,
			})

		return undefined
	})

	Exception.handle("InvalidBasicAuthException", async (error, { response, session }) => {
		Logger.debug("InvalidBasicAuthException: %j", error)

		await session
			.commit()

		response
			.unauthorized({
				success: false,
				errors: error,
			})

		return undefined
	})

	Exception.handle("UserNotFoundException", async (error, { response, session }) => {
		Logger.debug("UserNotFoundException: %j", error)

		await session
			.commit()

		response
			.unauthorized({
				success: false,
				errors: error,
			})

		return undefined
	})

	Exception.handle("PasswordMisMatchException", async (error, { response, session }) => {
		Logger.debug("PasswordMisMatchException: %j", error)

		await session
			.commit()

		response
			.unauthorized({
				success: false,
				errors: error,
			})

		return undefined
	})

	Exception.handle("DomainException", async (error, { response, session }) => {
		Logger.debug("DomainException: %j", error)

		await session
			.commit()

		response
			.badRequest({
				success: false,
				errors: error,
			})

		return undefined
	})

	Exception.handle("HttpException", async (error, { response, session }) => {
		Logger.debug("HttpException: %j", error)

		await session
			.commit()

		response
			.badRequest({
				success: false,
				errors: error,
			})

		return undefined
	})

	Exception.handle("InvalidArgumentException", async (error, { response, session }) => {
		Logger.debug("InvalidArgumentException: %j", error)

		await session
			.commit()

		response
			.badRequest({
				success: false,
				errors: error,
			})

		return undefined
	})

	Exception.handle("RangeException", async (error, { response, session }) => {
		Logger.debug("RangeException: %j", error)

		await session
			.commit()

		response
			.badRequest({
				success: false,
				errors: error,
			})

		return undefined
	})

	Exception.handle("LogicalException", async (error, { response, session }) => {
		Logger.debug("LogicalException: %j", error)

		await session
			.commit()

		response
			.badRequest({
				success: false,
				errors: error,
			})

		return undefined
	})

	Exception.handle("ModelNotFoundException", async (error, { response, session }) => {
		Logger.debug("ModelNotFoundException: %j", error)

		await session
			.commit()

		response
			.badRequest({
				success: false,
				errors: error,
			})

		return undefined
	})
})
