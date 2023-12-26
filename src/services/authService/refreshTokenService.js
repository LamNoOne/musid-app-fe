import env from '../../config/environment'
import { store } from '../../app/store'

export default async function refreshToken() {
    const state = store.getState()
    const refreshToken = state.token.refreshToken
    const tokenEndpoint = new URL(env.accessTokenURL);

    const queryParams = {
        client_id: env.clientId,
        grant_type: env.grantTypeRefreshToken,
        redirect_uri: env.redirectURI,
        scope: env.scope,
        refresh_token: refreshToken
    };

    for (const param in queryParams) {
        tokenEndpoint.searchParams.append(param, queryParams[param]);
    }

    const response = await fetch(`${tokenEndpoint.origin}${tokenEndpoint.pathname}`, {
        method: "POST",
        body: tokenEndpoint.searchParams,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
        },
    }).then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })

    return response
}
