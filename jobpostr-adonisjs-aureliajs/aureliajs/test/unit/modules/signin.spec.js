import { bootstrap } from "aurelia-bootstrapper"
import { StageComponent } from "aurelia-testing"

describe("Stage Sign-In Component", () => {
	let component

	beforeEach(() => {
		component = StageComponent
			.withResources("modules/signin")
			.inView("<signin></signin>")
	})

	afterEach(() => component.dispose())

	it("should render message", (done) => {
		component
			.create(bootstrap)
			.then(() => {
				const view = document.querySelector("h1")

				expect(view.textContent.trim())
					.toBe("Sign In")

				done()
			})
			.catch((error) => {
				fail(error)
				done()
			})
	})
})
