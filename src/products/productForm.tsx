import {Button, Divider, FormControl, FormErrorMessage, FormLabel, Input, Text, Textarea, VStack} from "@chakra-ui/react";
import React from "react";
import {Form, Formik} from "formik";
import {productFormSchema} from "./productFormSchema";

const ProductForm = () => {

    const handleSubmit = async (values: any ) => {

        console.log(values)
    }

    return (
        <>
        <VStack spacing={5} mb={5}>

            <Text fontSize='xl'>
                Add product
            </Text>
            <Divider orientation='horizontal' borderColor='gray.700'/>
        </VStack>

            <Formik
                validationSchema={productFormSchema}
                onSubmit={handleSubmit}
                initialValues={
                    {
                        name: '',
                        imageUrl: '',
                        price: 0,
                        description: ''
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
                            <FormControl isInvalid={!!errors.name && touched.name}>
                                <FormLabel>Name</FormLabel>
                                <Input type='text' placeholder='Product name' name='name' value={values.name} onChange={handleChange}/>
                                <FormErrorMessage>{errors.name}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.description && touched.description}>
                                <FormLabel>Description</FormLabel>
                                <Textarea placeholder='Product description' name={'description'} value={values.description } onChange={handleChange} resize={'none'}/>
                                <FormErrorMessage>{errors.description}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.price && touched.price}>
                                <FormLabel>Price</FormLabel>
                                <Input type='number' placeholder='Price' name='price' value={values.price} onChange={handleChange}/>
                                <FormErrorMessage>{errors.price}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.imageUrl && touched.imageUrl}>
                                <FormLabel>Image URL</FormLabel>
                                <Input type='text' placeholder='Image URL' name='imageUrl' value={values.imageUrl} onChange={handleChange}/>
                                <FormErrorMessage>{errors.imageUrl}</FormErrorMessage>
                            </FormControl>

                            <Button variant='solid' colorScheme='blue' type="submit" width={"full"}>Submit</Button>
                        </VStack>

                    </Form>
                )}

            </Formik>

        </>
        )

}


export default (ProductForm)