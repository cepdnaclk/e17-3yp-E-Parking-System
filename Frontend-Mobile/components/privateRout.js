import React, {component} from 'react';
import {Redirect, Route} from "react-router-native";

const PrivateRoute = ({component: Component, ...rest}) => {


    return (
        
        <Route
            {...rest}
            
            render={(props) => 
                localStorage.getItem("authToken") ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login"/>
                )
            }
        
        />
    )
}

export default PrivateRoute