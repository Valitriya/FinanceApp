import { useMemo } from "react";
import DashboardBox from "@/components/DashboardBox";
import BoxHeader from "@/components/BoxHeader";
import { useTheme } from "@mui/material";
import { useGetProductsQuery, useGetKpisQuery } from "@/state/api";
import {
	ResponsiveContainer,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
} from "recharts";

const pieData = [
	{
		name: "Group A",
		value: 600,
	},
	{
		name: "Group B",
		value: 400,
	},
]
const Row_2 = () => {
	const { palette } = useTheme();
	const COLOR_FONT = palette.grey[800];
	const pieColors = [COLOR_FONT, palette.primary[300]];

	const { data: operationalData } = useGetKpisQuery();
	const { data: productData } = useGetProductsQuery();
	console.log("data:", operationalData);

	const operationalExpenses = useMemo(() => {
		return (
			operationalData &&
			operationalData[0].monthlyData.map(
				({ month, operationalExpenses, nonOperationalExpenses }) => {
					return {
						name: month.substring(0, 3),
						"Operational Expenses": operationalExpenses,
						"Non Operational Expenses": nonOperationalExpenses,
					};
				}
			)
		);
	}, [operationalData]);

	return (
		<>
			<DashboardBox gridArea="d">
				<BoxHeader
					title="Operational vs Non-Operational Expenses"
					sideText="+4%"
				/>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={operationalExpenses}
						margin={{
							top: 20,
							right: 5,
							left: -5,
							bottom: 60,
						}}
					>
						<CartesianGrid vertical={false} stroke={COLOR_FONT} />
						<XAxis
							dataKey="name"
							tickLine={false}
							style={{ fontSize: "10px", fill: COLOR_FONT }}
						/>
						<YAxis
							yAxisId="left"
							orientation="left"
							tickLine={false}
							axisLine={false}
							style={{ fontSize: "10px", fill: COLOR_FONT }}
						/>
						<YAxis
							yAxisId="right"
							orientation="right"
							tickLine={false}
							axisLine={false}
							style={{ fontSize: "10px", fill: COLOR_FONT }}
						/>
						<Tooltip />
						<Line
							yAxisId="left"
							type="monotone"
							dataKey="Non Operational Expenses"
							stroke={palette.tertiary[500]}
						/>
						<Line
							yAxisId="right"
							type="monotone"
							dataKey="Operational Expenses"
							stroke={palette.primary[500]}
						/>
					</LineChart>
				</ResponsiveContainer>
			</DashboardBox>
			<DashboardBox gridArea="e">
				<PieChart 
					width={110}
					height={100}
					margin={{
						top: 0,
						right: -10,
						left: 10,
						bottom: 0,
					}}>
					<Pie
						data={pieData}
						innerRadius={18}
						outerRadius={38}
						paddingAngle={2}
						dataKey="value"
					>
						{pieData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={pieColors[index]}
							/>
						))}
					</Pie>
				</PieChart>
			</DashboardBox>
			<DashboardBox gridArea="f"></DashboardBox>
		</>
	);
};

export default Row_2;
