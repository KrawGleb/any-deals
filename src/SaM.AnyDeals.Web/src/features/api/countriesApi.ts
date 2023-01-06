import {
  BaseQueryApi,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { City } from "../../models/api/city";
import { Country } from "../../models/api/country";
import { CommonResponse } from "../../models/api/responses/commonResponse";

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
      async queryFn(
        countryId: number,
        _queryApi: BaseQueryApi,
        _extraOptions: {},
        fetchWithBQ
      ) {
        if (countryId > 0) {
          const cities = await fetchWithBQ(`/api/countries/${countryId}`);

          return { data: (cities.data as CommonResponse).body as City[] };
        } else return { data: [] as City[] };
      },
    }),
  }),
});

export const { useGetCountriesQuery, useGetCitiesQuery } = countriesApi;
