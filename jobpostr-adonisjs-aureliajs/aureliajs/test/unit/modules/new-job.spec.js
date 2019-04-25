import { bootstrap } from "aurelia-bootstrapper"
import { StageComponent } from "aurelia-testing"

describe("Stage New-Job Component", () => {
	let component

	beforeEach(() => {
		component = StageComponent
			.withResources("modules/new-job")
			.inView("<new-job></new-job>")
	})

	afterEach(() => component.dispose())

	it("should render message", (done) => {
		component
			.create(bootstrap)
			.then(() => {
				const view = document.querySelector("h1")

				expect(view.textContent.trim())
					.toBe("New Job")

				done()
			})
			.catch((error) => {
				fail(error)
				done()
			})
	})
})
