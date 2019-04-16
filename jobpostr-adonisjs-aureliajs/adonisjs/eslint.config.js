/* eslint @stylistic/migrate/migrate-js: "error" */
/* eslint @stylistic/migrate/migrate-ts: "error" */

import path from "node:path"
// import adonisPlugin from "@adonisjs/eslint-plugin"
import babelParser from "@babel/eslint-parser"
import eslint from "@eslint/js"
import stylisticPlugin from "@stylistic/eslint-plugin"
import stylisticMigratePlugin from "@stylistic/eslint-plugin-migrate"
// @ts-expect-error: package type error
import importPlugin from "eslint-plugin-import"
import nodePlugin from "eslint-plugin-n"
// @ts-expect-error: package type error
import promisePlugin from "eslint-plugin-promise"
// @ts-expect-error: package type error
import sortClassMembersPlugin from "eslint-plugin-sort-class-members"
// @ts-expect-error: package type error
import sortDestructureKeysPlugin from "eslint-plugin-sort-destructure-keys"
import unicornPlugin from "eslint-plugin-unicorn"
import globals from "globals"

const rootRules = {
	// ---eslint - Possible Problems--- //

	"no-inner-declarations": ["error"], // Overwrite eslint default

	"no-invalid-regexp": ["error", { allowConstructorFlags: ["u", "y"] }], // Overwrite eslint default | enable `y` flag for adonisjs

	"no-unused-vars": ["warn", { vars: "all", args: "none", ignoreRestSiblings: true }], // Overwrite eslint default

	// ---eslint - Suggestions--- //

	"no-nested-ternary": ["off"], // Set
	"unicorn/no-nested-ternary": ["off"], // Set

	"no-shadow": ["error"], // Set

	"one-var": ["error", "never"], // Set

	"operator-assignment": ["error", "always"], // Set

	"sort-imports": ["error", { ignoreDeclarationSort: true, allowSeparatedGroups: true }], // Set

	// ---import--- //

	"import/order": ["error", { "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "unknown", "object", "type"], "alphabetize": { order: "asc", caseInsensitive: false }, "newlines-between": "never" }], // Set

	// ---sort-class-members--- //

	"sort-class-members/sort-class-members": ["error", {
		groups: {
			appProvider: [
				{ type: "method", name: "register" },
				{ type: "method", name: "boot" },
				{ type: "method", name: "ready" },
				{ type: "method", name: "shutdown" },
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

			// [properties]
			{ "type": "property", "sort": "alphabetical", "static": false, "private": false, "groupByDecorator": undefined },
			// [arrow-function-properties]
			{ "type": "property", "sort": "alphabetical", "static": false, "private": false, "groupByDecorator": undefined, "propertyType": "ArrowFunctionExpression" },

			"constructor",

			"[appProvider]",

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
		accessorPairPositioning: "getThenSet",
		stopAfterFirstProblem: false,
		locale: "en-US",
	}], // Set

	// ---sort-destructure-keys--- //

	"sort-destructure-keys/sort-destructure-keys": ["error", { caseSensitive: true }], // Set

	// ---unicorn--- //

	"unicorn/filename-case": ["error", { cases: { snakeCase: true, pascalCase: true }}], // Overwrite unicorn | Set { cases: { snakeCase: true }} for adonisjs

	"unicorn/prefer-at": ["error"], // Overwrite unicorn

	"unicorn/prefer-module": ["off"], // Overwrite unicorn

	"unicorn/prefer-string-replace-all": ["error"], // Overwrite unicorn

	"unicorn/prevent-abbreviations": ["error", { checkFilenames: false }], // Overwrite unicorn

	"unicorn/no-array-reduce": ["off"], // Overwrite unicorn

	"unicorn/no-useless-undefined": ["off"], // Overwrite unicorn

	// ---@stylistic--- //

	"@stylistic/array-bracket-newline": ["error", "consistent"],

	"@stylistic/array-bracket-spacing": ["error", "never"],

	"@stylistic/array-element-newline": ["error", "consistent"],

	"@stylistic/arrow-parens": ["error", "always"],

	"@stylistic/arrow-spacing": ["error", { before: true, after: true }],

	"@stylistic/block-spacing": ["error", "always"],

	"@stylistic/brace-style": ["error", "stroustrup", { allowSingleLine: true }],

	"@stylistic/comma-dangle": ["error", "always-multiline"],

	"@stylistic/comma-spacing": ["error", { before: false, after: true }],

	"@stylistic/comma-style": ["error", "last"],

	"@stylistic/computed-property-spacing": ["error", "never", { enforceForClassMembers: true }],

	"@stylistic/dot-location": ["error", "property"],

	"@stylistic/eol-last": ["error", "always"],

	"@stylistic/function-call-argument-newline": ["error", "consistent"],

	"@stylistic/function-call-spacing": ["error", "never"],

	"@stylistic/function-paren-newline": ["error", "multiline"],

	"@stylistic/generator-star-spacing": ["error", "before"],

	"@stylistic/implicit-arrow-linebreak": ["error", "beside"],

	"@stylistic/indent": ["error", "tab", { ignoredNodes: ["TemplateLiteral *"/* , "TSTypeParameterInstantiation" */], SwitchCase: 1, VariableDeclarator: "first", outerIIFEBody: 1, MemberExpression: "off", FunctionDeclaration: { parameters: 1, body: 1 }, FunctionExpression: { parameters: 1, body: 1 }, StaticBlock: { body: 1 }, CallExpression: { arguments: 1 }, ArrayExpression: 1, ObjectExpression: 1, ImportDeclaration: 1, flatTernaryExpressions: false, offsetTernaryExpressions: false, ignoreComments: false }],

	"@stylistic/indent-binary-ops": ["error", "tab"],

	"@stylistic/key-spacing": ["error", { beforeColon: false, afterColon: true }],

	"@stylistic/keyword-spacing": ["error", { before: true, after: true }],

	"@stylistic/line-comment-position": ["off"],

	"@stylistic/linebreak-style": ["error", "unix"],

	"@stylistic/lines-around-comment": ["off"],

	"@stylistic/lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true, exceptAfterOverload: true }],

	"@stylistic/max-len": ["off"],

	"@stylistic/max-statements-per-line": ["off"],

	"@stylistic/member-delimiter-style": ["error", { multiline: { delimiter: "comma", requireLast: true }, singleline: { delimiter: "comma", requireLast: false }}],

	"@stylistic/multiline-comment-style": ["off"],

	"@stylistic/multiline-ternary": ["error", "always-multiline"],

	"@stylistic/new-parens": ["error", "always"],

	"@stylistic/newline-per-chained-call": ["error", { ignoreChainWithDepth: 2 }],

	"@stylistic/no-confusing-arrow": ["off"],

	"@stylistic/no-extra-parens": ["off"],

	"@stylistic/no-extra-semi": ["error"],

	"@stylistic/no-floating-decimal": ["error"],

	"@stylistic/no-mixed-operators": ["error", { groups: [["==", "!=", "===", "!==", ">", ">=", "<", "<="], ["&&", "||"], ["in", "instanceof"]], allowSamePrecedence: true }],

	"@stylistic/no-mixed-spaces-and-tabs": ["error", "smart-tabs"],

	"@stylistic/no-multi-spaces": ["error"],

	"@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1, maxBOF: 0 }],

	"@stylistic/no-tabs": ["error", { allowIndentationTabs: true }],

	"@stylistic/no-trailing-spaces": ["error"],

	"@stylistic/no-whitespace-before-property": ["error"],

	"@stylistic/nonblock-statement-body-position": ["error", "beside"],

	"@stylistic/object-curly-newline": ["error", { consistent: true }],

	"@stylistic/object-curly-spacing": ["error", "always", { arraysInObjects: true, objectsInObjects: false }],

	"@stylistic/object-property-newline": ["error", { allowMultiplePropertiesPerLine: true, allowAllPropertiesOnSameLine: false }],

	"@stylistic/one-var-declaration-per-line": ["error", "initializations"],

	"@stylistic/operator-linebreak": ["error", "before", { overrides: { "??": "before" }}],

	"@stylistic/padded-blocks": ["error", "never"],

	"@stylistic/padding-line-between-statements": ["error", { blankLine: "always", prev: "*", next: ["break", "cjs-export", "exports", "return"] }, { blankLine: "always", prev: ["const", "let", "var"], next: "*" }, { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] }, { blankLine: "always", prev: "directive", next: "*" }, { blankLine: "any", prev: "directive", next: "directive" }, { blankLine: "always", prev: ["case", "default"], next: "*" }],

	"@stylistic/quote-props": ["error", "consistent-as-needed", { keywords: true }],

	"@stylistic/quotes": ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],

	"@stylistic/rest-spread-spacing": ["error", "never"],

	"@stylistic/semi": ["error", "never", { beforeStatementContinuationChars: "always" }],

	"@stylistic/semi-spacing": ["error", { before: false, after: true }],

	"@stylistic/semi-style": ["error", "first"],

	"@stylistic/space-before-blocks": ["error", "always"],

	"@stylistic/space-before-function-paren": ["error", "always"],

	"@stylistic/space-in-parens": ["error", "never"],

	"@stylistic/space-infix-ops": ["error", { int32Hint: true }],

	"@stylistic/space-unary-ops": ["error", { words: true, nonwords: false }],

	"@stylistic/spaced-comment": ["error", "always", { line: { exceptions: ["-"] }, block: { balanced: true }}],

	"@stylistic/switch-colon-spacing": ["error", { after: true, before: false }],

	"@stylistic/template-curly-spacing": ["error", "always"],

	"@stylistic/template-tag-spacing": ["error", "never"],

	"@stylistic/wrap-iife": ["error", "inside", { functionPrototypeMethods: true }],

	"@stylistic/wrap-regex": ["error"],

	"@stylistic/yield-star-spacing": ["error", "after"],

	// ---@adonisjs--- //

	// "@adonisjs/prefer-lazy-controller-import": ["error"], // Set

	// "@adonisjs/prefer-lazy-listener-import": ["error"], // Set
}

export default [
	eslint.configs.recommended,
	importPlugin.flatConfigs.recommended,
	// nodePlugin.configs["flat/recommended"],
	promisePlugin.configs["flat/recommended"],
	sortClassMembersPlugin.configs["flat/recommended"],
	unicornPlugin.configs.recommended,
	{
		ignores: [
			"**/.git",
			"**/.svn",
			"**/.hg",
			"**/CVS",
			"**/node_modules",
			"**/vendor",
			"**/.env",
			"**/env",
			"**/.venv",
			"**/venv",
			"**/.env.bak",
			"**/env.bak",
			"**/.venv.bak",
			"**/venv.bak",
			"**/ENV",
			"**/__pycache__",

			"**/public",
			"**/scripts",
		],
		plugins: {
			// "@adonisjs": adonisPlugin,
			// "import": importPlugin, // uncomment if not using recommended
			"n": nodePlugin, // uncomment if not using recommended
			// "promise": promisePlugin, // uncomment if not using recommended
			"sort-destructure-keys": sortDestructureKeysPlugin,
			"@stylistic": stylisticPlugin,
			"@stylistic/migrate": stylisticMigratePlugin,
		},
		languageOptions: {
			globals: {
				...globals.builtin,
				...globals.es2025,
				...globals.browser,
				...globals.node,
				...globals.serviceworker,
				...globals["shared-node-browser"],
				use: "readonly",
			},
			parser: babelParser,
			ecmaVersion: "latest",
			sourceType: "module",
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					legacyDecorators: true,
				},
				babelOptions: {
					configFile: path.join(import.meta.dirname, "babel.config.json"),
				},
			},
		},
		settings: {
			"import/extensions": [".js", ".cjs", ".mjs"],
			"import/resolver": {
				node: {
					extensions: [".js", ".cjs", ".mjs"],
				},
			},
		},
		rules: rootRules,
	},
	{
		files: [
			"**/.*.js",
			"**/.*.cjs",
			"**/.*.mjs",
			"**/*.js",
			"**/*.cjs",
			"**/*.mjs",
		],
	},
	stylisticPlugin.configs["disable-legacy"],
]
