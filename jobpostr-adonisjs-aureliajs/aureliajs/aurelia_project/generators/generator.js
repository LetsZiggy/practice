import { CLIOptions, Project, ProjectItem, UI } from "aurelia-cli"
import { inject } from "aurelia-dependency-injection"

@inject(Project, CLIOptions, UI)
export default class GeneratorGenerator {
	constructor (project, options, ui) {
		this.project = project
		this.options = options
		this.ui = ui
	}

	async execute () {
		const name = await this.ui.ensureAnswer(
			this.options.args[0],
			"What would you like to call the generator?",
		)

		const fileName = this.project.makeFileName(name)
		const className = this.project.makeClassName(name)

		this.project.generators.add(ProjectItem.text(`${ fileName }.js`, this.generateSource(className)))

		await this.project.commitChanges()
		await this.ui.log(`Created ${ fileName }.`)
	}

	generateSource (className) {
		return `import { inject } from "aurelia-dependency-injection"
import { Project, ProjectItem, CLIOptions, UI } from "aurelia-cli"

@inject(Project, CLIOptions, UI)
export default class ${ className }Generator {
	constructor (Project, CLIOptions, UI) {
		this.project = Project
		this.options = CLIOptions
		this.ui = UI
	}

	execute () {
		return this.ui
			.ensureAnswer(this.options.args[0], "What would you like to call the new item?")
			.then(name => {
				let fileName = this.project.makeFileName(name)
				let className = this.project.makeClassName(name)

				this.project.elements.add(
					ProjectItem.text(\`\${ fileName }.js\`, this.generateSource(className))
				)

				return this.project.commitChanges()
					.then(() => this.ui.log(\`Created \${ fileName }.\`))
			})
	}

	generateSource (className) {
return \`import { bindable } from "aurelia-framework"

export class \${ className } {
	@bindable value

	valueChanged (newValue, oldValue) {}
}
\`
	}
}
`
	}
}
