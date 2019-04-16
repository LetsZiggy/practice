const plugin = require("tailwindcss/plugin")

module.exports = plugin(function ({ matchUtilities, theme }) {
	matchUtilities(
		{
			"stroke-opacity": (value) => ({
				"stroke-opacity": value,
			}),
		},
		{
			values: theme("opacity", {}),
			type: "any",
		},
	)
})
