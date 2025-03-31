import ApiEndpoints from '@enums/apiEndpoints ';
import { IFavProjectListResponse, IFavProjectResponse, IProjectList, IProjectListResponse, IProjectRequest } from '@interfaces/projectList';
import service from './commonService';

/**
 * projectList 
 * @param payload 
 * @returns an item of type IProjectListResponse
 */

const projectList = async (payload: IProjectList) => {
    const url = `${ApiEndpoints.PROJECTLIST.GET_PROJECT_LIST}`
        const response = await service.post(payload ,url);
        return response as IProjectListResponse;

};

/**
 * favProjectList 
 * @param payload 
 * @returns an item of type IFavProjectListResponse
 */


const favProjectList = async (payload: string) => {
    const url = `${ApiEndpoints.PROJECTLIST.GET_FAV_PROJECT_LIST}${payload}`
        const response = await service.get(url);
        return response as IFavProjectListResponse;

};

/**
 * favProject 
 * @param payload 
 * @returns an item of type IFavProjectResponse
 */

const favProject = async (payload: IProjectRequest) => {
    const url = `${ApiEndpoints.PROJECTLIST.FAV_PROJECT}`
        const response = await service.post(payload,url);
        return response as IFavProjectResponse;

};

const ProjectListService = {
    projectList,
    favProjectList,
    favProject
};
export default ProjectListService;
