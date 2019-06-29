import { HTTP } from "http"
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
		username: (store) => store.state.pipe(
			pluck("present", "username"),
			distinctUntilChanged(),
		),
		jobs: (store) => store.state.pipe(
			pluck("present", "jobs"),
			distinctUntilChanged(),
		),
		jobsLastUpdate: (store) => store.state.pipe(
			pluck("present", "jobsLastUpdate"),
			distinctUntilChanged(),
		),
		identifier: (store) => store.state.pipe(
			pluck("present", "identifier"),
			distinctUntilChanged(),
		),
	},
})
@inject(Router, Store, HTTP)
export class Jobs {
	constructor (Router, Store, HTTP) {
		this.router = Router
		this.store = Store
		this.http = HTTP

		registerActions(this.store, [
			{ name: "setToken", key: "setToken" },
			{ name: "setJobsLastUpdate", key: "setJobsLastUpdate" },
			{ name: "setJobs", key: "setJobs" },
		])
	}

	async canActivate (parameters, routeConfig, navigationInstruction) {
		if (this.router.isNavigatingFirst || this.router.isNavigatingRefresh) {
			await componentStateInit(this.store)
			await componentSignInInit(this.store, this.http, this.identifier)
		}

		return true
	}

	async activate (parameters, routeConfig, navigationInstruction) {
		if (this.jobs.length === 0 && ((Date.now() - this.jobsLastUpdate) > 360_000)) {
			const response = await this.http
				.get({ url: "jobs/list" }) || DEFAULT_RESPONSE_OBJECT

			if (response && response.success) {
				this.store.dispatch("setJobs", { data: response.data.jobs, type: "full" })
			}
		}
		else {
			const response = await this.http
				.get({ url: `jobs/list/?t=${ this.jobsLastUpdate }` }) || DEFAULT_RESPONSE_OBJECT

			if (response && response.success && response.data.jobs.length > 0) {
				this.store.dispatch("setJobs", { data: response.data.jobs, type: "partial" })
			}
		}

		this.store.dispatch("setJobsLastUpdate")
	}

	canDeactivate () {
		unregisterActions(this.store, [
			{ key: "setToken" },
			{ key: "setJobsLastUpdate" },
			{ key: "setJobs" },
		])

		return true
	}
}
