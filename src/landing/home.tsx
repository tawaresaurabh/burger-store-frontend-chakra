import {Button, Heading} from "@chakra-ui/react";
import {AiOutlineLogin} from "react-icons/all";
import * as React from "react";
import {useNavigate} from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    return(
        <>
        <Heading> This is home page </Heading>

            <Button leftIcon={<AiOutlineLogin size={25}/>} colorScheme='teal' variant='solid' borderRadius={"full"} onClick={() => navigate("/login")}>
            </Button>

        </>
    )

}