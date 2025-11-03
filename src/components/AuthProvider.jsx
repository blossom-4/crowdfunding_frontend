import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [auth, setAuth] = useState({
        token: window.localStorage.getItem("token"),
        userId: window.localStorage.getItem("userId"),
        username: window.localStorage.getItem("username"),
    });

    const setAuthUser = (userData) => {
        window.localStorage.setItem("token", userData.token);
        window.localStorage.setItem("userId", userData.userId);
        window.localStorage.setItem("username", userData.username);

        setAuth({
            token: userData.token,
            userId: userData.userId,
            username: userData.username,
        });
    };

    const clearAuth = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("userId");
        window.localStorage.removeItem("username");

        setAuth({
            token: null,
            userId: null,
            username: null,
        });
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, setAuthUser, clearAuth }}>
            {props.children}
        </AuthContext.Provider>
    );
};