import DashboardBox from "@/components/DashboardBox";
import { useGetProductsQuery } from "@/state/api";

const Row_2 = () => {
	const {data} = useGetProductsQuery();
	console.log("data:", data)
	return (
		<>
			<DashboardBox gridArea="d"></DashboardBox>
			<DashboardBox gridArea="e"></DashboardBox>
			<DashboardBox gridArea="f"></DashboardBox>
		</>
	);
};

export default Row_2;
