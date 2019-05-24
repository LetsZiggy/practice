"use strict"

const { rule } = require("indicative")

class UserSignup {
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
			// "Username has already been taken"
			"username.unique": "notUniqueUsername",
			// "Email is required"
			"email.required": "recheckEmail",
			// "Email cannot exceed 254 characters"
			"email.max": "recheckEmail",
			// "Please provide a valid email"
			"email.email": "recheckEmail",
			// "Email has already been registered"
			"email.unique": "notUniqueEmail",
			// "Password is required"
			"password.required": "recheckPassword",
			// "Password needs to have at least 8 characters"
			"password.min": "recheckPassword",
			// "Password cannot exceed 60 characters"
			"password.max": "recheckPassword",
			// "Password needs to have an uppercase letter, a lowercase letter, a number, and a symbol: ! @ # $ % ^ & * ;"
			"password.regex": "recheckPassword",
			// "Password confirmation needs to be the same as password"
			"password.confirmed": "recheckPassword",
		}
	}

	get rules () {
		return {
			username: [
				rule("required"),
				rule("min", 4),
				rule("max", 80),
				rule("regex", /^(?!.*[^\w.-])[\w.-]*$/g),
				rule("unique", "users", "username"),
			],
			email: [
				rule("required"),
				rule("max", 254),
				rule("email"),
				rule("unique", "users", "email"),
			],
			password: [
				rule("required"),
				rule("min", 8),
				rule("max", 60),
				rule("regex", /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*;])(?!.*\s+)[A-Za-z0-9!@#$%^&*;]*$/g),
				rule("confirmed"),
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
			email: [
				rule("trim"),
				rule("strip_links"),
				rule("strip_tags"),
				rule("normalize_email"),
			],
			password: [
				rule("trim"),
				rule("strip_links"),
				rule("strip_tags"),
				rule("escape"),
			],
			password_confirmation: [
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

module.exports = UserSignup
