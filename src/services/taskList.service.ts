import { AxiosResponse } from 'axios';
import axios from '@interceptors/axiosInstance';
import ApiEndpoints from '@enums/apiEndpoints ';
import { IStatusListResponse, ITaskListResponse, ITaskPayload, StatusResponse } from '@interfaces/tasks';
import { ISaveRequest, ISaveResponse, ISaveTimeResponse, ITaskEditResponse, IUserTask } from '@interfaces/editTasks';
import service from './commonService';

/**
 * taskList 
 * @param payload 
 * @returns an item of type ITaskListResponse
 */

const taskList = async (payload: ITaskPayload) => {
    const url = `${ApiEndpoints.TASKLIST.GET_TASK_LIST}`
    const response = await service.post(payload, url);
    return response as ITaskListResponse;

};

/**
 * taskById 
 * @param payload 
 * @returns an item of type ITaskListResponse
 */

const taskById = async (payload: IUserTask) => {
    const url = `${ApiEndpoints.TASKLIST.GET_TASK_BY_ID}`
    const response = await service.post(payload,url);
    return response as ITaskEditResponse;
}

/**
 * editTask 
 * @param payload 
 * @returns an item of type ISaveResponse
 */

const editTask = async (payload: ISaveRequest) => {
    const url = `${ApiEndpoints.TASKLIST.EDIT_TASK_LIST}`
    const response = await service.post(payload,url);
    return response as ISaveResponse;
}

/**
 * saveTaskTime 
 * @param payload 
 * @returns an item of type ISaveTimeResponse
 */

const saveTaskTime = async (payload: ISaveRequest) => {
    const url = `${ApiEndpoints.TASKLIST.SAVE_TASK_TIME}`;
    const response = await service.post(payload,url);
    return response as ISaveTimeResponse;
}

/**
 * saveTaskEstimateTime 
 * @param payload 
 * @returns an item of type ISaveTimeResponse
 */

const saveTaskEstimateTime = async (payload: ISaveRequest) => {
    const url = `${ApiEndpoints.TASKLIST.SAVE_ESTIMATE_TIME}`
    const response = await service.post(payload, url);
    return response as ISaveTimeResponse;
}

/**
 * statusPriority 
 * @param payload 
 * @returns an item of type IStatusListResponse
 */

const statusPriority = async (payload: string) => {
    const url = `${ApiEndpoints.TASKLIST.GET_STATUS_PRIORITY}${payload}`
    const response = await service.get(url);
    return response as IStatusListResponse;
}

/**
 * taskSearch 
 * @param payload 
 * @returns an item of type IStatusListResponse
 */

const taskSearch = async (payload: string) => {
    const url = `${ApiEndpoints.TASKLIST.TASK_SEARCH}${payload}`
    const response = await service.get(url);
    return response as any;
}

/**
 * getProjectStatus 
 * @param payload 
 * @returns an item of type StatusResponse
 */

const getProjectStatus = async (payload: string) => {
    const url = `${ApiEndpoints.TASKLIST.PROJECT_STATUS}${payload}`
        const response = await service.get(url);
        return response as StatusResponse;

};

const TaskListService = {
    taskList, taskById, editTask, saveTaskTime, saveTaskEstimateTime, statusPriority,taskSearch,getProjectStatus
};

export default TaskListService;
