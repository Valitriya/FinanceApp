import StyledLink from "@/tables/navbar/styledLink";
import { NavigationItemProps } from "@/state/types";
import { Theme } from "@mui/material/styles";

const NavigationItem: React.FC<NavigationItemProps & { theme: Theme }> = ({
	to,
	label,
	selected,
	onClick,
	theme,
}) => {
	return (
		<StyledLink
			to={to}
			selected={selected === label}
			theme={theme}
			onClick={() => onClick(label)}
		>
			{label}
		</StyledLink>
	);
};

export default NavigationItem;
