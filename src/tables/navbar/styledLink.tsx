import { Link } from "react-router-dom";
import { StyledLinkProps } from "@/state/types";
import { styled } from "@mui/system";

const StyledLink = styled(Link)<StyledLinkProps>(({ theme, selected }) => ({
	color: selected ? "inherit" : theme.palette.grey[700],
	textDecoration: "inherit",
	transition: "color 0.3s ease-in-out",
	"&:hover": {
		color: theme.palette.primary[100],
	},
}));

export default StyledLink;
