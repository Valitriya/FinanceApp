import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse } from "./types";

export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
	reducerPath: "main",
	tagTypes: ["Kpis", "Products"],
	endpoints: (build) => ({
		getKpis: build.query<Array<GetKpisResponse>, void>({
			query: () => "kpi/kpis",
			providesTags: ["Kpis"],
		}),
		getProducts: build.query<Array<GetKpisResponse>, void>({
			query: () => "product/products",
			providesTags: ["Products"],
		}),
	}),
});

export const { useGetKpisQuery } = api;
