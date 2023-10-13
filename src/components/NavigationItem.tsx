import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";

interface NavigationItemProps {
	to: string;
	label: string;
	selected: string;
	onClick: (label: string) => void;
}

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
