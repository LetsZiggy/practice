/* eslint-disable unicorn/no-array-for-each */

import { EventAggregator } from "aurelia-event-aggregator"
import { bindable, inject } from "aurelia-framework"
import { dispatchify } from "aurelia-store"
import { ValidationRules } from "aurelia-validation"
import { Validation } from "validation"

@inject(EventAggregator, Validation)
export class InputLink {
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
		dispatchify("toggleJobLinkValid")()
		const error = document.querySelector(`#${ this.elemId }-error`)

		this.rules = ValidationRules
			.ensure((object) => object.input)
			.displayName(this.elemId.toUpperCase())
			.required()
				.withMessageKey("required")
			.maxLength(254)
				.withMessageKey("maxLength")
			.satisfies((value) => (/^https?:\/\//gi).test(value))
				.withMessage(`needs to start with "http://" or "https://"`)
			.satisfies((value) => (/^https?:\/\/(?:www\.)?([\w#%+.:=@~-]{1,256}\.[a-z]{2,63}|localhost)\b([\w#%+./:=?@~-]*)$/gi).test(value))
				.withMessageKey("url")
			.rules

		this.validationCallback = (validation) => {
			dispatchify("toggleJobLinkValid")(validation.valid)

			this.valid = validation.valid
			error.textContent = (validation.valid)
				? ""
				: validation
					.results
					.find((result) => !result.valid)
					.message
		}

		this.subscription.push(this.ea.subscribe(`recheckJobLink`, () => {
			this.vc.validate({ object: this, rules: this.rules }, this.validationCallback)
		}))
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
