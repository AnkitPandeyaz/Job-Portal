import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...rest }) {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    const isAuthenticated = token ? true : false;

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/" />
                )
            }
        />
    );
}

export default ProtectedRoute;
