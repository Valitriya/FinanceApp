import DashboardBox from "@/components/DashboardBox";
import BoxHeader from "@/components/BoxHeader";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
	useGetKpisQuery,
	useGetProductsQuery,
	useGetTransactionsQuery,
} from "@/state/api";

const Row_3 = () => {
	const { data: kpiData } = useGetKpisQuery();
	const { data: productData } = useGetProductsQuery();
	const { data: transactionData } = useGetTransactionsQuery();

	const { palette } = useTheme();

	return (
		<>
			<DashboardBox gridArea="h">
				<BoxHeader
					title="List of Products"
					sideText={`${productData?.length} products`}
				/>
				<Box
					mt="0.5rem"
					p="0 0.5rem"
					height="75%"
					sx={{
						"& .MuiDataGrid-root": {
							color: palette.grey[300],
							border: "none",
						},
					}}
				>
					<DataGrid
						rows={productData || []}
						columns={productColumns}/>
				</Box>
			</DashboardBox>
			<DashboardBox gridArea="g"></DashboardBox>
			<DashboardBox gridArea="i"></DashboardBox>
			<DashboardBox gridArea="j"></DashboardBox>
		</>
	);
};

export default Row_3;
