import { auth } from "./../../GoogleProvider.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";

const Auth =({ children }) => {
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