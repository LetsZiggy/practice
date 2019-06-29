import { HTTP } from "http"
import { inject } from "aurelia-framework"
import { Router } from "aurelia-router"
import { Store, connectTo } from "aurelia-store"
import { distinctUntilChanged, pluck } from "rxjs/operators"
import { registerActions, unregisterActions } from "store-actions"

// https://rxjs-dev.firebaseapp.com/api/operators/pluck
// https://www.learnrxjs.io/operators/transformation/pluck.html
@connectTo({
	selector: {
		isSignin: (store) => store.state.pipe(
			pluck("present", "isSignin"),
			distinctUntilChanged(),
		),
	},
})
@inject(Router, Store, HTTP)
export class NavHeader {
	constructor (Router, Store, HTTP) {
		this.router = Router
		this.store = Store
		this.http = HTTP

		registerActions(this.store, [
			{ name: "setIdentifier", key: "setIdentifier" },
			{ name: "toggleIsSignin", key: "toggleIsSignin" },
			{ name: "setUsername", key: "setUsername" },
			{ name: "setUserId", key: "setUserId" },
		])
	}

	detached () {
		unregisterActions(this.store, [
			{ key: "setIdentifier" },
			{ key: "toggleIsSignin" },
			{ key: "setUsername" },
			{ key: "setUserId" },
		])
	}

	async signout () {
		const response = await this.http.post({ url: "users/signout" })

		this.store.dispatch("setIdentifier", response.data.identifier)
		this.store.dispatch("toggleIsSignin")
		this.store.dispatch("setUsername")
		this.store.dispatch("setUserId")
		this.router.navigateToRoute("jobs")
	}
}
