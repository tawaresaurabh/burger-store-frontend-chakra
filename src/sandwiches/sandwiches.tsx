import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../configuration/hooks";
import {getAllSandwiches} from "../sandwiches/sandwhichSlice";
import {orderCartActions} from "../order/orderCartSlice";

import {Button, Card, CardBody, CardFooter, Center, Divider, Heading, Image, SimpleGrid, Spinner, Stack, Text} from "@chakra-ui/react";

const Sandwiches = () => {

    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.loginState.token);
    const sandwiches = useAppSelector(state => state.sandwichState.sandwiches)
    const isLoading = useAppSelector(state => state.sandwichState.loading);


    useEffect(() => {
        if (token) {
            dispatch(getAllSandwiches(token))
        }
    }, [dispatch, token])


    return (
        <>
            {isLoading && <Spinner/>}
            <SimpleGrid columns={4} spacingX='20px' spacingY='20px'>
                {
                    sandwiches.map((sandwich, index) => {
                        return (
                            <Card variant={"outline"} width={"container.xs"} key={sandwich._id}>
                                <CardBody>
                                    <Center>
                                        <Image
                                            src={sandwich.imageUrl}
                                            alt='Green double couch with wooden legs'
                                            borderRadius='lg'
                                        />
                                    </Center>
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md'>{sandwich.name}</Heading>
                                        <Text wordBreak={"break-word"} maxW={"22ch"}>
                                            {sandwich.description}
                                        </Text>
                                        <Text color='blue.600' fontSize='2xl'>
                                            {`$ ${sandwich.price}`}
                                        </Text>
                                    </Stack>
                                </CardBody>
                                <Divider/>
                                <CardFooter>
                                    <Center>
                                        <Button variant='solid' colorScheme='blue' onClick={() => dispatch(orderCartActions.addToCart(sandwich._id))}>
                                            Add to cart
                                        </Button>
                                    </Center>

                                </CardFooter>
                            </Card>

                        )
                    })
                }

            </SimpleGrid>
        </>

    )


}


export default (Sandwiches)