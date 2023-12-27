import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
import {NavigationItemProps} from "@/state/types";

const NavigationItem: React.FC<NavigationItemProps> = ({
	to,
	label,
	selected,
	onClick,
}) => {
	const { palette } = useTheme();

	return (
		<Box sx={{ "&:hover": { color: palette.primary[100] } }}>
			<Link
				to={to}
				onClick={() => onClick(label)}
				style={{
					color: selected === label ? "inherit" : palette.grey[700],
					textDecoration: "inherit",
				}}
			>
				{label}
			</Link>
		</Box>
	);
};

export default NavigationItem;
