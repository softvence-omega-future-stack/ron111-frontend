import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://147.93.29.211:3008/api/v1";

export const libraryApi = createApi({
  reducerPath: "libraryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as { auth?: { token?: string } };
      let token = state?.auth?.token;
      if (!token && typeof window !== "undefined") {
        token = localStorage.getItem("accessToken") ?? undefined;
      }
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["route_optima"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    getUserProfile: builder.query({
      query: () => "/auth/me",
      providesTags: ["route_optima"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserProfileQuery,
} = libraryApi;
