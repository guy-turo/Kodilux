import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../../axios_base_query"
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: axiosBaseQuery({
        baseUrl: 'http://localhost:8000/api/v1',
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "/auth/login",
                method: 'post',
                body: {
                    email: email,
                    password: password
                }
            })
        }),
        signup: builder.mutation({
            query: ({ name, email, password }) => ({
                url: "/auth/signup",
                method: 'post',
                body: {
                    name: name,
                    email: email,
                    password: password
                }
            })
        }),
        logout: builder.mutation({
            query: ({ token }) => ({
                url: "/auth/logout",
                method: "post",
                body: { token: token }
            })
        }),
        recover: builder.mutation({
            query: ({ email }) => ({
                url: "/auth/recover",
                method: 'post',
                body: ({ email: email })
            })
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useSignupMutation,
    useRecoverMutation,
} = authApi