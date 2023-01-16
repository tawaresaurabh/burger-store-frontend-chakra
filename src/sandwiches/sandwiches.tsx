import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../configuration/hooks";
import {getAllSandwiches} from "../sandwiches/sandwhichSlice";
import {orderCartActions} from "../order/orderCartSlice";

import {
    Alert,
    AlertIcon,
    Button,
    Card,
    CardBody,
    CardFooter,
    Center,
    Divider,
    HStack,
    Image,
    SimpleGrid,
    Spinner,
    Stack,
    Text,
    useToast,
    VStack
} from "@chakra-ui/react";

const Sandwiches = () => {

    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.loginState.token);
    const sandwiches = useAppSelector(state => state.sandwichState.sandwiches)
    const isLoading = useAppSelector(state => state.sandwichState.loading);
    const sandwichError = useAppSelector(state => state.sandwichState.error);
    const toast = useToast();


    useEffect(() => {
        if (token) {
            dispatch(getAllSandwiches(token))
        }
    }, [dispatch, token])


    return (
        <VStack spacing={5}>

            {isLoading && <Spinner/>}
            {sandwichError && <Alert status='error' variant='left-accent'>
                <AlertIcon />
                {sandwichError}
            </Alert>}

            <Text fontSize='xl'>
               Menu
                <Divider orientation='horizontal' borderColor='gray.700'/>
            </Text>


            <SimpleGrid columns={4} spacingX='20px' spacingY='20px'>
                {
                    sandwiches.map((sandwich) => {
                        return (
                            <Card variant={"outline"} width={"container.xs"} key={sandwich._id}>
                                <CardBody>
                                    <Center>
                                        <Image
                                            src={sandwich.imageUrl}
                                            alt={sandwich.name}
                                            borderRadius='lg'
                                        />
                                    </Center>
                                    <Stack mt='6' spacing='3'>
                                        {/*<Heading size='md'>{sandwich.name}</Heading>*/}
                                        <Text fontWeight={"medium"}>
                                            {sandwich.name}
                                        </Text>
                                        <Text fontWeight={"hairline"} wordBreak={"break-word"} maxW={"22ch"}>
                                            {sandwich.description}
                                        </Text>
                                    </Stack>

                                </CardBody>
                                <Divider/>
                                <CardFooter>
                                    <HStack spacing={5} align={"center"}>
                                        <Text colorScheme={"blackAlpha"} fontSize='2xl'>{`$${sandwich.price}`}</Text>
                                        <Center height='50px'>
                                            <Divider orientation='vertical' borderColor='gray.400'/>
                                        </Center>
                                        <Button variant='solid' colorScheme='blue' onClick={() => {
                                            dispatch(orderCartActions.addToCart(sandwich._id));
                                            toast({
                                                title: `${sandwich.name} added to the cart`,
                                                position: 'top-right',
                                                isClosable: true,
                                                status: 'success',
                                            })

                                        }

                                        }>
                                            Add to cart
                                        </Button>


                                    </HStack>


                                </CardFooter>
                            </Card>

                        )
                    })
                }

            </SimpleGrid>
        </VStack>

    )


}


export default (Sandwiches)