import { useState } from "react";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import PixIcon from "@mui/icons-material/Pix";
import NavigationItem from "@/components/NavigationItem";

const Navbar = () => {
	const { palette } = useTheme();
	const [selected, setSelected] = useState<string>("dashboard");
	return (
		<FlexBetween mb="0.28rem" p="0.5rem 0rem" color={palette.grey[300]}>
			<FlexBetween gap="0.72rem">
				<PixIcon sx={{ fontSize: "30px" }} />
				<Typography variant="h4" fontSize="18px">
					Finanseer
				</Typography>
			</FlexBetween>
			<FlexBetween gap="2rem">
				<NavigationItem
					to="/"
					label="DashBoard"
					selected={selected}
					onClick={setSelected}
				></NavigationItem>
				<NavigationItem
					to="/predictions"
					label="Predictions"
					selected={selected}
					onClick={setSelected}
				></NavigationItem>
			</FlexBetween>
		</FlexBetween>
	);
};

export default Navbar;
