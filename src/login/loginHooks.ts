import {useAppSelector} from "../configuration/hooks";

export const useLogin = () => {
    return useAppSelector(state => state.loginState.token);
}
