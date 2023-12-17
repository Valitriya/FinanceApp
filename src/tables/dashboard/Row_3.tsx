import DashboardBox from "@/components/DashboardBox";
import BoxHeader from "@/components/BoxHeader";
import FlexBetween from "@/components/FlexBetween";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import {
	useGetKpisQuery,
	useGetProductsQuery,
	useGetTransactionsQuery,
} from "@/state/api";
import { Cell, Pie, PieChart } from "recharts";

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
	const transactionColumns = [
		{
			field: "_id",
			headerName: "id",
			flex: 1,
		},
		{
			field: "buyer",
			headerName: "Buyer",
			flex: 0.67,
		},
		{
			field: "amount",
			headerName: "Amount",
			flex: 0.35,
			renderCell: (params: GridCellParams) => `$${params.value}`,
		},
		{
			field: "productIds",
			headerName: "Count",
			flex: 0.1,
			renderCell: (params: GridCellParams) =>
				(params.value as Array<string>).length,
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
					height="75%"
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
			<DashboardBox gridArea="i">
				<BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
				<FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
					<Box>
						<PieChart
							width={110}
							height={100}
						>
							<Pie
								stroke="none"
								data={data}
								innerRadius={18}
								outerRadius={38}
								paddingAngle={2}
								dataKey="value"
							>
								{data.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={pieColors[index]} />
								))}
							</Pie>
						</PieChart>
						<Typography variant="h5">{data[0].name}</Typography>
					</Box>
				</FlexBetween>
			</DashboardBox>
			<DashboardBox gridArea="j"></DashboardBox>
		</>
	);
};

export default Row_3;
