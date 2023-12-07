import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/state/api";

const Row_3 = () => {
	const {data: kpiData} = useGetKpisQuery();
	const {data: productData} = useGetProductsQuery();
	const {data: transactionData} = useGetTransactionsQuery();

	return (
		<>
			<DashboardBox gridArea="h"></DashboardBox>
			<DashboardBox gridArea="g"></DashboardBox>
			<DashboardBox gridArea="i"></DashboardBox>
			<DashboardBox gridArea="j"></DashboardBox>
		</>
	);
};

export default Row_3;
