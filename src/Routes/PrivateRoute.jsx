import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext);

    if(user) {
        return children;
    }
    return <Navigate to="/auth/joinUs"></Navigate>
};

export default PrivateRoute;