const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./components/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	variants: {},
	plugins: [],
};
