import React from 'react';
import {useAppDispatch, useAppSelector} from "../configuration/hooks";
import {orderCartActions, placeOrder} from "./orderCartSlice";
import {useGetSandwiches, useGetSandwichIdCountMap, useItemCount, useOrderCartTotal} from "./orderHooks";
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


const OrderCart = () => {
    const dispatch = useAppDispatch()
    const sandwichIdCountMap = useGetSandwichIdCountMap();

    const token = useAppSelector(state => state.loginState.token);
    const userId = useAppSelector(state => state.loginState.user._id);
    const orderPlaceError = useAppSelector(state => state.orderCartState.error)
    const sandwiches = useGetSandwiches();

    const itemCount = useItemCount();
    const orderTotal = useOrderCartTotal();
    const toast = useToast();





    const handlePlaceOrder = async () => {
        let orderIds: string[] = [];
        sandwichIdCountMap.forEach(sandwichIdCount => {
            for (let i = 0; i < sandwichIdCount.count; i++) {
                orderIds.push(sandwichIdCount.sandwichId)
            }
        })
        const orderRequest = {
            userId,
            status: 'ordered',
            sandwichIds: [...orderIds],
            token
        }
        dispatch(placeOrder(orderRequest))
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
                <Divider orientation='horizontal'/>
            </Text>

            {sandwichIdCountMap.length > 0
            &&
                <Stack spacing='4'>
                    <StatGroup>
                        <Stat>
                            <StatLabel>Order total</StatLabel>
                            <StatNumber>${orderTotal}</StatNumber>
                        </Stat>

                        <Stat>
                            <StatLabel>Total items</StatLabel>
                            <StatNumber>{itemCount}</StatNumber>
                        </Stat>
                    </StatGroup>

                    <Button colorScheme={"teal"}  onClick={handlePlaceOrder} > Confirm Order</Button>

                    {
                        sandwichIdCountMap.map((sandwichIdCount) => {
                            const selectedSandwich = sandwiches.find(sandwich => sandwich._id === sandwichIdCount.sandwichId)
                            return {...selectedSandwich, count: sandwichIdCount.count}
                        })
                            .map(selectedSandwichCount => {

                                    return (
                                        <Card
                                            direction={{ base: 'column', sm: 'row' }}
                                            overflow='hidden'
                                            variant='outline'
                                            key={selectedSandwichCount._id}
                                        >
                                            <Image
                                                objectFit='cover'
                                                maxW={{ base: '100%', sm: '200px' }}
                                                src={selectedSandwichCount.imageUrl}
                                                alt={selectedSandwichCount.name}
                                            />

                                            <Stack>
                                                <CardBody>
                                                    <Heading size='md'>{selectedSandwichCount.name}</Heading>
                                                    <Text py='2'>
                                                        {selectedSandwichCount.description}
                                                    </Text>
                                                    <Text py='2'>
                                                        Subtotal ${selectedSandwichCount.price! * selectedSandwichCount.count}
                                                    </Text>

                                                </CardBody>

                                                <CardFooter>


                                                    <HStack spacing='3'>
                                                        <Button colorScheme={"red"}   onClick={()=>dispatch(orderCartActions.decrementCount(selectedSandwichCount._id!))} disabled={selectedSandwichCount.count === 0} > - </Button>
                                                        <Text>{selectedSandwichCount.count}</Text>
                                                        <Button colorScheme={"green"}   onClick={()=>dispatch(orderCartActions.incrementCount(selectedSandwichCount._id!))}  > + </Button>

                                                        <Button leftIcon={<AiOutlineDelete size={25}/>} colorScheme='red' variant='solid'  onClick={()=>{
                                                            dispatch(orderCartActions.removeFromCart(selectedSandwichCount._id!))
                                                            toast({
                                                                title: `${selectedSandwichCount.name} removed from the cart`,
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
                        sandwichIdCountMap.length > 2 &&
                        <>
                            <StatGroup>
                                <Stat>
                                    <StatLabel>Order total</StatLabel>
                                    <StatNumber>${orderTotal}</StatNumber>
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
                sandwichIdCountMap.length === 0
                &&
                <Text fontWeight={"light"}>
                  There are no products in the cart, Please add from menu :)
                </Text>
            }
        </VStack>

    )

}


export default (OrderCart)