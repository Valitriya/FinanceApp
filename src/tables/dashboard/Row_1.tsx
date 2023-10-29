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
	const COLOR_FONT = palette.grey[800]

	const revenueExpenses = useMemo(() => {
		if (!data || !Array.isArray(data[0]?.monthlyData)) return [];

		return data[0].monthlyData.map(({ month, revenue, expenses }) => ({
			name: month.substring(0, 3),
			revenue,
			expenses,
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
							style={{ fontSize: "10px", fill: COLOR_FONT}}
						/>
						<YAxis
							tickLine={false}
							axisLine={{ strokeWidth: "0" }}
							style={{ fontSize: "10px", fill: COLOR_FONT}}
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
			<DashboardBox gridArea="b"></DashboardBox>
			<DashboardBox gridArea="c"></DashboardBox>
		</>
	);
};

export default Row_1;
