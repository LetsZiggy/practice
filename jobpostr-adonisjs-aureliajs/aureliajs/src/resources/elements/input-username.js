/* eslint-disable unicorn/no-array-for-each */

import { EventAggregator } from "aurelia-event-aggregator"
import { bindable, inject, observable } from "aurelia-framework"
import { dispatchify } from "aurelia-store"
import { ValidationRules } from "aurelia-validation"
import { Validation } from "validation"

@inject(EventAggregator, Validation)
export class InputUsername {
	valid = true

	@bindable()
	elemId

	@observable()
	input

	constructor (EventAggregator, Validation) {
		this.ea = EventAggregator
		this.vc = Validation
		this.subscription = []
	}

	attached () {
		dispatchify("setUsername")()
		dispatchify("toggleUsernameValid")()
		const error = document.querySelector(`#${ this.elemId }-error`)

		this.rules = ValidationRules
			.ensure((object) => object.input)
			.displayName(this.elemId.toUpperCase())
			.required()
				.withMessageKey("required")
			.minLength(4)
				.withMessageKey("minLength")
			.maxLength(80)
				.withMessageKey("maxLength")
			.satisfies((value) => (/^(?!.*[^\w.-])[\w.-]*$/g).test(value))
				.withMessage("can only have these symbols: - . _")
			.rules

		this.validationCallback = (validation) => {
			dispatchify("toggleUsernameValid")(validation.valid)

			this.valid = validation.valid
			error.textContent = (validation.valid)
				? ""
				: validation
					.results
					.find((result) => !result.valid)
					.message

			if (this.valid) {
				dispatchify("setUsername")(this.input)
			}
		}

		this.subscription.push(
			this.ea.subscribe("recheckUsername", () => {
				this.vc.validate({ object: this, rules: this.rules }, this.validationCallback)
			}),
			this.ea.subscribe("notUniqueUsername", () => {
				dispatchify("setUsername")()
				dispatchify("toggleUsernameValid")()
				error.textContent = "has already been taken"
				error.classList.remove("hidden")

				setTimeout(() => {
					error.textContent = ""
					error.classList.add("hidden")
				}, 7500)
			}),
		)

		setTimeout(() => document.querySelector(`#${ this.elemId }`).focus(), 200)
	}

	detached () {
		this.subscription.forEach((subscribe) => subscribe.dispose())
		while (this.subscription.length > 0) { this.subscription.pop() }
	}

	inputChanged (newState, oldState) {
		setTimeout(() => {
			this.vc.validate({ object: this, rules: this.rules }, this.validationCallback)
		}, 0)
	}
}
