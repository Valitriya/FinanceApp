import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import {
	ResponsiveContainer,
	AreaChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Area,
} from "recharts";

const Row_1 = () => {
	const { data } = useGetKpisQuery();
	console.log("data:", data);
	return (
		<>
			<DashboardBox gridArea="a">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart
						width={500}
						height={400}
						data={data}
						margin={{
							top: 10,
							right: 30,
							left: 0,
							bottom: 0,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<defs>
							<linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
								<stop offset={off} stopColor="green" stopOpacity={1} />
								<stop offset={off} stopColor="red" stopOpacity={1} />
							</linearGradient>
						</defs>
						<Area
							type="monotone"
							dataKey="uv"
							stroke="#000"
							fill="url(#splitColor)"
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
