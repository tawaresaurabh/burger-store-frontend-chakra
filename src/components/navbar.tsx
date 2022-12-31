import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    HStack,
    IconButton,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react'
import * as React from 'react'
import {FiMenu} from 'react-icons/fi'
import {AiOutlineHome, AiOutlineLogout, AiOutlineOrderedList, AiOutlineShoppingCart} from "react-icons/all";
import {useItemCount} from "../order/orderHooks";
import {useAppDispatch} from "../configuration/hooks";
import {logout} from "../login/loginSlice";
import {useNavigate} from "react-router-dom";
import {useLogin} from "../login/loginHooks";

type NavLinkProps = { text: string };

const NavLink = ({ text }: NavLinkProps) => (
    <Link>
        <Text fontSize="xl">{text}</Text>
    </Link>
);

export const Navbar = () => {
    const itemCount = useItemCount()
    const {isOpen, onOpen, onClose} = useDisclosure();
    const isDesktop = useBreakpointValue({base: false, lg: true})
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = useLogin();

    return (
        // sx={{ position: '-webkit-sticky', /* Safari */ position: 'sticky', top: '0', }}
        <Box as="section" pb={{base: '6', md: '12'}} >
            <Box as="nav" bg="gray.200" boxShadow={useColorModeValue('sm', 'sm-dark')}>
                <Container py={{base: '4', lg: '5'}}>
                    <HStack spacing="10">
                        {/*<AiOutlineShop size={25} color={'red'}/>*/}
                        {isDesktop ? (
                            token && <>
                                <Flex justify="flex-start" flex="1">
                                    <ButtonGroup variant="link" spacing="8">

                                        <Button leftIcon={<AiOutlineHome size={20}/>} colorScheme='teal' variant='solid' borderRadius={"full"}
                                                onClick={() => navigate("/")}>
                                            Home

                                        </Button>

                                        <Button leftIcon={<AiOutlineOrderedList size={20}/>} colorScheme='teal' variant='solid' borderRadius={"full"}
                                                onClick={() => navigate("/orders")}>
                                            Orders

                                        </Button>

                                    </ButtonGroup>
                                </Flex>

                                <HStack align={"end"} spacing={2}>


                                    <Button leftIcon={<AiOutlineShoppingCart size={20}/>} colorScheme='teal' variant='solid' borderRadius={"full"}
                                            onClick={event => navigate("/cart")}>
                                        {itemCount} items
                                    </Button>

                                    <Button onClick={onOpen} leftIcon={<AiOutlineLogout size={20}/>} colorScheme='red' variant='solid'>
                                        Logout
                                    </Button>
                                </HStack>


                                <Modal
                                    isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay/>
                                    <ModalContent>
                                        <ModalHeader>Logging Out</ModalHeader>
                                        <ModalCloseButton/>
                                        <ModalBody>
                                            Are you sure you want to log out?
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button variant='ghost' onClick={onClose}>Close</Button>
                                            <Button colorScheme='red' mr={3} onClick={() => {
                                                onClose();
                                                dispatch(logout());
                                                navigate("/", {replace: true})
                                            }}>
                                                Logout
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>

                            </>
                        ) : (
                            <IconButton
                                variant="ghost"
                                icon={<FiMenu fontSize="1.25rem"/>}
                                aria-label="Open Menu"
                            />
                        )}
                    </HStack>

                </Container>
            </Box>
        </Box>
    )
}