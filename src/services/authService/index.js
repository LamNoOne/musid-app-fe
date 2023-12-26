import getToken from "./getTokenService"
import refreshToken from "./refreshTokenService"
import createUrlLogin from "./urlLoginService"

const authService = Object.freeze({
    getToken,
    refreshToken,
    createUrlLogin
})

export default authService