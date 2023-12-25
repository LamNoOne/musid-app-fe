import { store } from "../../app/store";

export default function expiredToken () {
    const state = store.getState()
    const authToken = String(state.token.accessToken)
    if(!authToken) return true
    const decodedJWT = JSON.parse(atob(authToken.split(".")[1]))
    if(decodedJWT.exp * 1000 < Date.now()) return true
    return false
}