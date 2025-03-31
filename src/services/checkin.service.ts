import ApiEndpoints from '@enums/apiEndpoints ';
import { ICheckInListResponse, ICheckin, ICheckinList, ICheckinStaus } from '@interfaces/checkin';
import service from './commonService';

/**
 * checkinList 
 * @param payload 
 * @returns an item of type ICheckInListResponse
 */

const checkinList = async (payload: string) => {
    const url = `${ApiEndpoints.CHECKINS.GET_CHECKINLIST}${payload}`
    const response = await service.get(url);
    return response as ICheckInListResponse;

};

/**
 * checkinStatus
 * @param payload 
 * @returns an item of type ICheckinStaus
 */

const checkinStatus = async (payload: string) => {
    const url = `${ApiEndpoints.CHECKINS.GET_CHECKINSTATUS}${payload}`
    const response = await service.get(url);
    return response as ICheckinStaus;

};

/**
 * checkin
 * @param payload 
 * @returns an item of type ICheckinList
 */


const checkin = async (payload: ICheckin) => {
    const url = `${ApiEndpoints.CHECKINS.CHECKIN}`
    const response = await service.post(payload,url);
    return response as ICheckinList;

};

const CheckinService = {
    checkinList,
    checkinStatus,
    checkin
};

export default CheckinService;
