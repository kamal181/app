import React from "react";
import { useNavigate } from 'react-router-dom';
// This function takes a component...
function withNavigate(WrappedComponent) {
    return function (props) {
        // console.log("props - ", props);
        const navigate = useNavigate();
        const navigateToTarget = (url) => {
            navigate(url);
        }
        return <WrappedComponent {...props} navigateToTarget={navigateToTarget} />
    }
}



export default withNavigate;