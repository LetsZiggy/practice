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

		window.addEventListener("unload", (event) => {
			const data = new FormData()

			data.append(
				"token",
				document.head.querySelector(`meta[name="token"]`).content,
			)

			navigator.sendBeacon("/api/users/end-session", data)
		})
	}

	configureRouter (config, router) {
		this.router = router
		config.title = "JobPostr"
		config.map([
			{
				route: "",
				redirect: "jobs",
			},
			{
				route: "jobs",
				name: "jobs",
				moduleId: "modules/jobs",
				nav: true,
				title: "Jobs",
			},
			{
				route: "signin",
				name: "signin",
				moduleId: "modules/signin",
				nav: true,
				title: "Sign-in",
			},
			{
				route: "signup",
				name: "signup",
				moduleId: "modules/signup",
				nav: true,
				title: "Sign-up",
			},
			{
				route: "new-job",
				name: "new-job",
				moduleId: "modules/new-job",
				nav: true,
				title: "New Job",
			},
			{
				route: "edit-job/:id",
				name: "edit-job",
				moduleId: "modules/edit-job",
				nav: true,
				title: "Edit Job",
				href: `#/edit-job`,
			},
		])

		config.mapUnknownRoutes("jobs")
		config.fallbackRoute("jobs")
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
