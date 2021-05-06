import React, { useState } from "react";
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { CrudService } from '../../services'
import { actions } from '../../modules'
export const Routes = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    /*** To ensure authentication the token must be verified before access to the private routes */
    const { isAuthorized, user, authToken } = useSelector(
        ({ auth }) => ({
            isAuthorized: auth.authToken && auth.user && typeof auth.user === "object",
            authToken: auth.authToken,
            user: auth.user
        })
    );
    if (isAuthorized) {
        CrudService.setAuthHeader(isAuthorized)
    } else {
        /***** Check the current token if valid and get the athentified user ****/
        if (authToken && !user && loading) {
            setLoading(false)
            dispatch(actions.requestUser("Laoding"))
        }
    }
    return (
        <Switch>{
            isAuthorized ? <>
                {/* Write all routes need an authentified user */}
                <Route path="/" component={'auth'} />
                <Redirect from="*" to="/error" />
            </> : <>
                {/* Write all routes for the authentification */}
                <Route path="/" component={'no-auth'} />
                <Redirect from="*" to="/error" />
            </>
        }</Switch>
    )
}