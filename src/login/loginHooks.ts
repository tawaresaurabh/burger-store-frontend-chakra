import {useAppSelector} from "../configuration/hooks";


export const useAuth = () => {
    return useAppSelector(state => state.loginState.authenticated);
}

export const useAdmin = () => {
    const role = useAppSelector(state => state.loginState.user.role);
    return role === 'ADMIN';

}

