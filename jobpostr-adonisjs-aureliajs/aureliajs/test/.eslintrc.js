const path = require("path")
const rootSettings = require("../.eslintrc")

module.exports = {
	...rootSettings,
	"extends": [
		...rootSettings.extends,
		"plugin:jasmine/recommended",
	],
	"plugins": [
		...rootSettings.plugins,
		"jasmine",
	],
	"env": {
		...rootSettings.env,
		jasmine: true,
	},
	// "overrides": [],
}
