// This file includes the middleware for the Googe Provider
import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";

const Auth =({ children }: { children: React.ReactNode }) => {
    const [user, loading, error] = useAuthState(auth);

    React.useEffect(() => {
        if (error) {
            console.log("Auth Middleware Error: " + error);
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));
        }
        if (!loading && user === null) {
            // not authenticated — navigate to root
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));
        }
    }, [error, loading, user]);

    if (loading || user === undefined) return null;
    if (error || !user) return null;
    return children;
};

export default Auth