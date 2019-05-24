/* eslint-disable unicorn/no-array-for-each */

import { EventAggregator } from "aurelia-event-aggregator"
import { bindable, inject, observable } from "aurelia-framework"
import { dispatchify } from "aurelia-store"
import { ValidationRules } from "aurelia-validation"
import { Validation } from "validation"

@inject(EventAggregator, Validation)
export class InputPassword {
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
		const actionId = (this.elemId === "password_confirmation")
			? "PasswordConfirmation"
			: "Password"

		dispatchify(`toggle${ actionId }Valid`)()
		const error = document.querySelector(`#${ this.elemId }-error`)

		this.rules = (this.elemId === "password_confirmation")
			? ValidationRules
				.ensure((object) => object.input)
				.displayName(this.elemId.toUpperCase())
				.required()
					.withMessageKey("required")
				.satisfies((value) => value === this.password)
					.withMessage("is not matching")
				.rules
			: ValidationRules
				.ensure((object) => object.input)
				.displayName(this.elemId.toUpperCase())
				.required()
					.withMessageKey("required")
				.minLength(8)
					.withMessageKey("minLength")
				.maxLength(60)
					.withMessageKey("maxLength")
				.satisfies((value) => (/^(?=.*[A-Z])/g).test(value))
					.withMessage("needs to have an uppercase letter")
				.satisfies((value) => (/^(?=.*[a-z])/g).test(value))
					.withMessage("needs to have a lowercase letter")
				.satisfies((value) => (/^(?=.*\d)/g).test(value))
					.withMessage("needs to have a number")
				.satisfies((value) => (/^(?=.*[!#$%*;@^])/g).test(value))
					.withMessage("needs to have a symbol: ! @ # $ % ^ * ;")
				.satisfies((value) => (/^(?!.*\s+)/g).test(value))
					.withMessage("cannot have spaces")
				.rules

		this.validationCallback = (validation) => {
			dispatchify(`toggle${ actionId }Valid`)(validation.valid)

			this.valid = validation.valid
			error.textContent = (validation.valid)
				? ""
				: validation
					.results
					.find((result) => !result.valid)
					.message
		}

		if (this.elemId === "password_confirmation") {
			this.password = ""
			this.subscription.push(this.ea.subscribe("checkIdentical", (payload) => {
				this.password = payload
				this.vc.validate({ object: this, rules: this.rules }, this.validationCallback)
			}))
		}
		else {
			this.subscription.push(this.ea.subscribe("recheckPassword", () => {
				this.vc.validate({ object: this, rules: this.rules }, this.validationCallback)
				this.ea.publish("checkIdentical", this.input)
			}))
		}
	}

	detached () {
		this.subscription.forEach((subscribe) => subscribe.dispose())
		while (this.subscription.length > 0) { this.subscription.pop() }
	}

	inputChanged (newState, oldState) {
		setTimeout(() => {
			this.vc.validate({ object: this, rules: this.rules }, this.validationCallback)

			if (this.elemId === "password") {
				this.ea.publish("checkIdentical", this.input)
			}
		}, 0)
	}
}
