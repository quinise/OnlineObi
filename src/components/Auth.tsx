// This file includes the middleware for the Googe Provider
import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase.config";

const Auth =({ children }: { children: React.ReactNode }) => {
    const [user, loading, error] = useAuthState(auth);

    if (error) {
        console.log("Auth Middleware Error: " + error);
        return <Navigate to="/" />
    }
    
    if (loading || user === undefined) {
        return null;
    } 
    
    if (!user) {
        return <Navigate to="/" />
    } 
    
    if (user) {
        return children;
    }
};

export default Auth