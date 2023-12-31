import { useMemo } from "react";
import { useGetProductsQuery, useGetKpisQuery } from "@/state/api";
import { Month, GetProductsResponse } from "@/state/types";
import DashboardBox from "@/components/DashboardBox";
import BoxHeader from "@/components/BoxHeader";
import FlexBetween from "@/components/FlexBetween";
import { useTheme, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
	ResponsiveContainer,
	CartesianGrid,
	XAxis,
	YAxis,
	ZAxis,
	Tooltip,
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
	ScatterChart,
	Scatter,
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
];
const createExpenseData = (data: Month[] | undefined) => {
	return (
		data &&
		data.map(({ month, operationalExpenses, nonOperationalExpenses }) => ({
			name: month.substring(0, 3),
			"Operational Expenses": operationalExpenses || 0,
			"Non Operational Expenses": nonOperationalExpenses || 0,
		}))
	);
};
const createProductData = (data: GetProductsResponse[] | undefined) => {
	return data && data.map(({ __id, price, expense }) => ({
				id: __id,
				price,
				expense,
		}));
}
const Row_2 = () => {
	const { palette } = useTheme();
	const COLOR_FONT = palette.grey[800];
	const pieColors = [palette.primary[800], palette.primary[300]];

	const { data: operationalData } = useGetKpisQuery();
	const { data: productData } = useGetProductsQuery();

	const operationalExpenses = useMemo(() => createExpenseData(operationalData && operationalData[0].monthlyData), [operationalData]);
	const productExpenseData = useMemo(() => createProductData(productData), [productData]);

	const axisProps = {
		type: "number" as const,
		axisLine: false,
		tickLine: false,
		style: { fontSize: "10px" },
		tickFormatter: (v: number) => `$${v}`,
	};


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
							stroke={palette.secondary[500]}
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
				<BoxHeader title="Campaigns and Targets" sideText="+4%" />
				<FlexBetween mt="-0.25rem" gap="1.5rem" pr="1rem">
					<PieChart
						width={110}
						height={100}
						margin={{
							top: 0,
							right: -10,
							left: 10,
							bottom: 0,
						}}
					>
						<Pie
							stroke="none"
							data={pieData}
							innerRadius={18}
							outerRadius={38}
							paddingAngle={2}
							dataKey="value"
						>
							{pieData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={pieColors[index]} />
							))}
						</Pie>
					</PieChart>
					<Box ml="-0.7rem" flexBasis="40%" textAlign="center">
						<Typography variant="h5">Target Sales</Typography>
						<Typography m="0.3rem 0" variant="h3" color={palette.primary[500]}>
							83
						</Typography>
						<Typography variant="h6">
							Finance goals of the campaign that is desired
						</Typography>
					</Box>
					<Box flexBasis="40%">
						<Typography variant="h5">Losses in Revenue</Typography>
						<Typography variant="h6">Losses are down 25%</Typography>
						<Typography mt="0.4rem" variant="h5">
							Profit Margins
						</Typography>
						<Typography variant="h6">
							Margins are up by 30% from last month.
						</Typography>
					</Box>
				</FlexBetween>
			</DashboardBox>
			<DashboardBox gridArea="f">
				<BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
				<ResponsiveContainer width="100%" height="100%">
					<ScatterChart
						margin={{
							top: 20,
							right: 20,
							bottom: 50,
							left: -20,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="price" name="price" {...axisProps} />
						<YAxis dataKey="expense" name="expense" {...axisProps} />
						<ZAxis type="number" range={[20]} />
						<Tooltip formatter={(v) => `$${v}`} />
						<Scatter
							name="Product Expense Ratio"
							data={productExpenseData}
							fill={palette.tertiary[500]}
						/>
					</ScatterChart>
				</ResponsiveContainer>
			</DashboardBox>
		</>
	);
};

export default Row_2;
