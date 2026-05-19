const js = require("@eslint/js");
const html = require("eslint-plugin-html");
const globals = require("globals");

module.exports = [
	js.configs.recommended,
	{
		ignores: ["**/node_modules/**", "**/*.min.js"],
	},
	{
		linterOptions: {
			reportUnusedDisableDirectives: "warn",
		},
	},
	// inline JS u HTML-u (browser)
	{
		files: ["**/*.html"],
		plugins: { html },
		languageOptions: {
			ecmaVersion: "latest",
			globals: { ...globals.browser },
		},
	},

	// browser .js (klasični script)
	{
		files: ["**/*.js"],
		ignores: ["eslint.config.js"],
		languageOptions: {
			sourceType: "script",
			ecmaVersion: "latest",
			globals: { ...globals.browser },
		},
	},

	// CommonJS datoteke
	{
		files: ["eslint.config.js", "**/*.cjs"],
		languageOptions: {
			sourceType: "commonjs",
			ecmaVersion: "latest",
			globals: { ...globals.node },
		},
	},
	{
		files: ["**/*.mjs"],
		languageOptions: {
			sourceType: "module",
			ecmaVersion: "latest",
			globals: { ...globals.node },
		},
	},
	{
		rules: {
			eqeqeq: ["warn", "always"],
			curly: ["warn", "all"],
			"no-var": "warn",
			"prefer-const": "warn",
			"no-constant-condition": ["warn", { checkLoops: false }],
			"no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
			"no-redeclare": "error",
			"no-shadow": "warn",
			"no-debugger": "warn",
			"no-alert": "warn",
			"no-eval": "error",
			"no-undef": "error",
			"no-unreachable": "error",

			semi: ["warn", "always"],
			quotes: ["warn", "double", { avoidEscape: true }],
		},
	},
];
