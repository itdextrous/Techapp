import { AxiosResponse } from 'axios';
import axios from '@interceptors/axiosInstance';
import ApiEndpoints from '@enums/apiEndpoints ';
import { INotesResponse, IUpdateNoteResponse, IUpdateNotesResponse } from '@interfaces/notes';
import service from './commonService';

/**
 * getNotes 
 * @param payload 
 * @returns an item of type INotesResponse
 */


const getNotes = async (payload: string) => {
    const url = `${ApiEndpoints.Notes.GET_Notes}${payload}`
    const response = await service.get(url);
    return response as INotesResponse;

};

/**
 * updateNotes 
 * @param payload 
 * @returns an item of type IUpdateNotesResponse
 */

const updateNotes = async (payload: IUpdateNoteResponse) => {
    const url = `${ApiEndpoints.Notes.UPDATE_Notes}`
    const response = await service.post(payload, url);
    return response as IUpdateNotesResponse;

};

const NotesService = {
    getNotes, updateNotes
};
export default NotesService;
