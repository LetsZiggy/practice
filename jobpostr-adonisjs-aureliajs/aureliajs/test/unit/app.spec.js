import { bootstrap } from "aurelia-bootstrapper"
import { StageComponent } from "aurelia-testing"

describe("Stage App Component", () => {
	let component

	beforeEach(() => {
		component = StageComponent
			.withResources("app")
			.inView("<app></app>")
	})

	afterEach(() => component.dispose())

	it("should render message", (done) => {
		component
			.create(bootstrap)
			.then(() => {
				const view = document.querySelector("h1")

				expect(view.textContent.trim())
					.toBe("JobPostr")

				done()
			})
			.catch((error) => {
				fail(error)
				done()
			})
	})
})
