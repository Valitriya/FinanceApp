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

const Row_1 = () => {
	const { palette } = useTheme();
	const { data } = useGetKpisQuery();

	const revenueExpenses = useMemo(() => {
		if (
			!data ||
			!Array.isArray(data) ||
			data.length === 0 ||
			!Array.isArray(data[0].monthlyData)
		) {
			return [];
		}
		return data[0].monthlyData.map(({ month, revenue, expenses }) => {
			return {
				name: month.substring(0, 3),
				revenue,
				expenses,
			};
		});
	}, [data]);

	
	return (
		<>
			<DashboardBox gridArea="a">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart
						data={revenueExpenses}
						margin={{
							top: 40,
							right: 25,
							left: -10,
							bottom: 30,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="name"
							tickLine={false}
							style={{ fontSize: "10px" }}
						/>
						<YAxis
							tickLine={false}
							axisLine={{ strokeWidth: "0" }}
							style={{ fontSize: "10px" }}
							domain={[8000, 23000]}
						/>
						<Tooltip />
						<defs>
							<linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset='5%'
									stopColor={palette.primary[500]}
									stopOpacity={0.3}
								/>
								<stop
									offset="95%"
									stopColor={palette.primary[300]}
									stopOpacity={0}
								/>
							</linearGradient>
							<linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset='5%'
									stopColor={palette.secondary[400]}
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
			<DashboardBox gridArea="b"></DashboardBox>
			<DashboardBox gridArea="c"></DashboardBox>
		</>
	);
};

export default Row_1;
