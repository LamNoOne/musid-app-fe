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

export const getAccessTokenState = (state) => state.token.accessToken;
export const getRefreshTokenState = (state) => state.token.refreshToken;

export const { saveToken } = tokenSlice.actions;

export default tokenSlice.reducer;
