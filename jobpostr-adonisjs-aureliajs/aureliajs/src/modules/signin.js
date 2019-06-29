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
		isUsernameValid: (store) => store.state.pipe(
			pluck("present", "isUsernameValid"),
			distinctUntilChanged(),
		),
		isPasswordValid: (store) => store.state.pipe(
			pluck("present", "isPasswordValid"),
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
export class Signin {
	constructor (Router, EventAggregator, Store, HTTP) {
		this.router = Router
		this.ea = EventAggregator
		this.store = Store
		this.http = HTTP
		this.isDisabled = true

		registerActions(this.store, [
			{ name: "setToken", key: "setToken" },
			{ name: "toggleUsernameValid", key: "toggleUsernameValid" },
			{ name: "togglePasswordValid", key: "togglePasswordValid" },
		])
	}

	async canActivate (parameters, routeConfig, navigationInstruction) {
		if (this.router.isNavigatingFirst || this.router.isNavigatingRefresh) {
			await componentStateInit(this.store)
			await componentSignInInit(this.store, this.http, this.identifier)
		}

		if (this.isSignin) {
			return false
		}

		return true
	}

	canDeactivate () {
		unregisterActions(this.store, [
			{ key: "setToken" },
			{ key: "toggleUsernameValid" },
			{ key: "togglePasswordValid" },
		])

		return true
	}

	propertyChanged (stateName, newState, oldState) {
		setTimeout(() => {
			this.isDisabled = !(this.isUsernameValid && this.isPasswordValid)
		}, 0)
	}

	async submit (event) {
		event.preventDefault()

		const data = {
			identifier: this.identifier,
			token: this.token,
		}

		const formData = new FormData(document.querySelector("#signin"))

		for (const entry of formData.entries()) {
			data[entry[0]] = entry[1]
		}

		const response = await this.http
			.post({ url: "users/signin", obj: data }) || DEFAULT_RESPONSE_OBJECT

		if (response && response.success) {
			this.store.dispatch("toggleIsSignin", response.data.isSignin)
			this.store.dispatch("setUserId", response.data.userId)
			this.router.navigateToRoute("jobs")
		}
		else {
			if (response && Array.isArray(response.errors)) {
				for (const value of response.errors) this.ea.publish(value)
			}
			else {
				const error = document.querySelector("#submit-error")

				error.classList.remove("invisible")

				setTimeout(() => {
					error.classList.add("invisible")
				}, 7500)
			}
		}

		return false
	}
}
