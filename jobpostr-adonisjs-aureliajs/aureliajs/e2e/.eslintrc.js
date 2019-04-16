const path = require("path")
const rootSettings = require("../.eslintrc")

module.exports = {
	...rootSettings,
	"extends": [
		...rootSettings.extends,
		"plugin:playwright/playwright-test",
	],
	"plugins": [
		...rootSettings.plugins,
		"playwright",
	],
	"env": {
		...rootSettings.env,
		"shared-node-browser": true,
	},
	// "overrides": [],
}
