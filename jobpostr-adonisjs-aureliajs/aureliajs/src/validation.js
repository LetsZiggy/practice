/* eslint-disable no-useless-escape */

import { NewInstance, inject } from "aurelia-framework"
import { ValidationController, validateTrigger, validationMessages } from "aurelia-validation"

validationMessages.required = "is required"
validationMessages.email = "needs to be a valid email address"
validationMessages.url = "needs to be a valid URL"
validationMessages.minLength = "needs at least \${ $config.length } characters"
validationMessages.maxLength = "cannot exceed \${ $config.length } characters"

@inject(NewInstance.of(ValidationController))
export class Validation {
	constructor (ValidationController) {
		this.vc = ValidationController
		this.vc.validateTrigger = validateTrigger.manual
	}

	validate (data, callback) {
		return this.vc
			.validate(data)
			.then(callback)
	}
}
