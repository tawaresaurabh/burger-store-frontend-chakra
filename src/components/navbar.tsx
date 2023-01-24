import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    HStack,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
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
import {AiFillBook, AiOutlineHome, AiOutlineLogout, AiOutlineOrderedList, AiOutlineShoppingCart} from "react-icons/all";
import {useAppDispatch} from "../configuration/hooks";
import {doLogout, logout} from "../login/loginSlice";
import {useNavigate} from "react-router-dom";
import {useAdmin, useAuth} from "../login/loginHooks";
import {ColorModeSwitcher} from "../ColorModeSwitcher";
import {useOrderCart} from "../order/orderCartHook";

type NavLinkProps = { text: string };

const NavLink = ({ text }: NavLinkProps) => (
    <Link>
        <Text fontSize="xl">{text}</Text>
    </Link>
);

export const Navbar = () => {

    const {itemCount} = useOrderCart();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const isDesktop = useBreakpointValue({base: false, lg: true})
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useAuth();
    const isAdmin = useAdmin();

    return (
        // sx={{ position: '-webkit-sticky', /* Safari */ position: 'sticky', top: '0', }}
        <Box as="section" pb={{base: '6', md: '12'}} >
            <Box as="nav" bg={useColorModeValue('gray.200', 'whiteAlpha.200')} boxShadow={useColorModeValue('gray.500', 'whiteAlpha.500')}>
                <Container py={{base: '4', lg: '5'}}>
                    <HStack spacing="10">
                        {/*<AiOutlineShop size={25} color={'red'}/>*/}
                        {isDesktop ? (
                            isAuthenticated && <>
                                <Flex justify="flex-start" flex="1">
                                    <ButtonGroup variant="link" spacing="8">

                                        <Button leftIcon={<AiOutlineHome size={20}/>} colorScheme='teal' variant='solid' borderRadius={"full"}
                                                onClick={() => navigate("/")}>
                                            Home

                                        </Button>

                                        <Button leftIcon={<AiFillBook size={20}/>} colorScheme='teal' variant='solid' borderRadius={"full"}
                                                onClick={() => navigate("/orders")}>
                                            Orders

                                        </Button>

                                        {
                                            isAdmin
                                            &&
                                            <Button leftIcon={<AiOutlineOrderedList size={20}/>} colorScheme='teal' variant='solid' borderRadius={"full"}
                                                    onClick={() => navigate("/products/new")}>
                                                Add Product
                                            </Button>

                                        }

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

                                    <ColorModeSwitcher/>
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
                                                dispatch(doLogout()).then(value => dispatch(logout()));
                                                onClose();
                                               // navigate("/", {replace: true})
                                            }}>
                                                Logout
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>

                            </>
                        ) : (

                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={<FiMenu />}
                                    variant='outline'
                                />
                                <MenuList>
                                    <MenuItem>
                                        <Button leftIcon={<AiOutlineHome size={20}/>} colorScheme='teal' variant='solid' borderRadius={"full"}
                                                onClick={() => navigate("/")}>
                                            Home

                                        </Button>
                                    </MenuItem>
                                    <MenuItem  >
                                        <Button leftIcon={<AiOutlineOrderedList size={20}/>} colorScheme='teal' variant='solid' borderRadius={"full"}
                                                onClick={() => navigate("/orders")}>
                                            Orders

                                        </Button>

                                    </MenuItem>
                                    <MenuItem>
                                        <Button leftIcon={<AiOutlineShoppingCart size={20}/>} colorScheme='teal' variant='solid' borderRadius={"full"}
                                                onClick={() => navigate("/cart")}>
                                            {itemCount} items
                                        </Button>
                                    </MenuItem>
                                    <MenuItem >
                                        <Button onClick={onOpen} leftIcon={<AiOutlineLogout size={20}/>} colorScheme='red' variant='solid'>
                                            Logout
                                        </Button>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        )}
                    </HStack>

                </Container>
            </Box>
        </Box>
    )
}