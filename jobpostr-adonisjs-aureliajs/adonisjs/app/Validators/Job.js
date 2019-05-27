"use strict"

const { rule } = require("indicative")

class Job {
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
			// "Title is required"
			"title.required": "recheckTitle",
			// "Title needs to have at least 8 characters"
			"title.min": "recheckTitle",
			// "Title cannot exceed 60 characters"
			"title.max": "recheckTitle",
			// "Title can only have these symbols: - . _ @ : ; / #"
			"title.regex": "recheckTitle",
			// "Link is required"
			"link.required": "recheckLink",
			// "Link cannot exceed 254 characters"
			"link.max": "recheckLink",
			// "Link needs to be a valid URL"
			"link.regex": "recheckLink",
			// "Description is required"
			"description.required": "recheckDescription",
			// "Description needs to have at least 8 characters"
			"description.min": "recheckDescription",
			// "Description cannot exceed 120 characters"
			"description.max": "recheckDescription",
			// "Description can only have these symbols: - . _ @ : ; / #"
			"description.regex": "recheckDescription",
		}
	}

	get rules () {
		return {
			title: [
				rule("required"),
				rule("min", 8),
				rule("max", 60),
				rule("regex", /^(?!.*[^\s\w#./:;@-])[\s\w#./:;@-]*$/g),
			],
			link: [
				rule("required"),
				rule("max", 254),
				rule("regex", /^https?:\/\/(?:www\.)?([\w#%+.:=@~-]{1,256}\.[a-z]{2,63}|localhost)\b([\w#%+./:=?@~-]*)$/gi),
			],
			description: [
				rule("required"),
				rule("min", 8),
				rule("max", 120),
				rule("regex", /^(?!.*[^\s\w#./:;@-])[\s\w#./:;@-]*$/g),
			],
		}
	}

	get sanitizationRules () {
		return {
			title: [
				rule("trim"),
				rule("strip_links"),
				rule("strip_tags"),
				rule("escape"),
			],
			link: [
				rule("trim"),
				rule("strip_links"),
				rule("strip_tags"),
				rule("escape"),
			],
			description: [
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

module.exports = Job
