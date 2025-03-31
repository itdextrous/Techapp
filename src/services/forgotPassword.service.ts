import { AxiosResponse } from 'axios';
import { ICommon } from "@interfaces/login";
import axios from '@interceptors/axiosInstance';
import ApiEndpoints from '@enums/apiEndpoints ';
import { ForgotResponse, ISendEmail } from '@interfaces/forgotPassword';
import service from './commonService';

/**
 * forgotPassword 
 * @param payload value of user email
 * @returns an item of type ForgotResponse
 */


const forgotPassword = async (payload: ICommon) => {
    const url = `${ApiEndpoints.AUTH.FORGOT_PASSWORD}`
    const response = await service.post(payload, url);
    return response as ForgotResponse;
};

/**
 * sendEmail 
 * @param payload value of user email and type
 * @returns an item of type ForgotResponse
 */


const sendEmail = async (payload: ISendEmail) => {
    const url = `${ApiEndpoints.AUTH.SEND_EMAIL}`
    const response = await service.post(payload,url);
    return response as ForgotResponse;

};

const ForgotPasswordService = {
    forgotPassword,
    sendEmail
};
export default ForgotPasswordService;
