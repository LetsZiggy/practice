import { bootstrap } from "aurelia-bootstrapper"
import { StageComponent } from "aurelia-testing"

describe("Stage Edit-Job Component", () => {
	let component

	beforeEach(() => {
		component = StageComponent
			.withResources("modules/edit-job")
			.inView("<edit-job></edit-job>")
	})

	afterEach(() => component.dispose())

	it("should render message", (done) => {
		component
			.create(bootstrap)
			.then(() => {
				const view = document.querySelector("h1")

				expect(view.textContent.trim())
					.toBe("Edit Job")

				done()
			})
			.catch((error) => {
				fail(error)
				done()
			})
	})
})
