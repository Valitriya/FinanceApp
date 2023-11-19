export interface ExpansesByCategory {
    salaries: number;
    supplies: number;
    services: number;
}
export interface Month{
    id: string;
    month: string;
    revenue: number;
    expenses: number;
    nonOperationalExpenses: number;
    operationalExpenses: number;
}
export interface Day{
    id: string;
    date: string;
    revenue: number;
    expenses: number;
}
export interface MonthlyDataItem{
    revenue: number,
    expenses: number,
    profit?: number;
}
export interface GetKpisResponse{
    id: string;
    __id: string;
    __v: number;
    totalProfit: number;
    totalRevenue: number;
    totalExpenses: number;
    expensesByCategory: ExpansesByCategory;
    monthlyData: Array<Month>;
    dailyData: Array<Day>;
}
export interface GetProductsResponse{
    id: string;
    __id: string;
    __v: number;
    price: number;
    expense: number;
    transactions: Array<string>;
    createdAt: string;
    updatedAt: string;   
}
