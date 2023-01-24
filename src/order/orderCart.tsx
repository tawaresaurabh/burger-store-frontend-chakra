import React from 'react';
import {useAppDispatch, useAppSelector} from "../configuration/hooks";
import {orderCartActions, placeOrder} from "./orderCartSlice";

import {
    Alert,
    AlertIcon,
    Button,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Heading,
    HStack,
    Image,
    Stack,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    Text,
    useToast,
    VStack
} from "@chakra-ui/react";
import {AiOutlineDelete} from "react-icons/all";
import {useOrderCart} from "./orderCartHook";


const OrderCart = () => {
    const dispatch = useAppDispatch()
    const orderItems = useAppSelector(state => state.orderCartState.orderItems);
    const orderPlaceError = useAppSelector(state => state.orderCartState.error)
    const products = useAppSelector(state => state.productState.products);


    const {itemCount, cartAmount} = useOrderCart();
    const toast = useToast();





    const handlePlaceOrder = async () => {
        const order = {orderItems}
        dispatch(placeOrder(order))
            .then(() => {
            toast({
                title: `Order placed, Please check view orders for progress`,
                position: 'top-right',
                isClosable: true,
                status: 'success',
            })
        })


    }

    return (
        <VStack spacing={5}>

            {orderPlaceError && <Alert status='error' variant='left-accent'>
                <AlertIcon />
                {orderPlaceError}
            </Alert>}

            <Text fontSize='xl'>
                Order Cart
            </Text>

            <Divider orientation='horizontal' borderColor='gray.700'/>
            {orderItems.length > 0
            &&
                <Stack spacing='4'>
                    <StatGroup>
                        <Stat>
                            <StatLabel>Order total</StatLabel>
                            <StatNumber>${cartAmount}</StatNumber>
                        </Stat>

                        <Stat>
                            <StatLabel>Total items</StatLabel>
                            <StatNumber>{itemCount}</StatNumber>
                        </Stat>
                    </StatGroup>

                    <Button colorScheme={"teal"}  onClick={handlePlaceOrder} > Confirm Order</Button>

                    {
                        orderItems.map((orderItem) => {
                            const selectedProduct = products.find(product => product._id === orderItem.productId)
                            return {...selectedProduct, count: orderItem.count}
                        })
                            .map(currentOrderItem => {

                                    return (
                                        <Card
                                            direction={{ base: 'column', sm: 'row' }}
                                            overflow='hidden'
                                            variant='outline'
                                            key={currentOrderItem._id}
                                        >
                                            <Image
                                                objectFit='cover'
                                                maxW={{ base: '100%', sm: '200px' }}
                                                src={currentOrderItem.imageUrl}
                                                alt={currentOrderItem.name}
                                            />

                                            <Stack>
                                                <CardBody>
                                                    <Heading size='md'>{currentOrderItem.name}</Heading>
                                                    <Text py='2'>
                                                        {currentOrderItem.description}
                                                    </Text>
                                                    <Text py='2'>
                                                        Subtotal ${currentOrderItem.price! * currentOrderItem.count}
                                                    </Text>

                                                </CardBody>

                                                <CardFooter>


                                                    <HStack spacing='3'>
                                                        <Button colorScheme={"red"}   onClick={()=>dispatch(orderCartActions.decrementCount(currentOrderItem._id!))} disabled={currentOrderItem.count === 0} > - </Button>
                                                        <Text>{currentOrderItem.count}</Text>
                                                        <Button colorScheme={"green"}   onClick={()=>dispatch(orderCartActions.incrementCount(currentOrderItem._id!))}  > + </Button>

                                                        <Button leftIcon={<AiOutlineDelete size={25}/>} colorScheme='red' variant='solid'  onClick={()=>{
                                                            dispatch(orderCartActions.removeFromCart(currentOrderItem._id!))
                                                            toast({
                                                                title: `${currentOrderItem.name} removed from the cart`,
                                                                position: 'top-right',
                                                                isClosable: true,
                                                                status: 'warning',
                                                            })
                                                        }
                                                        }/>
                                                    </HStack>


                                                </CardFooter>
                                            </Stack>
                                        </Card>
                                    )
                                }
                            )
                    }

                    {
                        orderItems.length > 2 &&
                        <>
                            <StatGroup>
                                <Stat>
                                    <StatLabel>Order total</StatLabel>
                                    <StatNumber>${cartAmount}</StatNumber>
                                </Stat>

                                <Stat>
                                    <StatLabel>Total items</StatLabel>
                                    <StatNumber>{itemCount}</StatNumber>
                                </Stat>
                            </StatGroup>
                            <Button colorScheme={"teal"}  onClick={handlePlaceOrder} > Confirm Order</Button>
                        </>
                    }
                </Stack>
            }

            {
                orderItems.length === 0
                &&
                <Text fontWeight={"light"}>
                  There are no products in the cart, Please add from menu or check orders here!
                </Text>
            }
        </VStack>

    )

}


export default (OrderCart)