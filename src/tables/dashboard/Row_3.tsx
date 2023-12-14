import DashboardBox from "@/components/DashboardBox";
import BoxHeader from "@/components/BoxHeader";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
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
	const COLOR_FONT = palette.grey[800];

	const productColumns = [
		{
			field: "_id",
			headerName: "id",
			flex: 1,
		},
		{
			field: "expense",
			headerName: "Expense",
			flex: 0.5,
			renderCell: (params: GridCellParams) => `$${params.value}`,
		},
		{
			field: "price",
			headerName: "Price",
			flex: 0.5,
			renderCell: (params: GridCellParams) => `$${params.value}`,
		},
	];
	return (
		<>
			<DashboardBox gridArea="h">
				<BoxHeader
					title="List of Products"
					sideText={`${productData?.length} products`}
				/>
				<Box
					mt="0.4rem"
					p="0 0.5rem"
					height="70%"
					sx={{
						"& .MuiDataGrid-root": {
							color: palette.grey[300],
							border: "none",
						},
						'& .MuiDataGrid-cell[class*="cell"]': {
							borderBottom: `1px solid ${COLOR_FONT}`,
						},
						"& .MuiDataGrid-columnHeaders": {
							borderBottom: `1px solid ${COLOR_FONT} !important`,
							paddingBottom: "2px",
						},
					}}
				>
					<DataGrid
						columnHeaderHeight={15}
						rowHeight={35}
						hideFooter={true}
						rows={productData || []}
						columns={productColumns}
					/>
				</Box>
			</DashboardBox>
			<DashboardBox gridArea="g">
				<BoxHeader
					title="Recent Orders"
					sideText={`${transactionData?.length} latest transactions`}
				/>
				<Box
					mt="1rem"
					p="0 0.5rem"
					height="80%"
					sx={{
						"& .MuiDataGrid-root": {
							color: palette.grey[300],
							border: "none",
						},
						'& .MuiDataGrid-cell[class*="cell"]': {
							borderBottom: `1px solid ${COLOR_FONT}`,
						},
						"& .MuiDataGrid-columnHeaders": {
							borderBottom: `1px solid ${COLOR_FONT} !important`,
							paddingBottom: "2px",
						},
					}}
				>
					<DataGrid
						columnHeaderHeight={15}
						rowHeight={35}
						hideFooter={true}
						rows={transactionData || []}
						columns={transactionColumns}
					/>
				</Box>
			</DashboardBox>
			<DashboardBox gridArea="i"></DashboardBox>
			<DashboardBox gridArea="j"></DashboardBox>
		</>
	);
};

export default Row_3;
