/* eslint-disable unicorn/no-array-for-each */

import { EventAggregator } from "aurelia-event-aggregator"
import { bindable, inject, observable } from "aurelia-framework"
import { dispatchify } from "aurelia-store"
import { ValidationRules } from "aurelia-validation"
import { Validation } from "validation"

@inject(EventAggregator, Validation)
export class InputEmail {
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
		dispatchify("toggleEmailValid")()
		const error = document.querySelector(`#${ this.elemId }-error`)

		this.rules = ValidationRules
			.ensure((object) => object.input)
			.displayName(this.elemId.toUpperCase())
			.required()
				.withMessageKey("required")
			.maxLength(254)
				.withMessageKey("maxLength")
			.satisfies((value) => (/^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])+)*$/).test(value))
				.withMessageKey("email")
			.rules

		this.validationCallback = (validation) => {
			dispatchify("toggleEmailValid")(validation.valid)

			this.valid = validation.valid
			error.textContent = (validation.valid)
				? ""
				: validation
					.results
					.find((result) => !result.valid)
					.message
		}

		this.subscription.push(
			this.ea.subscribe("recheckEmail", () => {
				this.vc.validate({ object: this, rules: this.rules }, this.validationCallback)
			}),
			this.ea.subscribe("notUniqueEmail", () => {
				dispatchify("toggleEmailValid")()
				error.textContent = "has already been registered"
				error.classList.remove("hidden")

				setTimeout(() => {
					error.textContent = ""
					error.classList.add("hidden")
				}, 7500)
			}),
		)
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
