import { bootstrap } from "aurelia-bootstrapper"
import { StageComponent } from "aurelia-testing"

describe("Stage Jobs Component", () => {
	let component

	beforeEach(() => {
		component = StageComponent
			.withResources("modules/jobs")
			.inView("<jobs></jobs>")
	})

	afterEach(() => component.dispose())

	it("should render message", (done) => {
		component
			.create(bootstrap)
			.then(() => {
				const view = document.querySelector("h1")

				expect(view.textContent.trim())
					.toBe("Jobs List")

				done()
			})
			.catch((error) => {
				fail(error)
				done()
			})
	})
})
