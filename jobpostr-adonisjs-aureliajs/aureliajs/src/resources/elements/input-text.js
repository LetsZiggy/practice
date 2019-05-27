/* eslint-disable unicorn/no-array-for-each */

import { EventAggregator } from "aurelia-event-aggregator"
import { bindable, inject } from "aurelia-framework"
import { dispatchify } from "aurelia-store"
import { ValidationRules } from "aurelia-validation"
import { Validation } from "validation"

@inject(EventAggregator, Validation)
export class InputText {
	valid = true

	@bindable()
	elemId

	@bindable()
	input

	constructor (EventAggregator, Validation) {
		this.ea = EventAggregator
		this.vc = Validation
		this.subscription = []
	}

	attached () {
		const actionId = (this.elemId === "title")
			? "Title"
			: "Description"

		dispatchify(`toggleJob${ actionId }Valid`)()
		const error = document.querySelector(`#${ this.elemId }-error`)
		const maxLength = (this.elemId === "title")
			? 60
			: 120

		this.rules = ValidationRules
			.ensure((object) => object.input)
			.displayName(this.elemId.toUpperCase())
			.required()
				.withMessageKey("required")
			.minLength(8)
				.withMessageKey("minLength")
			.maxLength(maxLength)
				.withMessageKey("maxLength")
			.satisfies((value) => (/^(?!.*[^\s\w#./:;@-])[\s\w#./:;@-]*$/g).test(value))
				.withMessage("can only have these symbols: - . _ @ : ; / #")
			.rules

		this.validationCallback = (validation) => {
			dispatchify(`toggleJob${ actionId }Valid`)(validation.valid)

			this.valid = validation.valid
			error.textContent = (validation.valid)
				? ""
				: validation
					.results
					.find((result) => !result.valid)
					.message
		}

		this.subscription.push(this.ea.subscribe(`recheckJob${ actionId }`, () => {
			this.vc.validate({ object: this, rules: this.rules }, this.validationCallback)
		}))

		if (this.elemId === "title") {
			setTimeout(() => document.querySelector(`#${ this.elemId }`).focus(), 200)
		}
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
