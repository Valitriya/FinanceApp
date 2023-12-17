import { Box, useMediaQuery } from "@mui/material";
import Row_1 from "./Row_1";
import Row_2 from "./Row_2";
import Row_3 from "./Row_3";

const gridTemplateLargeScreens = `
"a b c"
"a b c"
"a b c"
"a b f"
"d e f"
"d e f"
"d g i"
"h g i"
"h g j"
"h g j"
`;
const gridTemplateSmallScreens = `
"a"
"a"
"a"
"a"
"b"
"b"
"b"
"b"
"c"
"c"
"c"
"d"
"d"
"d"
"e"
"e"
"f"
"f"
"f"
"h"
"h"
"h"
"g"
"g"
"g"
"g"
"i"
"i"
"j"
"j"
`;
const Dashboard = () => {
	const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
	return (
		<Box
			width="100%"
			height="100%"
			display="grid"
			gap="1.5rem"
			mb="10rem"
			sx={
				isAboveMediumScreens
					? {
							gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
							gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
							gridTemplateAreas: gridTemplateLargeScreens,
					  }
					: {
							gridAutoColumns: "1fr",
							gridAutoRows: "80px",
							gridTemplateAreas: gridTemplateSmallScreens,
					  }
			}
		>
			<Row_1/>
			<Row_2/>
			<Row_3/>
		</Box>
	);
};

export default Dashboard;
