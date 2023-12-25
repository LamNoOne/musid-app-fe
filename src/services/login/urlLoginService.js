import randomstring from "randomstring";
import { encode as base64encode } from "base64-arraybuffer";

const STATE = randomstring.generate();
const CODE_VERIFIER = randomstring.generate(128);

const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE
const CODE_CHALLENGE_METHOD = process.env.REACT_APP_CODE_CHALLENGE_METHOD
const REACT_APP_CRYPTOGRAPHIC_ALGORITHM = process.env.REACT_APP_CRYPTOGRAPHIC_ALGORITHM

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_CALLBACK_URL;

export default async function createUrlLogin() {
    function saveStateAndVerifier() {
        if (window.location.search.includes("state")) return;
        const storage = window.sessionStorage;
        storage.clear();
        storage.setItem("state", STATE);
        storage.setItem("code_verifier", CODE_VERIFIER);
    }

    saveStateAndVerifier();

    async function generateCodeChallenge(codeVerifier) {
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest(REACT_APP_CRYPTOGRAPHIC_ALGORITHM, data);
        const base64Digest = base64encode(digest);

        return base64Digest
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=/g, "");
    }

    return generateCodeChallenge(CODE_VERIFIER).then((CHALLENGE) =>
        buildLoginUrl(CHALLENGE)
    );

    function buildLoginUrl(CHALLENGE) {
        const linkValue = new URL(process.env.REACT_APP_AUTH_URL);

        const queryParams = {
            client_id: CLIENT_ID,
            response_type: RESPONSE_TYPE,
            state: STATE,
            code_challenge: CHALLENGE,
            code_challenge_method: CODE_CHALLENGE_METHOD,
            redirect_uri: REDIRECT_URI,
        };

        for (const param in queryParams) {
            linkValue.searchParams.append(param, queryParams[param]);
        }

        return linkValue;
    }
}

// After login, redirect to old page, not new page, check if state is valid
// to detect session hijacking attack => handle later
