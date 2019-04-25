import { bootstrap } from "aurelia-bootstrapper"
import { StageComponent } from "aurelia-testing"

describe("Stage Sign-Up Component", () => {
	let component

	beforeEach(() => {
		component = StageComponent
			.withResources("modules/signup")
			.inView("<signup></signup>")
	})

	afterEach(() => component.dispose())

	it("should render message", (done) => {
		component
			.create(bootstrap)
			.then(() => {
				const view = document.querySelector("h1")

				expect(view.textContent.trim())
					.toBe("Sign Up")

				done()
			})
			.catch((error) => {
				fail(error)
				done()
			})
	})
})
