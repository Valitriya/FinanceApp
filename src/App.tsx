import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";

function App() {
	const theme = useMemo(() => createTheme(themeSettings), []);
	return (
		<div className="app">
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem"></Box>
				</ThemeProvider>
		</div>
	);
}

export default App;
