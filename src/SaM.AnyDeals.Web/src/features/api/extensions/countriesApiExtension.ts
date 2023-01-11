import {
  BaseQueryApi,
} from "@reduxjs/toolkit/query/react";
import { City } from "../../../models/api/city";
import { Country } from "../../../models/api/country";
import { CommonResponse } from "../../../models/api/responses/commonResponse";
import { baseApi } from "../baseApi";

export const countriesApiExtension = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<Country[], void>({
      query: () => ({
        url: "/api/countries",
        method: "GET",
      }),
      transformResponse: (response: CommonResponse) => response.body,
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
  overrideExisting: false,
});

export const { useGetCountriesQuery, useGetCitiesQuery } = countriesApiExtension;
