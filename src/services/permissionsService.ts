import ApiEndpoints from '@enums/apiEndpoints ';
import service from './commonService';
import { PermissionResponse } from '@interfaces/permissions';

/**
 * permission 
 * @returns an item of type PermissionResponse
 */

const permission = async () => {
    const url = `${ApiEndpoints.PERMISSIONS.GET_USER_PERMISSIONS}`
    const response = await service.get(url)
    return response as PermissionResponse
}

const PermissionService = {
    permission,
};
export default PermissionService;
