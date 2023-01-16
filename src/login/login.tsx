import React from 'react';

import {useAppDispatch, useAppSelector} from "../configuration/hooks";
import {Form, Formik} from "formik";
import {loginFormSchema} from "./loginFormSchema";

import {doLogin} from "./loginSlice";
import {LoginRequestObject} from "./loginInterfaces";
import {useNavigate} from 'react-router-dom';
import {Alert, AlertIcon, Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Image, Input, Spinner, StackDivider, VStack} from "@chakra-ui/react";


const Login = () => {


    const dispatch = useAppDispatch()
    const loginError = useAppSelector(state => state.loginState.error);
    const isLoading = useAppSelector(state => state.loginState.loading);
    const navigate = useNavigate();


    const handleSubmit = async (values: LoginRequestObject) => {
        dispatch(doLogin(values))
            .then(() => navigate("/sandwiches", {replace: true}));
    }


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
                                username: '',
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
                                    <FormControl isInvalid={!!errors.username && touched.username}>
                                        <FormLabel>Username</FormLabel>
                                        <Input type='text' placeholder='Username' name='username' value={values.username} onChange={handleChange}/>
                                        <FormErrorMessage>{errors.username}</FormErrorMessage>
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



export default (Login)