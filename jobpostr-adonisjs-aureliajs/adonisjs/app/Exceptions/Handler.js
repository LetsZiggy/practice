"use strict"

const BaseExceptionHandler = use("BaseExceptionHandler")
const Logger = use("Logger")

Logger.level = "debug"

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
	/**
	 * Handle exception thrown during the HTTP lifecycle
	 *
	 * @method handle
	 *
	 * @param {Object} error
	 * @param {Object} options.request
	 * @param {Object} options.response
	 *
	 * @return {void}
	 */
	async handle (error, { request, response }) {
		response
			.status(error.status)
			.send({
				errors: error.message,
			})
	}

	/**
	 * Report exception for logging or debugging.
	 *
	 * @method report
	 *
	 * @param {Object} error
	 * @param {Object} options.auth
	 * @param {Object} options.request
	 *
	 * @return {void}
	 */
	async report (error, { auth, request }) {
		Logger.debug("ExceptionHandler: %j", error)
		// Logger.debug("ExceptionHandlerCookies: %j", request.cookies())
		// Logger.debug("ExceptionHandlerHeaders: %j", request.headers())
		// Logger.debug("ExceptionHandlerBody: %j", request.all())
		// Logger.debug("ExceptionHandlerAuth: %j", auth.user)
	}
}

module.exports = ExceptionHandler
