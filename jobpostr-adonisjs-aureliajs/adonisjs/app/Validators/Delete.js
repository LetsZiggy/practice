"use strict"

const { rule } = require("indicative")

class Delete {
	async fails (errors) {
		const messages = errors
			.map((value) => value.message)
			.filter((value, index, array) => array.indexOf(value) === index)

		const data = {
			success: false,
			errors: messages,
		}

		return this.ctx.response.send(data)
	}

	get messages () {
		return {
			// "Id is required"
			"id.required": "recheckId",
			// "User_id is required"
			"user_id.required": "recheckUser_id",
		}
	}

	get rules () {
		return {
			id: [
				rule("required"),
			],
			user_id: [
				rule("required"),
			],
		}
	}

	get sanitizationRules () {
		return {
			id: [
				rule("toInt"),
			],
			user_id: [
				rule("toInt"),
			],
		}
	}

	get validateAll () {
		return true
	}
}

module.exports = Delete
