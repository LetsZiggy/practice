const path = require("node:path")

module.exports = {
	"extends": [
		// "eslint:recommended",
		"standard",
		"plugin:unicorn/recommended",
	],
	"root": true,
	"parser": "@babel/eslint-parser",
	"parserOptions": {
		ecmaVersion: "latest",
		sourceType: "module",
		ecmaFeatures: {
			legacyDecorators: true,
		},
		babelOptions: {
			configFile: path.join(__dirname, "babel.config.json"),
		},
	},
	"plugins": [
		"sort-class-members",
		"unicorn",
	],
	"env": {
		browser: true,
		es6: true,
		node: true,
	},
	"globals": {
		use: true,
	},
	"rules": {
		// ---EcmaScript - Possible Problems--- //

		"no-inner-declarations": [ "error" ], // Overwrite StandardJS

		"no-unused-vars": [ "warn", { vars: "all", args: "none", ignoreRestSiblings: true }], // Overwrite StandardJS

		// ---EcmaScript - Suggestions--- //

		"no-nested-ternary": [ "off" ], // Set
		"unicorn/no-nested-ternary": [ "off" ], // Set

		"no-redeclare": [ "error" ], // Set

		"one-var": [ "error", "never" ], // Overwrite StandardJS

		"operator-assignment": [ "error", "always" ], // Set

		"quote-props": [ "error", "consistent-as-needed", { keywords: true }], // Overwrite StandardJS

		"sort-imports": [ "error", { ignoreDeclarationSort: true, allowSeparatedGroups: true }], // Set

		// ---EcmaScript - Layout & Formatting--- //

		"array-bracket-spacing": [ "error", "always", { arraysInArrays: false, objectsInArrays: false }], // Overwrite StandardJS

		"arrow-parens": [ "error", "always" ], // Set

		"brace-style": [ "error", "stroustrup", { allowSingleLine: true }], // Overwrite StandardJS

		"comma-dangle": [ "error", "always-multiline" ], // Overwrite StandardJS

		"indent": [ "error", "tab", { ignoredNodes: [ "TemplateLiteral *" ], SwitchCase: 1, VariableDeclarator: "first", outerIIFEBody: 1, MemberExpression: "off", FunctionDeclaration: { parameters: 1, body: 1 }, FunctionExpression: { parameters: 1, body: 1 }, StaticBlock: { body: 1 }, CallExpression: { arguments: 1 }, ArrayExpression: 1, ObjectExpression: 1, ImportDeclaration: 1, flatTernaryExpressions: false, offsetTernaryExpressions: false, ignoreComments: false }], // Overwrite StandardJS

		"lines-between-class-members": [ "error", "always", { exceptAfterSingleLine: true }], // Overwrite StandardJS

		"no-mixed-spaces-and-tabs": [ "error", "smart-tabs" ], // Overwrite StandardJS

		"no-multiple-empty-lines": [ "error", { max: 1, maxEOF: 1, maxBOF: 0 }], // Overwrite StandardJS

		"no-tabs": [ "off", { allowIndentationTabs: true }], // Overwrite StandardJS

		"operator-linebreak": [ "error", "before", { overrides: { "??": "before" } }], // Overwrite StandardJS

		"quotes": [ "error", "double", { avoidEscape: true, allowTemplateLiterals: true }], // Overwrite StandardJS

		"template-curly-spacing": [ "error", "always" ], // Overwrite StandardJS

		// ---import--- //

		"import/order": [ "error", { "groups": [ "builtin", "external", "internal", "parent", "sibling", "index", "unknown", "object", "type" ], "alphabetize": { order: "asc", caseInsensitive: false }, "newlines-between": "never" }], // Set

		// ---sort-class-members--- //

		"sort-class-members/sort-class-members": [ "error", {
			groups: {
				"migration-methods": [
					{ name: "up", type: "method" },
					{ name: "down", type: "method" },
				],
			},
			order: [
				"[migration-methods]",

				// [static-properties] | [private-properties]
				{ "type": "property", "sort": "alphabetical", "static": true, "private": true, "groupByDecorator": undefined },
				// [static-properties] | [private-properties] | [arrow-function-properties]
				{ "type": "property", "sort": "alphabetical", "static": true, "private": true, "groupByDecorator": undefined, "propertyType": "ArrowFunctionExpression" },
				// [static-properties]
				{ "type": "property", "sort": "alphabetical", "static": true, "private": false, "groupByDecorator": undefined },
				// [static-properties] | [arrow-function-properties]
				{ "type": "property", "sort": "alphabetical", "static": true, "private": false, "groupByDecorator": undefined, "propertyType": "ArrowFunctionExpression" },

				// [private-properties]
				{ "type": "property", "sort": "alphabetical", "static": false, "private": true, "groupByDecorator": undefined },
				// [private-properties] | [arrow-function-properties]
				{ "type": "property", "sort": "alphabetical", "static": false, "private": true, "groupByDecorator": undefined, "propertyType": "ArrowFunctionExpression" },

				// [properties]
				{ "type": "property", "sort": "alphabetical", "static": false, "private": false, "groupByDecorator": undefined },
				// [arrow-function-properties]
				{ "type": "property", "sort": "alphabetical", "static": false, "private": false, "groupByDecorator": undefined, "propertyType": "ArrowFunctionExpression" },

				// [properties]
				{ "type": "property", "sort": "alphabetical", "static": false, "private": false, "groupByDecorator": "bindable" },
				// [arrow-function-properties]
				{ "type": "property", "sort": "alphabetical", "static": false, "private": false, "groupByDecorator": "bindable", "propertyType": "ArrowFunctionExpression" },

				// [properties]
				{ "type": "property", "sort": "alphabetical", "static": false, "private": false, "groupByDecorator": "observable" },
				// [arrow-function-properties]
				{ "type": "property", "sort": "alphabetical", "static": false, "private": false, "groupByDecorator": "observable", "propertyType": "ArrowFunctionExpression" },

				"constructor",

				// [accessor-pairs]
				{ type: "method", sort: "alphabetical", accessorPair: true },
				// [getters]
				{ type: "method", sort: "alphabetical", kind: "get" },
				// [setters]
				{ type: "method", sort: "alphabetical", kind: "set" },

				// [static-methods] | [private-methods] | [async-methods]
				{ "type": "method", "sort": "alphabetical", "static": true, "private": true, "async": true },
				// [static-methods] | [private-methods]
				{ "type": "method", "sort": "alphabetical", "static": true, "private": true, "async": false },
				// [static-methods] | [async-methods]
				{ "type": "method", "sort": "alphabetical", "static": true, "private": false, "async": true },
				// [static-methods]
				{ "type": "method", "sort": "alphabetical", "static": true, "private": false, "async": false },

				// [private-methods] | [async-methods]
				{ "type": "method", "sort": "alphabetical", "static": false, "private": true, "async": true },
				// [private-methods]
				{ "type": "method", "sort": "alphabetical", "static": false, "private": true, "async": false },

				// [async-methods]
				{ "type": "method", "sort": "alphabetical", "static": false, "private": false, "async": true },
				// [methods]
				{ "type": "method", "sort": "alphabetical", "static": false, "private": false, "async": false },

				"[everything-else]",
			],
			accessorPairPositioning: "together",
			stopAfterFirstProblem: false,
			locale: "en-US",
		}], // Set

		// ---Unicorn--- //

		"unicorn/filename-case": [ "error", { cases: { camelCase: true, pascalCase: true, snakeCase: true } }], // Overwrite unicorn

		"unicorn/prefer-at": [ "error" ], // Overwrite unicorn

		"unicorn/prefer-module": [ "off" ], // Overwrite unicorn

		"unicorn/prefer-string-replace-all": [ "error" ], // Overwrite unicorn

		"unicorn/prevent-abbreviations": [ "error", { checkFilenames: false, allowList: { Env: true } }], // Overwrite unicorn

		"unicorn/no-array-reduce": [ "off" ], // Overwrite unicorn

		"unicorn/no-useless-undefined": [ "off" ], // Overwrite unicorn
	},
	// "overrides": [],
}
