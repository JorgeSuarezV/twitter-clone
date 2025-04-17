import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export type AuthorizedRouteProps = {
    children: JSX.Element;
}

export const AuthorizedRoute = ({children}: AuthorizedRouteProps): JSX.Element => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token === null) {
            navigate("/login");
        }
    }, [token]);

    return (
        <>
            {children}
        </>
    )
};

