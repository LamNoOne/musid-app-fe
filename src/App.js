import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getTokenState, saveToken } from "./features/token/tokenSlice";
import authService from "./services/authService";


const App = () => {
    const dispatch = useDispatch()
    const tokenState = useSelector(getTokenState)
    const [urlLogin, setUrlLogin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getUrlLogin() {
            try {
                const url = await authService.createUrlLogin();
                setUrlLogin(url);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        getUrlLogin();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error...</div>;
    }

    const handleGetToken = async () => {
        const token = await authService.getToken()
        if(token) {
            dispatch(saveToken({...token}))
        }
    }

    const handleRefreshToken =  async() => {
        const token = await authService.refreshToken()
        console.log('New token', token)
        if(token) {
            dispatch(saveToken({...token}))
        }
    }

    console.log(tokenState)
    // if(Boolean(tokenState)) {
    //     console.log(expiredToken())
    // }

    return (
        <>
            <a href={`${urlLogin}`}>LOGIN</a>
            <button onClick={() => handleGetToken()}>GET TOKEN</button>
            <button onClick={() => handleRefreshToken()}>REFRESH TOKEN</button>
        </>
    );
};
export default App;
