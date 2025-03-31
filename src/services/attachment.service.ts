import ApiEndpoints from '@enums/apiEndpoints ';
import { IAttachmentResponse } from '@interfaces/attachment';
import { BASE_URL } from '@env';
import service from './commonService';

/**
 * attachment 
 * @param payload 
 * @returns an item of type IAttachmentResponse
 */

const attachment = async (payload: string) => {
    const url = `${ApiEndpoints.ATTACHMENTS.GET_ATTACHMENTS}${payload}`
    const response = await service.get(url);
    return response as IAttachmentResponse;

};

/**
 * getAttachment 
 * @param payload 
 * @returns an item of type IAttachmentResponse
 */


const getAttachment = async (payload: string) => {
    const url = `${ApiEndpoints.ATTACHMENTS.GET_ATTACHMENTS_LIST}${payload}`
    const response = await service.get(url);
    return response as any;
};

/**
 * deleteAttachment 
 * @param payload 
 * @returns an item of type IAttachmentResponse
 */


const deleteAttachment = async (payload: any) => {
    const url = `${ApiEndpoints.ATTACHMENTS.DELETE_ATTACHMENT}`
    const response = await service.post(payload,url);
    return response as any;
};

/**
 * uploadAttachment 
 * @param userProfileForm value for update profile
 * @returns an item of type IProfileImageResponse
 */
const uploadAttachment = async (userProfileForm: any, token: string | null | undefined) => {
    // append headers
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("applicationId", `trakk-app-14100`);
    myHeaders.append("publicKey", `j0rOv+RmD5tXBjGpaknLMGdCHsJFLvdGOnvu3W/04+I=`);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: userProfileForm,
    };
    const response = await fetch(`${BASE_URL}${ApiEndpoints.ATTACHMENTS.UPLOAD_ATTACHMENTS}`, requestOptions);
    const result = await response.json();
    return result as any;
};

const AttachmentService = {
    attachment, uploadAttachment, getAttachment,deleteAttachment
};

export default AttachmentService;
