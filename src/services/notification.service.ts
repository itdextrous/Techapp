import ApiEndpoints from '@enums/apiEndpoints ';
import { INotificationResponse } from '@interfaces/notifications';
import service from './commonService';

/**
 * getNotificatitons 
 * @param payload 
 * @returns an item of type INotificationResponse
 */

const getNotifications = async (payload: string) => {
        const url = `${ApiEndpoints.NOTIFICATION.GET_TASK_NOTIFICATIONS}${payload}`
        const response = await service.get(url);
        return response as INotificationResponse;

};


const NotificaionsService = {
    getNotifications
};
export default NotificaionsService;
