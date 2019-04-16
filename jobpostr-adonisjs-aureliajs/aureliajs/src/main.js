import environment from "environment"
import { initialState } from "state"

export function configure (aurelia) {
	aurelia.use
		.standardConfiguration()
		.developmentLogging(environment.debug ? "debug" : "warn")
		.feature("resources")
		.plugin("aurelia-validation")
		.plugin("aurelia-store", {
			initialState,
			// measurePerformance: "all",
			// logDispatchedActions: true,
			// logDefinitions: {
			// 	dispatchedActions: "debug",
			// 	performanceLog: "debug",
			// },
			// propagateError: true,
			history: {
				undoable: true,
				limit: 10,
			},
		})

	if (environment.testing) {
		aurelia.use
			.plugin("aurelia-testing")
	}

	aurelia
		.start()
		.then(() => aurelia.setRoot())
}
