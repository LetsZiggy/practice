import path from "path"
import gulp from "gulp"
import minimatch from "minimatch"
import project from "../aurelia.json"

export default function copyFiles (done) {
	if (typeof project.build.copyFiles !== "object") {
		done()

		return
	}

	const instruction = getNormalizedInstruction()
	const files = Object.keys(instruction)

	return gulp
		.src(files, {
			since: gulp.lastRun(copyFiles),
		})
		.pipe(gulp.dest((x) => {
			const filePath = prepareFilePath(x.path)
			const key = files.find((f) => minimatch(filePath, f))

			return instruction[key]
		}))
}

function getNormalizedInstruction () {
	const files = project.build.copyFiles
	const normalizedInstruction = {}

	for (const key in files) {
		normalizedInstruction[path.posix.normalize(key)] = files[key]
	}

	return normalizedInstruction
}

function prepareFilePath (filePath) {
	let preparedPath = filePath.replace(process.cwd(), "").slice(1)

	// if we are running on windows we have to fix the path
	if (process.platform.startsWith("win")) {
		preparedPath = preparedPath.replaceAll("\\", "/")
	}

	return preparedPath
}
