import React, {Suspense} from 'react'
import {Route, Routes} from 'react-router-dom';
import './App.css'
import {ThemeProvider} from "styled-components";
import {dark, light} from "./Theme";
import Signup from "./pages/auth/signup/Signup";
import Login from "./pages/auth/login/Login";
import Home from "./pages/main/home/Home";
import {AuthorizedRoute} from "./components/route/AuthorizedRoute";
import {Recommendations} from "./pages/main/recommendations/Recommendations";
import {Explore} from "./pages/main/explore/Explore";
import {Profile} from "./pages/main/profile/Profile";
import {Messages} from "./pages/main/messages/Messages";
import i18n from "i18next";
import Backend from "i18next-http-backend/cjs";
import {initReactI18next} from "react-i18next";

const languages = ["en", "es"];

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: "es",
        fallbackLng: "en", // use et if detected lng is not available
        saveMissing: true, // send not translated keys to endpoint
        debug: true,
        whitelist: languages,
    });


function App() {

    return (
        <Suspense>
            <ThemeProvider theme={dark}>
                <AuthorizedRoute>
                    <Routes>
                        <Route path="/feed/*" element={<Home/>}/>
                        <Route path={"/recommendations"} element={<Recommendations/>}/>
                        <Route path={"/explore"} element={<Explore/>}/>
                        <Route path={"/profile/:profileId"} element={<Profile/>}/>
                        <Route path={"/messages"} element={<Messages/>}/>
                    </Routes>
                </AuthorizedRoute>
                <Routes>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </ThemeProvider>
        </Suspense>
    )
}

export default App
