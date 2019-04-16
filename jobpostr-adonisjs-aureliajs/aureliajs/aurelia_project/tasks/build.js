import { CLIOptions, build as buildCLI } from "aurelia-cli"
import del from "del"
import gulp from "gulp"
import project from "../aurelia.json"
import copyFiles from "./copy-files"
import processCSS from "./process-css"
import processJson from "./process-json"
import processMarkup from "./process-markup"
import transpile from "./transpile"
import watch from "./watch"

function clean () {
	return del(project.platform.output)
}

const build = gulp.series(
	readProjectConfiguration,
	gulp.parallel(
		transpile,
		processMarkup,
		processJson,
		processCSS,
		copyFiles,
	),
	writeBundles,
)

const main = CLIOptions.taskName() === "build" && CLIOptions.hasFlag("watch")
	? gulp.series(
		clean,
		build,
		(done) => {
			watch()
			done()
		},
	)
	: gulp.series(
		clean,
		build,
	)

function readProjectConfiguration () {
	return buildCLI.src(project)
}

function writeBundles () {
	return buildCLI.dest()
}

export { main as default }
