import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../configuration/hooks";
import {getAllProducts} from "./productSlice";
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
    Menu, MenuButton, MenuDivider, MenuItem, MenuList,
    SimpleGrid,
    Spinner,
    Stack,
    Text,
    useToast,
    VStack
} from "@chakra-ui/react";
import {useAdmin} from "../login/loginHooks";
import {FaChevronDown} from "react-icons/all";

const Products = () => {

    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.productState.products)
    const isLoading = useAppSelector(state => state.productState.loading);
    const productError = useAppSelector(state => state.productState.error);
    const toast = useToast();
    const isAdmin = useAdmin();


    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])


    return (
        <VStack spacing={5}>

            {isLoading && <Spinner/>}
            {productError && <Alert status='error' variant='left-accent'>
                <AlertIcon />
                {productError}
            </Alert>}

            <Text fontSize='xl'>
               Menu
            </Text>
            <Divider orientation='horizontal' borderColor='gray.700'/>


            <SimpleGrid columns={4} spacingX='20px' spacingY='20px'>
                {
                    products.map((product) => {
                        return (
                            <Card variant={"outline"} width={"container.xs"} key={product._id}>
                                <CardBody>
                                    <Center>
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.name}
                                            borderRadius='lg'
                                        />
                                    </Center>
                                    <Stack mt='6' spacing='3'>
                                        {/*<Heading size='md'>{product.name}</Heading>*/}
                                        <Text fontWeight={"medium"}>
                                            {product.name}
                                        </Text>
                                        <Text fontWeight={"hairline"} wordBreak={"break-word"} maxW={"22ch"}>
                                            {product.description}
                                        </Text>
                                    </Stack>

                                </CardBody>
                                <Divider/>
                                <CardFooter>
                                    <HStack spacing={5} align={"center"}>
                                        <Text colorScheme={"blackAlpha"} fontSize='2xl'>{`$${product.price}`}</Text>
                                        <Center height='50px'>
                                            <Divider orientation='vertical' borderColor='gray.400'/>
                                        </Center>

                                        {
                                            !isAdmin  &&

                                            <Button variant='solid' colorScheme='blue' onClick={() => {
                                                dispatch(orderCartActions.addToCart(product._id));
                                                toast({
                                                    title: `${product.name} added to the cart`,
                                                    position: 'top-right',
                                                    isClosable: true,
                                                    status: 'success',
                                                })

                                            }

                                            }>
                                                Add to cart
                                            </Button>
                                        }

                                        {
                                            isAdmin  &&

                                            <Menu>
                                                {({ isOpen }) => (
                                                    <>
                                                        <MenuButton isActive={isOpen} as={Button} rightIcon={<FaChevronDown />}>
                                                            {isOpen ? 'Close' : 'Actions'}
                                                        </MenuButton>
                                                        <MenuList>
                                                            <MenuItem>Edit</MenuItem>
                                                            <MenuDivider />
                                                            <MenuItem>Delete</MenuItem>
                                                        </MenuList>
                                                    </>
                                                )}
                                            </Menu>
                                        }





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


export default (Products)