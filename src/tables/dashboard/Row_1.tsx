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
		return (
			data[0].monthlyData.map(({ month, revenue, expenses }) => {
				return {
					name: month.substring(0, 3),
					revenue,
					expenses,
				};
			})
		);
	}, [data]);
	
	const gradientOffset = () => {
		const dataMax = Math.max(...revenueExpenses.map((i) => i.revenue));
		const dataMin = Math.min(...revenueExpenses.map((i) => i.revenue));

		if (dataMax <= 0) {
			return 0;
		}
		if (dataMin >= 0) {
			return 1;
		}

		return dataMax / (dataMax - dataMin);
	};

	const off = gradientOffset();
	return (
		<>
			<DashboardBox gridArea="a">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart
						width={500}
						height={400}
						data={revenueExpenses}
						margin={{
							top: 10,
							right: 30,
							left: 0,
							bottom: 0,
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
							<linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset={off}
									stopColor={palette.primary.light}
									stopOpacity={1}
								/>
								<stop
									offset={off}
									stopColor={palette.secondary.dark}
									stopOpacity={1}
								/>
							</linearGradient>
						</defs>
						<Area
							type="monotone"
							dataKey="expenses"
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
