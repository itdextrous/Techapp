import { AxiosResponse } from 'axios';
import axios from '@interceptors/axiosInstance';
import ApiEndpoints from '@enums/apiEndpoints ';
import { IAssetListResponse } from '@interfaces/assets';
import service from './commonService';

/**
 * assetsList 
 * @param payload 
 * @returns an item of type IAssetListResponse
 */

const assetsList = async (payload: string) => {
    const url = `${ApiEndpoints.ASSETS.GET_ASSETSLIST}${payload}`
        const response = await service.get(url);
        return response as IAssetListResponse;

};

/**
 * assetsDetail 
 * @param payload 
 * @returns an item of type IAssetListResponse
 */

const assetsDetail = async (payload: string) => {
    const url = `${ApiEndpoints.ASSETS.GET_ASSETDetails}${payload}`
        const response = await service.get(url)
        return response as IAssetListResponse;
};

const AssetsService = {
    assetsList,
    assetsDetail
};

export default AssetsService;
