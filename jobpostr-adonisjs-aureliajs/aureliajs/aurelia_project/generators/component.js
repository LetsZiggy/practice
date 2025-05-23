import path from "path"
import { CLIOptions, Project, ProjectItem, UI } from "aurelia-cli"
import { inject } from "aurelia-dependency-injection"

@inject(Project, CLIOptions, UI)
export default class ElementGenerator {
	constructor (project, options, ui) {
		this.project = project
		this.options = options
		this.ui = ui
	}

	async execute () {
		const name = await this.ui.ensureAnswer(
			this.options.args[0],
			"What would you like to call the component?",
		)

		const subFolders = await this.ui.ensureAnswer(
			this.options.args[1],
			"What sub-folder would you like to add it to?\nIf it doesn't exist it will be created for you.\n\nDefault folder is the source folder (src).",
			".",
		)

		const fileName = this.project.makeFileName(name)
		const className = this.project.makeClassName(name)

		this.project.root.add(
			ProjectItem.text(path.join(subFolders, fileName + ".js"), this.generateJSSource(className)),
			ProjectItem.text(path.join(subFolders, fileName + ".html"), this.generateHTMLSource(className)),
		)

		await this.project.commitChanges()
		await this.ui.log(`Created ${ name } in the "${ path.join(this.project.root.name, subFolders) }" folder`)
	}

	generateHTMLSource (className) {
		return `<template>
	<h1>\${ message }</h1>
</template>
`
	}

	generateJSSource (className) {
		return `export class ${ className } {
	constructor () {
		this.message = "Hello world"
	}
}
`
	}
}
