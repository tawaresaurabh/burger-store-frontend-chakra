import * as React from "react"
import {ChakraProvider, Container, theme,} from "@chakra-ui/react"
import {Provider} from "react-redux"
import {store} from "./configuration/store";
import {Navbar} from "./components/navbar";
import AppRoutes from "./routing/appRoutes";

export const App = () => {


    return (
            <Provider store={store}>
                <ChakraProvider theme={theme}>
                    <Navbar/>
                    <Container maxW='container.lg'>
                        <AppRoutes/>
                    </Container>
                </ChakraProvider>
            </Provider>

    )
}


