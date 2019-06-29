/* eslint-disable unicorn/no-array-for-each */

import { HTTP } from "http"
import { EventAggregator } from "aurelia-event-aggregator"
import { inject } from "aurelia-framework"
import { Router } from "aurelia-router"
import { Store, connectTo } from "aurelia-store"
import { distinctUntilChanged, pluck } from "rxjs/operators"
import { registerActions, unregisterActions } from "store-actions"
import { DEFAULT_RESPONSE_OBJECT, componentSignInInit, componentStateInit } from "./component-service"

// https://rxjs-dev.firebaseapp.com/api/operators/pluck
// https://www.learnrxjs.io/operators/transformation/pluck.html
@connectTo({
	setup: "canActivate",
	selector: {
		isSignin: (store) => store.state.pipe(
			pluck("present", "isSignin"),
			distinctUntilChanged(),
		),
		userId: (store) => store.state.pipe(
			pluck("present", "userId"),
			distinctUntilChanged(),
		),
		isJobTitleValid: (store) => store.state.pipe(
			pluck("present", "isJobTitleValid"),
			distinctUntilChanged(),
		),
		isJobLinkValid: (store) => store.state.pipe(
			pluck("present", "isJobLinkValid"),
			distinctUntilChanged(),
		),
		isJobDescriptionValid: (store) => store.state.pipe(
			pluck("present", "isJobDescriptionValid"),
			distinctUntilChanged(),
		),
		jobs: (store) => store.state.pipe(
			pluck("present", "jobs"),
			distinctUntilChanged(),
		),
		identifier: (store) => store.state.pipe(
			pluck("present", "identifier"),
			distinctUntilChanged(),
		),
		token: (store) => store.state.pipe(
			pluck("present", "token"),
			distinctUntilChanged(),
		),
	},
})
@inject(Router, EventAggregator, Store, HTTP)
export class EditJob {
	constructor (Router, EventAggregator, Store, HTTP) {
		this.router = Router
		this.ea = EventAggregator
		this.store = Store
		this.http = HTTP
		this.isDisabled = true

		registerActions(this.store, [
			{ name: "setToken", key: "setToken" },
			{ name: "updateJob", key: "updateJob" },
			{ name: "deleteJob", key: "deleteJob" },
			{ name: "toggleJobTitleValid", key: "toggleJobTitleValid" },
			{ name: "toggleJobDescriptionValid", key: "toggleJobDescriptionValid" },
			{ name: "toggleJobLinkValid", key: "toggleJobLinkValid" },
		])
	}

	async canActivate (parameters, routeConfig, navigationInstruction) {
		if (this.router.isNavigatingFirst || this.router.isNavigatingRefresh) {
			await componentStateInit(this.store)

			if (this.jobs.length === 0) {
				return false
			}

			await componentSignInInit(this.store, this.http, this.identifier)
		}

		this.job = this.jobs
			.find((value) => value.id === Number(parameters.id))

		if (!this.isSignin || (this.job.user_id !== this.userId)) {
			return false
		}

		return true
	}

	canDeactivate () {
		unregisterActions(this.store, [
			{ key: "setToken" },
			{ key: "updateJob" },
			{ key: "deleteJob" },
			{ key: "toggleJobTitleValid" },
			{ key: "toggleJobDescriptionValid" },
			{ key: "toggleJobLinkValid" },
		])

		return true
	}

	propertyChanged (stateName, newState, oldState) {
		setTimeout(() => {
			this.isDisabled = !(this.isJobTitleValid && this.isJobLinkValid && this.isJobDescriptionValid)
		}, 0)
	}

	async delete () {
		const data = {
			token: this.token,
			id: this.job.id,
			user_id: this.userId,
		}

		const response = await this.http
			.post({ url: "jobs/delete-job", obj: data }) || DEFAULT_RESPONSE_OBJECT

		if (response && response.success) {
			await this.store.dispatch("deleteJob", data)
			this.router.navigateToRoute("jobs")
		}
		else {
			const error = document.querySelector("#submit-error")

			error.textContent = response && Array.isArray(response.errors) ? "We're experiencing server issues. Please try again later." : response.errors

			error.classList.remove("invisible")

			setTimeout(() => {
				error.classList.add("invisible")
				error.textContent = ""
				this.router.navigateToRoute("jobs")
			}, 7500)
		}

		return true
	}

	async submit (event) {
		event.preventDefault()

		const data = {
			token: this.token,
			id: this.job.id,
			user_id: this.userId,
		}

		const formData = new FormData(document.querySelector("#edit-job"))

		for (const entry of formData.entries()) {
			data[entry[0]] = entry[1]
		}

		const response = await this.http
			.post({ url: "jobs/edit-job", obj: data }) || DEFAULT_RESPONSE_OBJECT

		if (response && response.success) {
			await this.store.dispatch("updateJob", data)
			this.router.navigateToRoute("jobs")
		}
		else {
			if (response && Array.isArray(response.errors)) {
				response.errors.forEach((value) => this.ea.publish(value))
			}
			else {
				const error = document.querySelector("#submit-error")

				error.textContent = response.errors
				error.classList.remove("invisible")

				setTimeout(() => {
					error.classList.add("invisible")
					error.textContent = ""
					this.router.navigateToRoute("jobs")
				}, 7500)
			}
		}

		return false
	}
}
