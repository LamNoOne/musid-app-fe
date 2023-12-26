import env from '../../config/environment'

export default async function getToken() {
    const tokenEndpoint = new URL(env.accessTokenURL);
    const currentLocation = new URL(window.location.href);
    const authorizationCode = currentLocation.searchParams.get("code");
    const stateFromLocation = currentLocation.searchParams.get("state");
    const codeVerified = window.sessionStorage.getItem("code_verifier");

    // if (window.sessionStorage.getItem("state") !== stateFromLocation) {
    //     throw Error("Probable session hijacking attack!");
    //     useToast message to display
    // }

    const queryParams = {
        client_id: env.clientId,
        grant_type: env.grantTypeAuthorization,
        state: stateFromLocation,
        scope: env.scope,
        code: authorizationCode,
        code_verifier: codeVerified,
        redirect_uri: env.redirectURI,
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
