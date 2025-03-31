import { IGoogleLogin, ILogin, LoginResponse } from "@interfaces/login";
import ApiEndpoints from '@enums/apiEndpoints ';
import service from './commonService';

/**
 * login 
 * @param payload value of logged in user email and password
 * @returns an item of type LoginResponse
 */

const login = async (payload: ILogin) => {
    const url = `${ApiEndpoints.AUTH.LOGIN}`
    const response = await service.post(payload, url)
    return response as LoginResponse
}

/**
 * googleLogin 
 * @param payload value of logged in with google
 * @returns an item of type LoginResponse
 */

const googleLogin = async (payload: IGoogleLogin) => {
    const url = `${ApiEndpoints.AUTH.GOOGLE_LOGIN}`
    const response = await service.post(payload, url);
    return response as LoginResponse;

};
const LoginService = {
    login,
    googleLogin
};
export default LoginService;
