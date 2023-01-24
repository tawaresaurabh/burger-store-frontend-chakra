import {Divider, Text, VStack} from "@chakra-ui/react";
import React from "react";

const ProductDetail = () => {

    return (
        <VStack spacing={5}>

            <Text fontSize='xl'>
                Product Details
            </Text>
            <Divider orientation='horizontal' borderColor='gray.700'/>

        </VStack>
    )

}


export default (ProductDetail)