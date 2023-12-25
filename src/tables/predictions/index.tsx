import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useGetKpisQuery } from "@/state/api";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";

const Predictions = () => {
	const { palette } = useTheme();
	const [isPredictions, setIsPredictions] = useState(false);
	const { data: kpiData } = useGetKpisQuery();
	return (
		<DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
			<FlexBetween m="1rem 2.5rem"></FlexBetween>
		</DashboardBox>
	);
};

export default Predictions;
