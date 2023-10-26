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
export interface GetKpisResponse{
    id: string;
    __id: string;
    __v: number;
    totalProfit: number;
    totalRevenue: number;
    totalExpenses: number;
    expensesByCategory: ExpansesByCategory;
    monthlyData: Array<Month>;
}