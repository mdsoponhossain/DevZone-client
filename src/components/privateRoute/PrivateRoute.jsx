import { useContext } from "react";
import { Context } from "../../contextApi/ContextProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { dbUser, user } = useContext(Context);
   
    if (dbUser?.email === user?.email && dbUser?.role === 'admin') {
        return children;
    }
    else{
        return <Navigate to='/login'  ></Navigate>
    }

};

export default PrivateRoute;