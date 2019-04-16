import { inject } from "aurelia-framework"
import { Store/* , localStorageMiddleware, logMiddleware, rehydrateFromLocalStorage */ } from "aurelia-store"
// import { registerActions, unregisterActions } from "store-actions"
// import { registerMiddlewares, unregisterMiddlewares } from "store-middlewares"

@inject(Store)
export class App {
	constructor (Store) {
		this.store = Store

		// registerMiddlewares(this.store, [
		// 	{ key: localStorageMiddleware, placement: "After", options: { key: "jobpostr" } },
		// 	// { key: logMiddleware, placement: "After", options: { logType: "debug" }},
		// ])

		// registerActions(this.store, [
		// 	{ name: "rehydrateFromLocalStorage", key: rehydrateFromLocalStorage },
		// ])

		this.message = "JobPostr"
	}

	detached () {
		// unregisterActions(this.store, [
		// 	{ key: rehydrateFromLocalStorage },
		// ])

		// unregisterMiddlewares(this.store, [
		// 	{ key: localStorageMiddleware },
		// 	// { key: logMiddleware },
		// ])
	}
}
