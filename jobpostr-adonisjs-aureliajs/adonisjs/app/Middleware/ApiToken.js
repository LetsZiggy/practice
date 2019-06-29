"use strict"

const GE = require("@adonisjs/generic-exceptions")

const Token = use("App/Models/Token")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/auth/src/Auth')} Auth */

class ApiToken {
	/**
	 * @param {object} ctx
	 * @param {Auth} ctx.auth
	 * @param {Request} ctx.request
	 * @param {Function} next
	 */
	async handle ({ auth, request }, next) {
		let token = await Token
			.query()
			.where({
				identifier: auth.user.id,
				token: request.input("token"),
			})
			.fetch()

		token = token.toJSON()

		if (token.length !== 1) {
			throw new GE.HttpException("Invalid CSRF token", 403, "EBADCSRFTOKEN")
		}

		await next()
	}
}

module.exports = ApiToken
