import {useRoutes} from 'react-router-dom';
import * as React from "react";
import {useAppSelector} from "../configuration/hooks";
import {routes} from "./routes";


const AppRoutes = () => {
    const authenticated = useAppSelector((state) => state.loginState.authenticated);
    const routing = useRoutes(routes(authenticated));
    return(
        <>
            {routing}
        </>
    )
}

export default AppRoutes;