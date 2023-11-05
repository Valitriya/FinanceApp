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

	const COLORS_STROKE = {
		PRIMARY: palette.primary.main,
		SECONDARY: palette.secondary.dark,
	};

	const REVENUE_COLOR_TOP = palette.primary[500];
	const EXPENSES_COLOR_TOP = palette.secondary[500];
	const REVENUE_COLOR_DOWN = palette.primary[400];
	const EXPENSES_COLOR_DOWN = palette.secondary[300];
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

	const CustomizedDot = (props) => {
		const { cx, cy, stroke, payload, value } = props;

		if (value > 2500) {
			return (
				<svg
					x={cx - 10}
					y={cy - 10}
					width={20}
					height={20}
					fill="green"
					viewBox="0 0 1024 1024"
				>
					<path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
				</svg>
			);
		}

		return (
			<svg
				x={cx - 10}
				y={cy - 10}
				width={20}
				height={20}
				fill="red"
				viewBox="0 0 1024 1024"
			>
				<path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
			</svg>
		);
	};
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
									stopColor={REVENUE_COLOR_TOP}
									stopOpacity={0.3}
								/>
								<stop
									offset="95%"
									stopColor={REVENUE_COLOR_DOWN}
									stopOpacity={0}
								/>
							</linearGradient>
							<linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor={EXPENSES_COLOR_DOWN}
									stopOpacity={0.2}
								/>
								<stop
									offset="95%"
									stopColor={EXPENSES_COLOR_TOP}
									stopOpacity={0.8}
								/>
							</linearGradient>
						</defs>
						<Area
							type="monotone"
							dataKey="revenue"
							dot={true}
							stroke={COLORS_STROKE.PRIMARY}
							fillOpacity={1}
							fill="url(#colorRevenue)"
						/>
						<Area
							type="monotone"
							dataKey="expenses"
							dot={true}
							stroke={COLORS_STROKE.SECONDARY}
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
							stroke={REVENUE_COLOR_TOP}
						/>
					</LineChart>
				</ResponsiveContainer>
			</DashboardBox>
			<DashboardBox gridArea="c"></DashboardBox>
		</>
	);
};

export default Row_1;
