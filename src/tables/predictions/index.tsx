import { useState } from "react";
import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { Label } from "@mui/icons-material";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
	ResponsiveContainer,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	LineChart,
	Legend,
	Line,
} from "recharts";

const Predictions = () => {
	const { palette } = useTheme();
	const [isPredictions, setIsPredictions] = useState(false);
	const { data: kpiData } = useGetKpisQuery();

	const COLOR_FONT = palette.grey[800];
	return (
		<DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
			<FlexBetween m="1rem 2.5rem" gap="0.3rem">
				<Box>
					<Typography variant="h3">Revenue and Predictions</Typography>
					<Typography variant="h6">
						charted revenue and predicted revenue based on a simple linear
						regression model
					</Typography>
				</Box>
				<Button
					onClick={() => setIsPredictions(!isPredictions)}
					sx={{
						color: palette.grey[900],
						backgroundColor: palette.grey[700],
						boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.4)",
					}}
				>
					Show Predicted Revenue for Next Year
				</Button>
			</FlexBetween>
			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					data={formattedData}
					margin={{
						top: 20,
						right: 75,
						left: 20,
						bottom: 80,
					}}
				>
					<CartesianGrid stroke={COLOR_FONT} strokeDasharray="3 3" />
					<XAxis
						dataKey="name"
						tickLine={false}
						style={{ fontSize: "10px", fill: COLOR_FONT }}
					>
						<Label value="Month" offset={-5} position="bottom"/>
					</XAxis>
					<YAxis
						tickLine={false}
						axisLine={false}
						style={{ fontSize: "10px", fill: COLOR_FONT }}
					></YAxis>
					<Tooltip />
					<Legend verticalAlign="top" />
					<Line
						yAxisId="left"
						type="monotone"
						dataKey="profit"
						stroke={palette.tertiary[500]}
					/>
					<Line
						yAxisId="right"
						type="monotone"
						dataKey="revenue"
						stroke={palette.primary[500]}
					/>
				</LineChart>
			</ResponsiveContainer>
		</DashboardBox>
	);
};

export default Predictions;
