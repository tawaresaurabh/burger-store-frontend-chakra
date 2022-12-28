import React from 'react';
import {useAppDispatch, useAppSelector} from "../configuration/hooks";
import {orderCartActions, placeOrder} from "./orderCartSlice";
import {useGetSandwiches, useGetSandwichIdCountMap, useItemCount, useOrderTotal} from "./orderHooks";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CloseButton,
    Container,
    Heading,
    HStack,
    Image,
    Stack,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    Text
} from "@chakra-ui/react";


const OrderCart = () => {
    const dispatch = useAppDispatch()
    const sandwichIdCountMap = useGetSandwichIdCountMap();

    const token = useAppSelector(state => state.loginState.token);
    const userId = useAppSelector(state => state.loginState.user._id);
    const sandwiches = useGetSandwiches();

    const itemCount = useItemCount();
    const orderTotal = useOrderTotal();


    function handlePlaceOrder() {
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
    }

    return (

        <Container>
            <Stack spacing='4'>
                <StatGroup>
                    <Stat>
                        <StatLabel>Order total</StatLabel>
                        <StatNumber>$ {orderTotal}</StatNumber>
                    </Stat>

                    <Stat>
                        <StatLabel>Total items</StatLabel>
                        <StatNumber>{itemCount}</StatNumber>
                    </Stat>
                </StatGroup>

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
                                    alt='Caffe Latte'
                                />

                                <Stack>
                                    <CardBody>
                                        <HStack spacing={2}>
                                            <Heading size='md'>{selectedSandwichCount.name}</Heading>
                                            <CloseButton bg={'red.500'} onClick={()=>dispatch(orderCartActions.removeFromCart(selectedSandwichCount._id!))}/>
                                        </HStack>


                                        <Text py='2'>
                                            {selectedSandwichCount.description}
                                        </Text>

                                    </CardBody>

                                    <CardFooter>


                                        <HStack spacing='3'>
                                            <Button colorScheme={"red"}   onClick={()=>dispatch(orderCartActions.decrementCount(selectedSandwichCount._id!))} disabled={selectedSandwichCount.count === 0} > - </Button>
                                            <Text>{selectedSandwichCount.count}</Text>
                                            <Button colorScheme={"green"}   onClick={()=>dispatch(orderCartActions.incrementCount(selectedSandwichCount._id!))}  > + </Button>
                                        </HStack>


                                    </CardFooter>
                                </Stack>
                            </Card>
                                )
                            }
                        )
                }







                <Button colorScheme={"teal"}  disabled={itemCount === 0} onClick={handlePlaceOrder} > Confirm Order</Button>


            </Stack>





        </Container>

    )

}


export default (OrderCart)