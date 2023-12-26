const clientId = process.env.REACT_APP_CLIENT_ID;
const scope = process.env.REACT_APP_REQUEST_SCOPE;
const responseType = process.env.REACT_APP_RESPONSE_TYPE;

const authURL = process.env.REACT_APP_AUTH_URL;
const redirectURI = process.env.REACT_APP_CALLBACK_URL;
const accessTokenURL = process.env.REACT_APP_ACC_TOKEN_URL;

const tokenPersistKey = process.env.REACT_APP_TOKEN_PERSIST_KEY;
const codeChallengeMethod = process.env.REACT_APP_CODE_CHALLENGE_METHOD;
const cryptographyAlgorithm = process.env.REACT_APP_CRYPTOGRAPHIC_ALGORITHM;

const grantTypeAuthorization = process.env.REACT_APP_GRANT_TYPE_AUTHORIZATION;
const grantTypeRefreshToken = process.env.REACT_APP_GRANT_TYPE_REFRESH_TOKEN;

const environment = Object.freeze({
    clientId,
    scope,
    responseType,
    authURL,
    redirectURI,
    accessTokenURL,
    tokenPersistKey,
    codeChallengeMethod,
    cryptographyAlgorithm,
    grantTypeAuthorization,
    grantTypeRefreshToken,
});

export default environment;
