/* eslint-disable unicorn/no-null */

import { HttpClient, json } from "aurelia-fetch-client"
import { inject } from "aurelia-framework"

@inject(HttpClient)
export class HTTP {
	constructor (HttpClient) {
		HttpClient.configure((config) => {
			config
				.withBaseUrl("api/")
				// .useStandardConfiguration()
				.withDefaults({
					mode: "same-origin", // cors | same-origin
					credentials: "same-origin", // same-origin | include
					headers: {
						"Accept": "application/json",
						"X-Requested-With": "Fetch",
					},
				})
				/*
				.withInterceptor({
					request (request) {
						return request
					},
					requestError (error) {
						let headers = {}

						for (let entry of error.headers.entries()) {
							headers[entry[0]] = entry[1]
						}

						console.log("requestError", error)
						console.log("requestErrorHeaders", headers)
					},
					response (response) {
						return response
					},
					responseError (error) {
						let headers = {}

						for (let entry of error.headers.entries()) {
							headers[entry[0]] = entry[1]
						}

						console.log("responseError", error)
						console.log("responseErrorHeaders", headers)
					},
				})
				*/
		})

		this.http = HttpClient
	}

	delete ({ obj: object = null, url }) {
		const data = { method: "DELETE" }

		if (object) {
			data.headers = { "Content-Type": "application/json" }
			data.body = json(object)
		}

		return this.fetch(url, data)
	}

	fetch (resource, init) {
		return (
			this.http
				.fetch(resource, init)
				.then((response) => response.json())
				.then((data) => data)
				.catch((error) => {
					console.log(error)
				})
		)
	}

	get ({ url }) {
		const data = { method: "GET" }

		return this.fetch(url, data)
	}

	patch ({ obj: object = null, url }) {
		const data = { method: "PATCH" }

		if (object) {
			data.headers = { "Content-Type": "application/json" }
			data.body = json(object)
		}

		return this.fetch(url, data)
	}

	post ({ obj: object = null, url }) {
		const data = { method: "POST" }

		if (object) {
			data.headers = { "Content-Type": "application/json" }
			data.body = json(object)
		}

		return this.fetch(url, data)
	}

	put ({ obj: object = null, url }) {
		const data = { method: "PUT" }

		if (object) {
			data.headers = { "Content-Type": "application/json" }
			data.body = json(object)
		}

		return this.fetch(url, data)
	}
}
