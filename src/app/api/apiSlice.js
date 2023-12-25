import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'baseURL',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    // check if access token is invalid
    let result = await baseQuery(args, api, extraOptions)
    if (!accessToken) {
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/request-parameter', api, extraOptions)

        if(refreshResult) {
            // dispatch save credentials
            result = await baseQuery(args, api, extraOptions)
        } else {
            // call logout action
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})