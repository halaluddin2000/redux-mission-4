import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priority) => {
        const params = new URLSearchParams();

        if (priority) {
          params.append("priority", priority);
        }
        return {
          url: "/tasks",
          methods: "GET",
          params: params,
        };
      },
      providesTags: ["todo"],
    }),
    addTodos: builder.mutation({
      query: (data) => {
        console.log("inside base api =>", data);
        return {
          url: "/task",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["todo"],
    }),
    updateTodo: builder.mutation({
      query: (options) => {
        console.log("inside base api =>", options);
        return {
          url: `/task/${options.id}`,
          method: "PUT",
          body: options.data,
        };
      },
      invalidatesTags: ["todo"],
    }),
  }),
});

export const { useGetTodosQuery, useAddTodosMutation, useUpdateTodoMutation } =
  baseApi;
