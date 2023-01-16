import * as React from "react"
import {ChakraProvider, Container, theme,} from "@chakra-ui/react"
import {Provider} from "react-redux"
import {store} from "./configuration/store";
import {Navbar} from "./components/navbar";
import AppRoutes from "./routing/appRoutes";
import { CookiesProvider } from "react-cookie";

export const App = () => {


    return (
        <CookiesProvider>
            <Provider store={store}>
                <ChakraProvider theme={theme}>
                    <Navbar/>

                    <Container style={{paddingBottom: 100}} maxW='container.lg'>
                        <AppRoutes/>
                    </Container>
                </ChakraProvider>
            </Provider>
        </CookiesProvider>

    )
}


