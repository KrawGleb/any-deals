import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { City } from "../../models/api/city";
import { Country } from "../../models/api/country";


export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({}),
  endpoints: (builder) => ({
    getCountries: builder.query<Country[], void>({
      query: () => ({
        url: "/api/countries",
        method: "GET",
      }),
      transformResponse: (response: any) => response.body,
    }),
    getCities: builder.query<City[], number>({
      query: (countryId) => ({
        url: `/api/countries/${countryId}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.body
    }),
  }),
});

export const { useGetCountriesQuery, useGetCitiesQuery } = countriesApi;
