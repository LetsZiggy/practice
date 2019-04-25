/* eslint-disable jasmine/prefer-toHaveBeenCalledWith, unicorn/no-null */

import { bootstrap } from "aurelia-bootstrapper"
import { StageComponent } from "aurelia-testing"
import { mockResponseObject } from "test/unit/helpers"

describe("Stage Nav-Header Component", () => {
	let component

	beforeEach(() => {
		component = StageComponent
			.withResources("resources/elements/nav-header")
			.inView(`<nav-header></nav-header>`)

		component.bootstrap((aurelia) => {
			aurelia.use
				.standardConfiguration()
				.plugin("aurelia-store", {
					initialState: {
						isSignin: null,
						username: "",
						userId: 0,
					},
					history: {
						undoable: true,
					},
				})
		})
	})

	afterEach(() => component.dispose())

	it("should display Sign-in when (viewModel.isSignin === false)", (done) => {
		component
			.manuallyHandleLifecycle()
			.create(bootstrap)
			.then(() => component.bind())
			.then(async () => {
				await component.viewModel.store
					.dispatch("toggleIsSignin", false)
			})
			.then(() => component.attached())
			.then(() => {
				const element = document
					.querySelectorAll("ul li a")
					.item(1)

				expect(element.textContent)
					.toBe("Sign-in")
			})
			.then(() => component.detached())
			.then(() => component.unbind())
			.then(done)
			.catch((error) => {
				fail(error)
				done()
			})
	})

	it("should display Sign-up when (viewModel.isSignin === false)", (done) => {
		component
			.manuallyHandleLifecycle()
			.create(bootstrap)
			.then(() => component.bind())
			.then(async () => {
				await component.viewModel.store
					.dispatch("toggleIsSignin", false)
			})
			.then(() => component.attached())
			.then(() => {
				const element = document
					.querySelectorAll("ul li a")
					.item(2)

				expect(element.textContent)
					.toBe("Sign-up")
			})
			.then(() => component.detached())
			.then(() => component.unbind())
			.then(done)
			.catch((error) => {
				fail(error)
				done()
			})
	})

	it("should display New-Job when (viewModel.isSignin === true)", (done) => {
		component
			.manuallyHandleLifecycle()
			.create(bootstrap)
			.then(() => component.bind())
			.then(async () => {
				await component.viewModel.store
					.dispatch("toggleIsSignin", true)
			})
			.then(() => component.attached())
			.then(() => {
				const element = document
					.querySelectorAll("ul li a")
					.item(1)

				expect(element.textContent)
					.toBe("New-Job")
			})
			.then(() => component.detached())
			.then(() => component.unbind())
			.then(done)
			.catch((error) => {
				fail(error)
				done()
			})
	})

	it("should display Sign-out when (viewModel.isSignin === true)", (done) => {
		component
			.manuallyHandleLifecycle()
			.create(bootstrap)
			.then(() => component.bind())
			.then(async () => {
				await component.viewModel.store
					.dispatch("toggleIsSignin", true)
			})
			.then(() => component.attached())
			.then(() => {
				const element = document
					.querySelector("ul li button")

				expect(element.textContent)
					.toBe("Sign-out")
			})
			.then(() => component.detached())
			.then(() => component.unbind())
			.then(done)
			.catch((error) => {
				fail(error)
				done()
			})
	})

	it("should run viewModel.signout when element.button (signout) clicked", (done) => {
		component
			.manuallyHandleLifecycle()
			.create(bootstrap)
			.then(() => component.bind())
			.then(async () => {
				await component.viewModel.store
					.dispatch("toggleIsSignin", true)
			})
			.then(() => component.attached())
			.then(() => {
				spyOn(component.viewModel, "signout")

				document
					.querySelector("ul li button")
					.click()

				expect(component.viewModel.signout)
					.toHaveBeenCalled()
			})
			.then(() => component.detached())
			.then(() => component.unbind())
			.then(done)
			.catch((error) => {
				fail(error)
				done()
			})
	})

	it("should call http.post when viewModel.signout called", (done) => {
		component
			.create(bootstrap)
			.then(async () => {
				await component.viewModel.store
					.dispatch("toggleIsSignin", true)

				spyOn(component.viewModel.http.http, "fetch")
					.and.resolveTo(mockResponseObject({ status: 200, statusText: "OK" }))

				spyOn(component.viewModel.store, "dispatch")
					.withArgs("toggleIsSignin").and.returnValue()
					.withArgs("setUsername").and.returnValue()
					.withArgs("setUserId").and.returnValue()

				spyOn(component.viewModel.router, "navigateToRoute")
					.and.callFake(() => {})
			})
			.then(async () => {
				await component.viewModel
				 .signout()

				expect(component.viewModel.http.http.fetch)
					.toHaveBeenCalledWith("users/signout", { method: "POST" })
			})
			.then(done)
			.catch((error) => {
				fail(error)
				done()
			})
	})

	it("should call store.dispatch when viewModel.signout called", (done) => {
		component
			.create(bootstrap)
			.then(async () => {
				await component.viewModel.store
					.dispatch("toggleIsSignin", true)

				spyOn(component.viewModel.http.http, "fetch")
					.and.resolveTo(mockResponseObject({ status: 200, statusText: "OK" }))

				spyOn(component.viewModel.store, "dispatch")
					.withArgs("toggleIsSignin").and.returnValue()
					.withArgs("setUsername").and.returnValue()
					.withArgs("setUserId").and.returnValue()

				spyOn(component.viewModel.router, "navigateToRoute")
					.and.callFake(() => {})
			})
			.then(async () => {
				await component.viewModel
				 .signout()

				expect(component.viewModel.store.dispatch)
					.toHaveBeenCalled()
			})
			.then(done)
			.catch((error) => {
				fail(error)
				done()
			})
	})

	it("should call router.navigateToRoute when viewModel.signout called", (done) => {
		component
			.create(bootstrap)
			.then(async () => {
				await component.viewModel.store
					.dispatch("toggleIsSignin", true)

				spyOn(component.viewModel.http.http, "fetch")
					.and.resolveTo(mockResponseObject({ status: 200, statusText: "OK" }))

				spyOn(component.viewModel.store, "dispatch")
					.withArgs("toggleIsSignin").and.returnValue()
					.withArgs("setUsername").and.returnValue()
					.withArgs("setUserId").and.returnValue()

				spyOn(component.viewModel.router, "navigateToRoute")
					.and.callFake(() => {})
			})
			.then(async () => {
				await component.viewModel
					.signout()

				expect(component.viewModel.router.navigateToRoute)
					.toHaveBeenCalled()
			})
			.then(done)
			.catch((error) => {
				fail(error)
				done()
			})
	})
})
