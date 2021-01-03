import React, {useState, useEffect} from 'react';
import API from '../api-services';
//import {TokenContext} from "../index";
import {useCookies} from "react-cookie";

//It's always advisable to do authentication on server side and skip
//doing it on javascript side
//Auth should get username/password, create user and get back the autnetication
//token to work with it
//context is fine but it's in application memory but this is not persistant
//Ideally it should be stored outside of memory via cookies and retrieved from cookies
function Auth() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginView, setIsLoginView] = useState(true);

    //For sharing global data context is the way to do it
    //For less nesting props based transfer is fine
    //useCookies is also implemented as a hook
    //const {token, setToken} = useContext(TokenContext);
    const [token, setToken] = useCookies(['mr-token']);

    useEffect(() => {
        console.log("auth useEffect " + token);
        // if token is available then go to movies
        // react/node tutorial used link to go to specific location
        if (token['mr-token']) window.location.href = '/movies';
    }, [token])

    //For the user a token is generated and sent back
    //This is the code that we added for auth generation
    //We can story the token in local-storage and cookies
    //and next time use the token to authenticate
    const loginClicked = () => {
        console.log(`auth loginClicked ${username} ${password}`)
        API.loginUser({username, password})
            //.then(resp => setToken(resp.token))
            //.then(resp => console.log(resp.token))
            .then(resp => setToken('mr-token', resp.token))
            .catch(error => console.log(error))
    }

    const registerClicked = () => {
        console.log(`auth registerClicked ${username} ${password}`)
        API.registerUser({username, password})
            .then(() => loginClicked())
            .catch(error => console.log(error))
    }

    const isDisabled = username.length === 0 || password.length === 0;

    return (
        <div className="App">
            <header className="App-header">
                {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
            </header>
            <div class="login-container">
                <label htmlFor={"username"}>Username</label><br/>
                <input id="username"
                       type="text"
                       placeholder="username"
                       value={username}
                       onChange={evt => setUsername(evt.target.value)}
                /><br/>
                <label htmlFor={"password"}>Password</label><br/>
                <input id={"password"}
                       type={"password"}
                       placeholder={"password"}
                       value={password}
                       onChange={evt => setPassword(evt.target.value)}
                >
                </input><br/>
                {isLoginView ?
                    <button onClick={loginClicked} disabled={isDisabled}>Login</button>:
                    <button onClick={registerClicked} disabled={isDisabled}>Register</button>
                }
                {isLoginView ?
                    <p onClick={() => setIsLoginView(false)}>You don't have an account ? Register here! </p> :
                    <p onClick={() => setIsLoginView(true)}>You already have an account ? Login here </p>
                }
            </div>
        </div>
    )
}

export default Auth;