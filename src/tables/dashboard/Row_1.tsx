import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useMemo } from "react";
import {
	ResponsiveContainer,
	AreaChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Area,
	LineChart,
	Legend,
	Line,
} from "recharts";
import { useTheme } from "@mui/material";
import BoxHeader from "@/components/BoxHeader";

const Row_1 = () => {
	const { palette } = useTheme();
	const { data } = useGetKpisQuery();

	const MONTHLY_DATA_DOMAIN = [8000, 23000];
	
	const COLOR_FONT = palette.grey[800];

	const revenueExpenses = useMemo(() => {
		if (!data || !Array.isArray(data[0]?.monthlyData)) return [];

		return data[0].monthlyData.map(({ month, revenue, expenses }) => ({
			name: month.substring(0, 3),
			revenue,
			expenses,
		}));
	}, [data]);

	const revenueProfit = useMemo(() => {
		if (!data || !Array.isArray(data[0]?.monthlyData)) return [];

		return data[0].monthlyData.map(({ month, revenue, expenses }) => ({
			name: month.substring(0, 3),
			revenue,
			profit: (revenue - expenses).toFixed(2),
		}));
	}, [data]);

	return (
		<>
			<DashboardBox gridArea="a">
				<BoxHeader
					title="Revenue and Expenses"
					subtitle="top line represents revenue, bottom line represents expenses"
					sideText="+4%"
				/>
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart
						data={revenueExpenses}
						margin={{
							top: 20,
							right: 25,
							left: -5,
							bottom: 80,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="name"
							tickLine={false}
							style={{ fontSize: "10px", fill: COLOR_FONT }}
						/>
						<YAxis
							tickLine={false}
							axisLine={{ strokeWidth: "0" }}
							style={{ fontSize: "10px", fill: COLOR_FONT }}
							domain={MONTHLY_DATA_DOMAIN}
						/>
						<Tooltip />
						<defs>
							<linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor={palette.primary[500]}
									stopOpacity={0.3}
								/>
								<stop
									offset="95%"
									stopColor={palette.primary[400]}
									stopOpacity={0}
								/>
							</linearGradient>
							<linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor={palette.secondary[300]}
									stopOpacity={0.2}
								/>
								<stop
									offset="95%"
									stopColor={palette.secondary[500]}
									stopOpacity={0.8}
								/>
							</linearGradient>
						</defs>
						<Area
							type="monotone"
							dataKey="revenue"
							dot={true}
							stroke={palette.primary.main}
							fillOpacity={1}
							fill="url(#colorRevenue)"
						/>
						<Area
							type="monotone"
							dataKey="expenses"
							dot={true}
							stroke={palette.secondary.dark}
							fillOpacity={1}
							fill="url(#colorExpenses)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</DashboardBox>
			<DashboardBox gridArea="b">
				<BoxHeader
					title="Profit and Revenue"
					subtitle="top line represents revenue, bottom line represents expenses"
					sideText="+4%"
				/>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={revenueProfit}
						margin={{
							top: 20,
							right: 0,
							left: -20,
							bottom: 55,
						}}
					>
						<CartesianGrid
							vertical={false}
							stroke={COLOR_FONT}
							strokeDasharray="3 3"
						/>
						<XAxis
							dataKey="name"
							tickLine={false}
							style={{ fontSize: "10px", fill: COLOR_FONT }}
						/>
						<YAxis
							yAxisId="left"
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
						<Legend
							height={20}
							wrapperStyle={{
								margin: "0 0 10px 0",
							}}
						/>
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
			<DashboardBox gridArea="c"></DashboardBox>
		</>
	);
};

export default Row_1;
