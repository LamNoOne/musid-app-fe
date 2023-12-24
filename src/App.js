import "./App.css";
import { Link, Route, Routes, useHistory } from "react-router-dom";
import axios from "axios";
import generateUrlLogin from "./services/login/urlLoginService";
import { useEffect, useState } from "react";
import createUrlLogin from "./services/login/urlLoginService";


const App = () => {
    const [urlLogin, setUrlLogin] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getUrlLogin () {
            try {
                const url = await createUrlLogin()
                setUrlLogin(url)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }

        getUrlLogin()
    }, [])

    if(loading) {
        return <div>Loading...</div>
    }

    if(error) {
        return <div>Error...</div>
    }

    return (
        <a href={`${urlLogin}`}>LOGIN</a>
    )
}
export default App;
