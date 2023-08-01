const path = require("node:path")

module.exports = {
	"extends": [
		// "eslint:recommended",
		// "plugin:@typescript-eslint/recommended",
		// "plugin:@typescript-eslint/recommended-requiring-type-checking",
		// "plugin:adonis/typescriptApp"
		"standard-with-typescript",
		"plugin:unicorn/recommended",
	],
	"root": true,
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		ecmaVersion: "latest",
		sourceType: "module",
		project: [
			path.join(__dirname, "tsconfig.json"),
		],
		tsconfigRootDir: __dirname,
	},
	"plugins": [
		"@typescript-eslint",
		"sort-destructure-keys",
		"sort-class-members",
		"unicorn",
	],
	"env": {
		es6: true,
		node: true,
	},
	/*
	"settings": {
		"import/extensions": [ ".js", ".ts" ],
		"import/parsers": {
			"@typescript-eslint/parser": [ ".js", ".ts" ],
		},
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
				project: [
					path.join(__dirname, "tsconfig.json"),
				],
			},
		},
	},
	*/
	"rules": {
		// ---EcmaScript - Possible Problems--- //

		"no-inner-declarations": [ "error" ], // Overwrite StandardJS

		"no-invalid-regexp": [ "error", { allowConstructorFlags: [ "u", "y" ] }], // Overwrite StandardJS

		"no-unused-vars": [ "off" ], // Overwrite StandardJS
		"@typescript-eslint/no-unused-vars": [ "warn", { vars: "all", args: "none", ignoreRestSiblings: true }], // Overwrite StandardJS

		// ---EcmaScript - Suggestions--- //

		"no-nested-ternary": [ "off" ], // Set
		"unicorn/no-nested-ternary": [ "off" ], // Set

		"no-redeclare": [ "off" ], // Set
		"@typescript-eslint/no-redeclare": [ "error", { ignoreDeclarationMerge: true }], // Set

		"no-shadow": [ "off" ], // Set
		"@typescript-eslint/no-shadow": [ "error" ], // Set

		"one-var": [ "error", "never" ], // Overwrite StandardJS

		"operator-assignment": [ "error", "always" ], // Set

		"quote-props": [ "error", "consistent-as-needed", { keywords: true }], // Overwrite StandardJS

		"sort-imports": [ "error", { ignoreDeclarationSort: true, allowSeparatedGroups: true }], // Set

		// ---EcmaScript - Layout & Formatting--- //

		"array-bracket-spacing": [ "error", "always", { arraysInArrays: false, objectsInArrays: false }], // Overwrite StandardJS

		"arrow-parens": [ "error", "always" ], // Set

		"brace-style": [ "off" ], // Overwrite StandardJS
		"@typescript-eslint/brace-style": [ "error", "stroustrup", { allowSingleLine: true }], // Overwrite StandardJS

		"comma-dangle": [ "off" ], // Overwrite StandardJS
		"@typescript-eslint/comma-dangle": [ "error", "always-multiline" ], // Overwrite StandardJS

		"indent": [ "off" ], // Overwrite StandardJS
		"@typescript-eslint/indent": [ "error", "tab", { ignoredNodes: [ "TemplateLiteral *", "TSTypeParameterInstantiation" ], SwitchCase: 1, VariableDeclarator: "first", outerIIFEBody: 1, MemberExpression: "off", FunctionDeclaration: { parameters: 1, body: 1 }, FunctionExpression: { parameters: 1, body: 1 }, StaticBlock: { body: 1 }, CallExpression: { arguments: 1 }, ArrayExpression: 1, ObjectExpression: 1, ImportDeclaration: 1, flatTernaryExpressions: false, offsetTernaryExpressions: false, ignoreComments: false }], // Overwrite StandardJS

		"lines-between-class-members": [ "off" ], // Overwrite StandardJS
		"@typescript-eslint/lines-between-class-members": [ "error", "always", { exceptAfterSingleLine: true, exceptAfterOverload: true }], // Overwrite StandardJS

		"no-mixed-spaces-and-tabs": [ "error", "smart-tabs" ], // Overwrite StandardJS

		"no-multiple-empty-lines": [ "error", { max: 1, maxEOF: 1, maxBOF: 0 }], // Overwrite StandardJS

		"no-tabs": [ "off", { allowIndentationTabs: true }], // Overwrite StandardJS

		"operator-linebreak": [ "error", "before", { overrides: { "??": "before" } }], // Overwrite StandardJS

		"quotes": [ "off" ], // Overwrite StandardJS
		"@typescript-eslint/quotes": [ "error", "double", { avoidEscape: true, allowTemplateLiterals: true }], // Overwrite StandardJS

		"template-curly-spacing": [ "error", "always" ], // Overwrite StandardJS

		// ---TypeScript--- //

		"@typescript-eslint/ban-types": [ "error" ], // Set

		"@typescript-eslint/explicit-member-accessibility": [ "error", { overrides: { constructors: "no-public" } }], // MUST OFF IN MIXED CODE - Overwrite StandardJS - adonis.js

		"@typescript-eslint/member-delimiter-style": [ "error", { multiline: { delimiter: "comma", requireLast: true }, singleline: { delimiter: "comma", requireLast: false } }], // Overwrite StandardJS

		"@typescript-eslint/naming-convention": [ "error", { selector: [ "typeLike" ], format: [ "PascalCase" ] }, { selector: [ "variable" ], format: [ "camelCase", "UPPER_CASE", "PascalCase" ] }, { selector: [ "interface" ], format: [ "PascalCase" ], custom: { regex: "^I[A-Z]", match: false } }], // Overwrite StandardJS

		"@typescript-eslint/no-floating-promises": [ "off" ], // Overwrite StandardJS

		"@typescript-eslint/consistent-type-imports": [ "error", { prefer: "type-imports", disallowTypeAnnotations: false }], // Set

		"@typescript-eslint/strict-boolean-expressions": [ "off" ], // Overwrite StandardJS

		// ---import--- //

		"import/order": [ "error", { "groups": [ "builtin", "external", "internal", "parent", "sibling", "index", "unknown", "object", "type" ], "alphabetize": { order: "asc", caseInsensitive: false }, "newlines-between": "never" }], // Set

		// ---sort-destructure-keys--- //

		"sort-destructure-keys/sort-destructure-keys": [ "error", { caseSensitive: true }], // Set

		// ---sort-class-members--- //

		"sort-class-members/sort-class-members": [ "error", {
			groups: {
				"app-provider": [
					{ type: "method", name: "register" },
					{ type: "method", name: "boot" },
					{ type: "method", name: "ready" },
					{ type: "method", name: "shutdown" },
				],
				"model-basic": [
					{ type: "property", name: "id" },
					{ type: "property", name: "createdAt" },
					{ type: "property", name: "updatedAt" },
				],
			},
			order: [
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

				"[model-basic]",

				// [properties]
				{ "type": "property", "sort": "alphabetical", "static": false, "private": false, "groupByDecorator": undefined },
				// [arrow-function-properties]
				{ "type": "property", "sort": "alphabetical", "static": false, "private": false, "groupByDecorator": undefined, "propertyType": "ArrowFunctionExpression" },

				"constructor",

				"[app-provider]",

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

		"unicorn/filename-case": [ "error", { cases: { pascalCase: true, snakeCase: true } }], // Overwrite unicorn

		"unicorn/prefer-at": [ "error" ], // Overwrite unicorn

		"unicorn/prefer-module": [ "off" ], // Overwrite unicorn

		"unicorn/prefer-string-replace-all": [ "error" ], // Overwrite unicorn

		"unicorn/prevent-abbreviations": [ "error", { checkFilenames: false, allowList: { EnvTypes: true } }], // Overwrite unicorn

		"unicorn/no-array-reduce": [ "off" ], // Overwrite unicorn

		"unicorn/no-useless-undefined": [ "off" ], // Overwrite unicorn
	},
}
