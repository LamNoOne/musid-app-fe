import randomstring from "randomstring";
import { encode as base64encode } from "base64-arraybuffer";
import env from '../../config/environment'

export default async function createUrlLogin() {
    const state = randomstring.generate();
    const codeVerified = randomstring.generate(128);

    function saveStateAndVerifier() {
        if (window.location.search.includes("state")) return;
        const storage = window.sessionStorage;
        storage.clear();
        storage.setItem("state", state);
        storage.setItem("code_verifier", codeVerified);
    }

    saveStateAndVerifier();

    async function generateCodeChallenge(codeVerifier) {
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest(env.cryptographyAlgorithm, data);
        const base64Digest = base64encode(digest);

        return base64Digest
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=/g, "");
    }

    return generateCodeChallenge(codeVerified).then((codeChallenge) =>
        buildLoginUrl(codeChallenge)
    );

    function buildLoginUrl(codeChallenge) {
        const linkValue = new URL(process.env.REACT_APP_AUTH_URL);

        const queryParams = {
            client_id: env.clientId,
            response_type: env.responseType,
            state: state,
            code_challenge: codeChallenge,
            code_challenge_method: env.codeChallengeMethod,
            redirect_uri: env.redirectURI,
        };

        for (const param in queryParams) {
            linkValue.searchParams.append(param, queryParams[param]);
        }

        return linkValue;
    }
}

// After login, redirect to old page, not new page, check if state is valid
// to detect session hijacking attack => handle later
