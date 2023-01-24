import React, {useEffect} from 'react';
import {Alert, AlertIcon, Button, Divider, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, VStack} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../configuration/hooks";
import {getAllOrders} from "./orderSlice";
import {useNavigate} from "react-router-dom";
import {useAdmin} from "../login/loginHooks";


const Orders = () => {

    const dispatch = useAppDispatch()

    const orders = useAppSelector(state => state.ordersState.orders);
    const isLoading = useAppSelector(state => state.ordersState.loading);
    const ordersError = useAppSelector(state => state.ordersState.error);
    const isAdmin = useAdmin();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllOrders())
    }, [dispatch])


    return (
        <VStack spacing={5}>
            {isLoading && <Spinner/>}
            {ordersError && <Alert status='error' variant='left-accent'>
                <AlertIcon />
                {ordersError}
            </Alert>}

            <Text fontSize='xl'>
                Orders
            </Text>
            <Divider orientation='horizontal' borderColor='gray.700'/>


            {
                !isAdmin &&
                <Table variant='striped'>
                    {/*<TableCaption>Orders</TableCaption>*/}
                    <Thead>
                        <Tr>
                            <Th>Order#</Th>
                            <Th>Date</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.map((order) => {
                            return (
                                <Tr key={order._id}>
                                    <Td><Button variant={"link"} colorScheme={"blue"} onClick={event => navigate(`/orders/${order._id}`)}>{order._id}</Button></Td>
                                    {/*<Td>{order._id}</Td>*/}
                                    <Td>{order.date?.toString()}</Td>
                                    <Td>{order.status}</Td>
                                </Tr>
                            )
                        })
                        }

                    </Tbody>
                </Table>

            }


            {
                isAdmin &&
                <Table variant='striped'>
                    {/*<TableCaption>Orders</TableCaption>*/}
                    <Thead>
                        <Tr>
                            <Th>Order#</Th>
                            <Th>Customer</Th>
                            <Th>Date</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.map((order) => {
                            return (
                                <Tr key={order._id}>
                                    <Td><Button variant={"link"} colorScheme={"blue"} onClick={event => navigate(`/orders/${order._id}`)}>{order._id}</Button></Td>
                                    <Td>{order.userId}</Td>
                                    <Td>{order.date?.toString()}</Td>
                                    <Td>{order.status}</Td>
                                </Tr>
                            )
                        })
                        }

                    </Tbody>
                </Table>

            }





        </VStack>
    )

}


export default (Orders)