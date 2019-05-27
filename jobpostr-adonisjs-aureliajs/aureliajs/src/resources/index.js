export function configure (config) {
	config.globalResources([
		"./value-converters/title-case-value-converter",
		"./elements/input-username",
		"./elements/input-email",
		"./elements/input-password",
		"./elements/job",
		"./elements/input-text",
		"./elements/input-link",
	])
}
