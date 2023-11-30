import { useMemo } from "react";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import DashboardBox from "@/components/DashboardBox";
import BoxHeader from "@/components/BoxHeader";
import { GetKpisResponse, MonthlyDataItem } from "@/state/types";
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
	BarChart,
	Bar,
} from "recharts";

const generateMonthlyData = (
	data: GetKpisResponse | undefined,
	mapFunction: (revenue: number, expenses: number) => MonthlyDataItem
): MonthlyDataItem[] => {
	if (!data || !Array.isArray(data.monthlyData)) return [];

	return data.monthlyData.map(({ revenue, expenses, month }) => ({
		name: month.substring(0, 3),
		...mapFunction(revenue, expenses),
	}));
};
const Row_1 = () => {
	const { palette } = useTheme();
	const { data } = useGetKpisQuery();

	const MONTHLY_DATA_DOMAIN = [8000, 23000];

	const COLOR_FONT = palette.grey[800];

	const revenueExpenses = useMemo(
		() =>
			generateMonthlyData(data?.[0], (revenue, expenses) => ({
				revenue,
				expenses,
			})),
		[data]
	);

	const revenueProfit = useMemo(
		() =>
			generateMonthlyData(data?.[0], (revenue, expenses) => ({
				revenue,
				expenses:  expenses || 0,
				profit: parseFloat((revenue - expenses).toFixed(2)),
			})),
		[data]
	);

	const revenue = useMemo(
		() =>
			generateMonthlyData(data?.[0], (revenue) => ({
				revenue,
				expenses: 0,
			})),
		[data]
	);
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
							right: 5,
							left: -5,
							bottom: 60,
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
			<DashboardBox gridArea="c">
				<BoxHeader
					title="Revenue Month by Month"
					subtitle="graph representing the revenue month by month"
					sideText="+4%"
				/>
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={revenue}
						margin={{
							top: 20,
							right: 25,
							left: -5,
							bottom: 80,
						}}
					>
						<defs>
							<linearGradient id="colorRevenueM" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor={palette.primary[300]}
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor={palette.primary[700]}
									stopOpacity={1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} stroke={COLOR_FONT} />
						<XAxis
							dataKey="name"
							axisLine={false}
							tickLine={false}
							style={{ fontSize: "10px", fill: COLOR_FONT }}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							style={{ fontSize: "10px", fill: COLOR_FONT }}
						/>
						<Tooltip />
						<Bar dataKey="revenue" fill="url(#colorRevenueM)" />
					</BarChart>
				</ResponsiveContainer>
			</DashboardBox>
		</>
	);
};

export default Row_1;
