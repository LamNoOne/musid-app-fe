import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: "token",
    initialState: {
        accessToken: null,
        refreshToken: null,
    },
    reducers: {
        saveToken: (state, action) => {
            const { access_token, refresh_token } = action.payload;
            state.accessToken = access_token;
            state.refreshToken = refresh_token;
        },
    },
});

export const getTokenState = (state) => state.token;

export const { saveToken } = tokenSlice.actions;

export default tokenSlice.reducer;
