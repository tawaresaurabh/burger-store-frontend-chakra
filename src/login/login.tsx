import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../configuration/hooks";
import {Form, Formik} from "formik";
import {loginFormSchema} from "./loginFormSchema";

import {doLogin, getAuthState} from "./loginSlice";
import {LoginRequestObject} from "./loginInterfaces";
import {Navigate, useNavigate} from 'react-router-dom';
import {Alert, AlertIcon, Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Image, Input, Spinner, StackDivider, VStack} from "@chakra-ui/react";
import {useAuth} from "./loginHooks";


const Login = () => {



    const dispatch = useAppDispatch()
    const loginError = useAppSelector(state => state.loginState.error);
    const isLoading = useAppSelector(state => state.loginState.loading);
    const authenticated = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAuthState())
    }, [dispatch])

    const handleSubmit = async (values: LoginRequestObject) => {
        dispatch(doLogin(values))
            .then(() => navigate("/products", {replace: true}));
    }

    if(authenticated){
       return (<Navigate to="/products"/>)
    }else{

        return (
            <VStack spacing={5} py={20}>
                {isLoading && <Spinner/>}

                {loginError && <Alert status='error' variant='left-accent'>
                    <AlertIcon/>
                    {loginError}
                </Alert>}


                <HStack
                    divider={<StackDivider borderColor='gray.200'/>}
                    spacing={10}
                >
                    <Box height={400} borderColor={'gray.200'}>
                        <Image src='https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&h=400&w=940' alt='Dan Abramov'
                               borderRadius={"lg"}/>
                    </Box>
                    <Box height={400} borderColor='gray.200'>

                        <Formik
                            validationSchema={loginFormSchema}
                            onSubmit={handleSubmit}
                            initialValues={
                                {
                                    email: '',
                                    password: ''
                                }
                            }
                        >
                            {({
                                  handleSubmit,
                                  handleChange,
                                  handleBlur,
                                  values,
                                  touched,
                                  isValid,
                                  errors,
                              }) => (
                                <Form noValidate onSubmit={handleSubmit}>

                                    <VStack spacing={5}>
                                        <FormControl isInvalid={!!errors.email && touched.email}>
                                            <FormLabel>Email</FormLabel>
                                            <Input type='text' placeholder='Email' name='email' value={values.email} onChange={handleChange}/>
                                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                                        </FormControl>

                                        <FormControl isInvalid={!!errors.password && touched.password}>
                                            <FormLabel>Password</FormLabel>
                                            <Input type='password' placeholder='Password' name='password' value={values.password} onChange={handleChange}/>
                                            <FormErrorMessage>{errors.password}</FormErrorMessage>
                                        </FormControl>

                                        <Button variant='solid' colorScheme='blue' type="submit" width={"full"}>Submit</Button>
                                    </VStack>

                                </Form>
                            )}

                        </Formik>
                    </Box>

                </HStack>


            </VStack>

        );


    }




}



export default (Login)