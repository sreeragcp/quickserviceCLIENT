import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// const baseQuery = fetchBaseQuery({baseUrl:'https://quickservice.website'});
const baseQuery = fetchBaseQuery({baseUrl:'https://quickservice.website'});

export const apiSlice = createApi({
    baseQuery,
    tagTypes:['User'],
    endpoints:(builder)=>({})
})