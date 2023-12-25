const CURRENT_LOCATION = new URL(window.location.href);
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_CALLBACK_URL;
const GRANT_TYPE = process.env.REACT_APP_GRANT_TYPE_AUTHORIZATION;
const AUTHORIZATION_CODE = CURRENT_LOCATION.searchParams.get("code");
const STATE_FROM_LOCATION = CURRENT_LOCATION.searchParams.get("state");
const CODE_VERIFIER = window.sessionStorage.getItem("code_verifier");

export default async function getToken() {
    const tokenEndpoint = new URL(process.env.REACT_APP_ACC_TOKEN_URL);

    // if (window.sessionStorage.getItem("state") !== STATE_FROM_LOCATION) {
    //     throw Error("Probable session hijacking attack!");
    // }

    const queryParams = {
        client_id: CLIENT_ID,
        grant_type: GRANT_TYPE,
        state: STATE_FROM_LOCATION,
        code: AUTHORIZATION_CODE,
        code_verifier: CODE_VERIFIER,
        redirect_uri: REDIRECT_URI,
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
