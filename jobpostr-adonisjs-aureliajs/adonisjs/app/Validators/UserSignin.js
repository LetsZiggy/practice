"use strict"

const { rule } = require("indicative")

class UserSignin {
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
			// "Username is required"
			"username.required": "recheckUsername",
			// "Username needs to have at least 4 characters"
			"username.min": "recheckUsername",
			// "Username cannot exceed 80 characters"
			"username.max": "recheckUsername",
			// "Username can only have these symbols: - . _"
			"username.regex": "recheckUsername",
			// "Password is required"
			"password.required": "recheckPassword",
			// "Password needs to have at least 8 characters"
			"password.min": "recheckPassword",
			// "Password cannot exceed 60 characters"
			"password.max": "recheckPassword",
			// "Password needs to have an uppercase letter, a lowercase letter, a number, and a symbol: ! @ # $ % ^ & * ;"
			"password.regex": "recheckPassword",
		}
	}

	get rules () {
		return {
			username: [
				rule("required"),
				rule("min", 4),
				rule("max", 80),
				rule("regex", /^(?!.*[^\w.-])[\w.-]*$/g),
			],
			password: [
				rule("required"),
				rule("min", 8),
				rule("max", 60),
				rule("regex", /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*;])(?!.*\s+)[A-Za-z0-9!@#$%^&*;]*$/g),
			],
		}
	}

	get sanitizationRules () {
		return {
			username: [
				rule("trim"),
				rule("strip_links"),
				rule("strip_tags"),
				rule("escape"),
			],
			password: [
				rule("trim"),
				rule("strip_links"),
				rule("strip_tags"),
				rule("escape"),
			],
		}
	}

	get validateAll () {
		return true
	}
}

module.exports = UserSignin
