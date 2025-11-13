import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://147.93.29.211:3008/api/v1";

interface Technician {
  id: number;
  name: string;
  role: string;
  phone: string;
  email: string;
  rating: number;
  isActive: boolean;
}

interface GetTechniciansResponse {
  data: Technician[];
  total: number;
  page: number;
  limit: number;
}

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
  tagTypes: ["route_optima", "Technician", "TimeSlot"],
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
    // Add Technician
    addTechnician: builder.mutation({
      query: ({ data, photo }) => {
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("data", JSON.stringify(data));

        return {
          url: "/technician/add-technician",
          method: "POST",
          body: formData,
        };
      },
    }),

    // ✅ Get All Technicians
    getAllTechnicians: builder.query<
      GetTechniciansResponse,
      {
        page?: number;
        limit?: number;
        search?: string;
        address?: string;
        isActive?: boolean;
      } | void
    >({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        address = "",
        isActive = true,
      } = {}) => ({
        url: `/technician/all-technicians`,
        method: "GET",
        params: { page, limit, search, address, isActive },
      }),
      providesTags: ["Technician"],
    }),

    // Update Technician
    updateTechnician: builder.mutation({
      query: ({ id, data, photo }) => {
        const formData = new FormData();
        if (photo) formData.append("photo", photo);
        formData.append("data", JSON.stringify(data));

        return {
          url: `/technician/update-technician/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Technician"],
    }),

    // Delete Technician
    deleteTechnician: builder.mutation({
      query: (id) => ({
        url: `/technician/delete-technician/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Technician"],
    }),

    //  Time Slot APIs
    getAllTimeSlots: builder.query({
      query: () => "/default-time-slot/all",
      providesTags: ["TimeSlot"],
    }),

    addTimeSlot: builder.mutation({
      query: (body) => ({
        url: "/default-time-slot/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TimeSlot"],
    }),

    updateTimeSlot: builder.mutation({
      query: ({ id, startTime, endTime }) => ({
        url: `/default-time-slot/update/${id}`,
        method: "PATCH",
        body: { startTime, endTime },
      }),
      invalidatesTags: ["TimeSlot"],
    }),

    deleteTimeSlot: builder.mutation({
      query: (id) => ({
        url: `/default-time-slot/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TimeSlot"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useAddTechnicianMutation,
  useGetAllTechniciansQuery,
  useUpdateTechnicianMutation, 
  useDeleteTechnicianMutation,
  useGetUserProfileQuery,
  useGetAllTimeSlotsQuery,
  useAddTimeSlotMutation,
  useUpdateTimeSlotMutation,
  useDeleteTimeSlotMutation,
} = libraryApi;
