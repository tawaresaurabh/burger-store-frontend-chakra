import * as React from "react"
import {ChakraProvider, Container, theme,} from "@chakra-ui/react"
import {Provider} from "react-redux"
import {store} from "./configuration/store";
import {Route, Routes} from 'react-router-dom';
import Login from "./login/login";
import Sandwiches from "./sandwiches/sandwiches";
import OrderCart from "./order/orderCart";
import Orders from "./order/orders";
import {Navbar} from "./components/navbar";
import {Home} from "./landing/home";

export const App = () => (
    <Provider store={store}>
        <ChakraProvider theme={theme}>
                <Navbar/>

                <Container style={{paddingBottom: 100}} maxW='container.lg'>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/sandwiches" element={<Sandwiches/>}/>
                        <Route path="/cart" element={<OrderCart/>}/>
                        <Route path="/orders" element={<Orders/>}/>
                    </Routes>
                </Container>
        </ChakraProvider>
    </Provider>

)
