
import {hideLogoutModal, logout} from "../login/loginSlice";
import {useAppDispatch, useAppSelector} from "../configuration/hooks";
import {Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from "@chakra-ui/react";


export const LogoutModal = () => {
    const logoutModal = useAppSelector(state => state.loginState.logoutModal)
    const dispatch = useAppDispatch();

    return (
        <Modal
            isOpen={logoutModal} onClose={() => dispatch(hideLogoutModal())}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Logging Out</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to log out?
                </ModalBody>
                <ModalFooter>
                    <Button variant='ghost' onClick={() => dispatch(hideLogoutModal())}>Close</Button>
                    <Button colorScheme='blue' mr={3} onClick={() => dispatch(logout())}>
                        Logout
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}