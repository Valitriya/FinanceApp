export const tokens = {
	grey: {
		100: "#F0F0F0",
        200: "#CCCCCC",
        300: "#B3B3B3",
        400: "#999999",
        500: "#808080",
        600: "#666666",
        700: "#4D4D4D",
        800: "#333333",
        900: "#1A1A1A",
	},
	primary: {
		100: "#6FA3F7",
        200: "#5A94F6",
        300: "#4576F4",
        400: "#3057F2",
        500: "#1B39F0", 
        600: "#162DD1",
        700: "#1122B3",
        800: "#0C1694",
        900: "#070B76",
	},
	secondary: {
		100: "#FFAD5C",
        200: "#FFA04C",
        300: "#FF933C",
        400: "#FF8630",
        500: "#FF791E", 
        600: "#DB661B",
        700: "#B75216",
        800: "#933010",
        900: "#70220B",
	},
	tertiary: {
		500: "#FF5CEC",
	},
	background: {
		light:"#1A1A1A",
		main: "#333333",
	},
};

// mui theme settings
export const themeSettings = {
	palette: {
		primary: {
			...tokens.primary,
			main: tokens.primary[500],
			light: tokens.primary[400],
		},
		secondary: {
			...tokens.secondary,
			main: tokens.secondary[500],
		},
		tertiary: {
			...tokens.tertiary,
		},
		grey: {
			...tokens.grey,
			main: tokens.grey[500],
		},
		background: {
			default: tokens.background.main,
			light: tokens.background.light,
		},
	},
	typography: {
		fontFamily: ["Inter", "sans-serif"].join(","),
		fontSize: 12,
		h1: {
			fontFamily: ["Inter", "sans-serif"].join(","),
			fontSize: 32,
		},
		h2: {
			fontFamily: ["Inter", "sans-serif"].join(","),
			fontSize: 24,
		},
		h3: {
			fontFamily: ["Inter", "sans-serif"].join(","),
			fontSize: 20,
			fontWeight: 800,
			color: tokens.grey[200],
		},
		h4: {
			fontFamily: ["Inter", "sans-serif"].join(","),
			fontSize: 14,
			fontWeight: 600,
			color: tokens.grey[300],
		},
		h5: {
			fontFamily: ["Inter", "sans-serif"].join(","),
			fontSize: 12,
			fontWeight: 400,
			color: tokens.grey[400],
		},
		h6: {
			fontFamily: ["Inter", "sans-serif"].join(","),
			fontSize: 10,
			color: tokens.grey[600],
		},
	},
};