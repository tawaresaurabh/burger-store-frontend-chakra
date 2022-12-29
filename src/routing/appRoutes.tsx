import {useRoutes} from 'react-router-dom';
import * as React from "react";
import {useAppSelector} from "../configuration/hooks";
import {routes} from "./routes";


const AppRoutes = () => {
    const token = useAppSelector((state) => state.loginState.token);
    const routing = useRoutes(routes(token));
    return(
        <>
            {routing}
        </>
    )
}

export default AppRoutes;