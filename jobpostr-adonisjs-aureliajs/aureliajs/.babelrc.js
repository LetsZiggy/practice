"use strict"

module.exports = (api) => {
	api.cache.using(() => {
		// cache based on the two env vars
		return "babel:" + process.env.BABEL_TARGET + " " + "protractor:" + process.env.IN_PROTRACTOR
	})

	return {
		presets: [
			[
				"@babel/preset-env",
				{
					targets: (process.env.BABEL_TARGET === "node")
						? { node: (process.env.IN_PROTRACTOR) ? "6" : "current" }
						: { browsers: ["last 2 versions"] },
					loose: true,
					modules: (process.env.BABEL_TARGET === "node") ? "commonjs" : false,
				},
			],
		],
		plugins: [
			["@babel/plugin-proposal-decorators", { version: "legacy" }], // "legacy": true
			["@babel/plugin-transform-class-properties", { loose: true }],
		],
	}
}
