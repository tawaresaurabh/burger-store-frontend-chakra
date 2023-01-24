import {Navigate} from 'react-router-dom';
import Login from "../login/login";
import Products from "../products/products";
import OrderCart from "../order/orderCart";
import Orders from "../order/orders";
import * as React from "react";
import {OrderDetail} from "../order/orderDetail";
import ProductDetail from "../products/productDetail";
import ProductForm from "../products/productForm";


export const routes = (authenticated : boolean) => [

    {
        path: '/',
        element: !authenticated ? <Login/> : <Navigate to={"/products"}/>,
        children: [
            { path: '/', element: <Login /> },

        ],
    },
    {
        path: '/products/new',
        children: [
            { index: true, element: authenticated ? <ProductForm /> : <Navigate to="/" replace={true}/> },
            // { path: ':id', element: <ProductDetail /> },
            // { path: '/', element: <Products /> },
            // { path: '/cart', element: <OrderCart /> },
            // { path: '/orders', element: <Orders /> },
            // { path: '/', element: <Navigate to="/app/sandwiches" /> },
            // {
            //     path: '/',
            //     children: [
            //         { path: '/new', element: <ProductForm /> },
            //     ],
            // },
        ],
    },
    {
        path: '/products',
        children: [
            { index: true, element: authenticated ? <Products /> : <Navigate to="/" replace={true}/> },
            { path: ':id', element: <ProductDetail /> },
            // { path: '/', element: <Products /> },
            // { path: '/cart', element: <OrderCart /> },
            // { path: '/orders', element: <Orders /> },
            // { path: '/', element: <Navigate to="/app/sandwiches" /> },
            // {
            //     path: '/',
            //     children: [
            //         { path: '/new', element: <ProductForm /> },
            //     ],
            // },
        ],
    },
    {
        path: '/cart',
        element: authenticated ? <OrderCart /> : <Navigate to="/" replace={true}/>,
        children: [

        ],
    },
    {
        path: '/orders',
        children: [
            { index: true, element: authenticated ? <Orders /> : <Navigate to="/" replace={true}/> },
            // { path: '/cart', element: <OrderCart /> },
            { path: ':id', element: <OrderDetail /> },
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

