import { useState } from "react";
import { useTheme } from "@mui/material";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import FlexBetween from "@/components/FlexBetween";
import PixIcon from "@mui/icons-material/Pix";

const Navbar = () => {
	const { palette } = useTheme();
	const [selected, setSelected] = useState("dashboard");
	return (
		<FlexBetween mb="0.28rem" p="0.5rem 0rem" color={palette.grey[300]}>
			<FlexBetween gap="0.72rem">
				<PixIcon sx={{ fontSize: "30px" }} />
				<Typography variant="h4" fontSize="18px">
					Finanseer
				</Typography>
			</FlexBetween>
			<FlexBetween gap="2rem">
				<Box sx={{ "&:hover": { color: palette.primary[100] } }}>
					<Link
						to="/"
						onClick={() => setSelected("dashboard")}
						style={{
							color: selected === "dashboard" ? "inherit" : palette.grey[700],
							textDecoration: "inherit"
						}}
					>
						DashBoard
					</Link>
				</Box>
			</FlexBetween>
		</FlexBetween>
	);
};

export default Navbar;
