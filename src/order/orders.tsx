import React, {useEffect} from 'react';
import {Alert, AlertIcon, Divider, Spinner, Table, TableCaption, Tbody, Td, Text, Tfoot, Th, Thead, Tr, VStack} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../configuration/hooks";
import {getAllOrders} from "./orderSlice";


const Orders = () => {

    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.loginState.token);
    const orders = useAppSelector(state => state.ordersState.orders)
    const isLoading = useAppSelector(state => state.ordersState.loading);
    const ordersError = useAppSelector(state => state.ordersState.error);

    useEffect(() => {
        if (token) {
            dispatch(getAllOrders(token))
        }
    }, [dispatch, token])


    return (
        <VStack spacing={5}>
            {isLoading && <Spinner/>}
            {ordersError && <Alert status='error' variant='left-accent'>
                <AlertIcon />
                {ordersError}
            </Alert>}

            <Text fontSize='xl'>
                Orders
                <Divider orientation='horizontal' borderColor='gray.700'/>
            </Text>



                <Table variant='striped'>
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Customer</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>inches</Td>
                            <Td>millimetres (mm)</Td>
                            <Td isNumeric>25.4</Td>
                        </Tr>
                        <Tr>
                            <Td>feet</Td>
                            <Td>centimetres (cm)</Td>
                            <Td isNumeric>30.48</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Tfoot>
                </Table>

        </VStack>
    )

}


export default (Orders)