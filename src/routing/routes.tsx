import {Navigate} from 'react-router-dom';
import Login from "../login/login";
import Sandwiches from "../sandwiches/sandwiches";
import OrderCart from "../order/orderCart";
import Orders from "../order/orders";
import * as React from "react";


export const routes = (token : string) => [

    {
        path: '/',
        element: !token ? <Login/> : <Navigate to={"/sandwiches"}/>,
        children: [
            { path: '/', element: <Login /> },

        ],
    },
    {
        path: '/sandwiches',
        element: token ? <Sandwiches /> : <Navigate to="/" replace={true}/>,
        children: [
            { path: '/sandwiches', element: <Sandwiches /> },
            // { path: '/cart', element: <OrderCart /> },
            // { path: '/orders', element: <Orders /> },
            // { path: '/', element: <Navigate to="/app/sandwiches" /> },
            // {
            //     path: 'member',
            //     element: <Outlet />,
            //     children: [
            //         { path: '/', element: <MemberGrid /> },
            //         { path: '/add', element: <AddMember /> },
            //     ],
            // },
        ],
    },
    {
        path: '/cart',
        element: token ? <OrderCart /> : <Navigate to="/" replace={true}/>,
        children: [

            { path: '/cart', element: <OrderCart /> },
            // { path: '/orders', element: <Orders /> },
            // { path: '/', element: <Navigate to="/app/sandwiches" /> },
            // {
            //     path: 'member',
            //     element: <Outlet />,
            //     children: [
            //         { path: '/', element: <MemberGrid /> },
            //         { path: '/add', element: <AddMember /> },
            //     ],
            // },
        ],
    },
    {
        path: '/orders',
        element: token ? <Orders /> : <Navigate to="/" replace={true}/>,
        children: [
            // { path: '/', element: <Sandwiches /> },
            // { path: '/cart', element: <OrderCart /> },
            { path: '/orders', element: <Orders /> },
            // { path: '/', element: <Navigate to="/app/sandwiches" /> },
            // {
            //     path: 'member',
            //     element: <Outlet />,
            //     children: [
            //         { path: '/', element: <MemberGrid /> },
            //         { path: '/add', element: <AddMember /> },
            //     ],
            // },
        ],
    },

];

