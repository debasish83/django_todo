import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route, BrowserRouter} from "react-router-dom";
import Auth from './components/auth';
import {CookiesProvider} from 'react-cookie';

//We can use Context to pass the Auth details to different components
//export const TokenContext = createContext(null);

/*
<TokenContext.Provider value={{token, setToken}}>
    <BrowserRouter>
        <Route exact path="/" component={Auth} />
        <Route exact path="/movies" component={App}/>
    </BrowserRouter>
</TokenContext.Provider>
*/
function Router() {
    return (
        <React.StrictMode>
            <CookiesProvider>
                <BrowserRouter>
                    <Route exact path="/" component={Auth} />
                    <Route exact path="/movies" component={App}/>
                </BrowserRouter>
            </CookiesProvider>
        </React.StrictMode>
    )
}

// We need to have a support for Auth and App components and we use
// router to appropriately route it
// We need to enable the token for all the components
ReactDOM.render(<Router />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
