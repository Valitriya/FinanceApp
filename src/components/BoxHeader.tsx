import {Box, Typography, useTheme} from "@mui/material";
import FlexBetween from "./FlexBetween";
type Props = {
  title: string;
  icon?: React.ReactNode;
}

const BoxHeader = ({title, icon}) => {
  const {palette} = useTheme();
  return (
    <FlexBetween color={palette.grey[400]} margin="1.5rem 1rem 0 1rem">
      <FlexBetween>
      
      </FlexBetween>
    </FlexBetween>
  )
}

export default BoxHeader