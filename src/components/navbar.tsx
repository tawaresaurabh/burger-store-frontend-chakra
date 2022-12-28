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
import {AiOutlineLogout, AiOutlineShoppingCart} from "react-icons/all";
import {useItemCount} from "../order/orderHooks";
import {useAppDispatch, useAppSelector} from "../configuration/hooks";
import {logout} from "../login/loginSlice";
import {useNavigate} from "react-router-dom";

type NavLinkProps = { text: string };

const NavLink = ({ text }: NavLinkProps) => (
    <Link>
        <Text fontSize="xl">{text}</Text>
    </Link>
);

export const Navbar = () => {
    const itemCount = useItemCount()
    const user = useAppSelector(state => state.loginState.user)
    const token = useAppSelector(state => state.loginState.token)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <Box as="section" pb={{ base: '12', md: '24' }}>
            <Box as="nav" bg="gray.100" boxShadow={useColorModeValue('sm', 'sm-dark')}>
                <Container py={{ base: '4', lg: '5' }}>
                    <HStack spacing="10" >
                        {/*<Logo />*/}
                        {isDesktop ? (
                            <>
                            <Flex justify="flex-start" flex="1">
                                <ButtonGroup variant="link" spacing="8">



                                </ButtonGroup>
                            </Flex>

                                <HStack align={"end"} spacing={2}>



                                <Button leftIcon={<AiOutlineShoppingCart size={25}/>} colorScheme='teal' variant='solid' borderRadius={"full"} onClick={event => navigate("/cart")}>
                                    {itemCount} items
                                </Button>

                                    <Button  onClick={onOpen} leftIcon={<AiOutlineLogout size={25}/>} colorScheme='red' variant='solid'>
                                       Logout
                                    </Button>
                                </HStack>


                                <Modal
                                    isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Logging Out</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            Are you sure you want to log out?
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button variant='ghost' onClick={onClose}>Close</Button>
                                            <Button colorScheme='red' mr={3} onClick={() => {
                                                onClose();
                                                dispatch(logout());
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
                                icon={<FiMenu fontSize="1.25rem" />}
                                aria-label="Open Menu"
                            />
                        )}
                    </HStack>

                </Container>
            </Box>
        </Box>
    )
}