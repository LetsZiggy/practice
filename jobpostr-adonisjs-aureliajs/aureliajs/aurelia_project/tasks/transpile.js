/* eslint-disable unicorn/no-null */

import { unlink } from "fs"
import { Transform } from "stream"
import { CLIOptions, Configuration, build } from "aurelia-cli"
import gulp from "gulp"
import babel from "gulp-babel"
import cache from "gulp-cache"
import gulpIf from "gulp-if"
import plumber from "gulp-plumber"
import rename from "gulp-rename"
import project from "../aurelia.json"

const environment = CLIOptions.getEnvironment()
const buildOptions = new Configuration(project.build.options)
const useCache = buildOptions.isApplicable("cache")

function configureEnvironment () {
	return gulp
		.src(`aurelia_project/environments/${ environment }.js`, {
			since: gulp.lastRun(configureEnvironment),
		})
		.pipe(rename("environment.js"))
		.pipe(new Transform({
			objectMode: true,
			transform: function (file, _, callback) {
				// https://github.com/aurelia/cli/issues/1031
				unlink(`${ project.paths.root }/${ file.relative }`, function () {
					callback(null, file)
				})
			},
		}))
		.pipe(gulp.dest(project.paths.root))
}

function buildJavaScript () {
	let transpile = babel(project.transpiler.options)

	if (useCache) {
		// the cache directory is "gulp-cache/projName-env" inside folder require("os").tmpdir()
		// use command "au clear-cache" to purge all caches
		transpile = cache(transpile, {
			name: project.name + "-" + environment,
		})
	}

	return gulp
		.src(project.transpiler.source, {
			sourcemaps: true,
			since: gulp.lastRun(buildJavaScript),
		})
		.pipe(gulpIf(CLIOptions.hasFlag("watch"), plumber()))
		.pipe(transpile)
		.pipe(build.bundle())
}

export default gulp.series(
	configureEnvironment,
	buildJavaScript,
)
