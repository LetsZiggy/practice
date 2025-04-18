import { CLIOptions, Project, ProjectItem, UI } from "aurelia-cli"
import { inject } from "aurelia-dependency-injection"

@inject(Project, CLIOptions, UI)
export default class BindingBehaviorGenerator {
	constructor (project, options, ui) {
		this.project = project
		this.options = options
		this.ui = ui
	}

	async execute () {
		const name = await this.ui.ensureAnswer(
			this.options.args[0],
			"What would you like to call the binding behavior?",
		)

		const fileName = this.project.makeFileName(name)
		const className = this.project.makeClassName(name)

		this.project.bindingBehaviors.add(ProjectItem.text(`${ fileName }.js`, this.generateSource(className)))

		await this.project.commitChanges()
		await this.ui.log(`Created ${ fileName }.`)
	}

	generateSource (className) {
		return `export class ${ className }BindingBehavior {
	bind (binding, source) {}

	unbind (binding, source) {}
}
`
	}
}
