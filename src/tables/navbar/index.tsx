import {useTheme} from "@mui/material";
import FlexBetween from "@/components/FlexBetween";


const Navbar = () => {
	const { palette } = useTheme();
	return (
		<FlexBetween
			mb="0.28rem"
			p="0.5rem 0rem"
			color={palette.grey[300]}
		></FlexBetween>
	);
};

export default Navbar;
