import "./App.css";
import { useEffect, useState } from "react";
import createUrlLogin from "./services/login/urlLoginService";
import { useDispatch, useSelector } from 'react-redux'
import getToken from "./services/login/getTokenService";
import { getTokenState, saveToken } from "./features/token/tokenSlice";
import expiredToken from "./services/expiredToken";


const App = () => {
    const dispatch = useDispatch()
    const tokenState = useSelector(getTokenState)
    const [urlLogin, setUrlLogin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getUrlLogin() {
            try {
                const url = await createUrlLogin();
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
        const token = await getToken()
        if(token) {
            dispatch(saveToken({...token}))
        }
    }

    console.log(tokenState)
    console.log(expiredToken())

    return (
        <>
            <a href={`${urlLogin}`}>LOGIN</a>
            <button onClick={() => handleGetToken()}>GET TOKEN</button>
        </>
    );
};
export default App;
