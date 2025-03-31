import { ICommonInitials } from "./login"

export interface INotes{
    channelId: number
    companyId: number
    createdDateTime: string
    emailId: string
    isArchived: boolean
    isDeleted: boolean
    isOnline: boolean
    message: string,
    messageId: number
    profileImageUrl: string
    userId: number
    userName: string,
    isEdited:boolean,
    editedDateTime:null | string,
    audioFilePath:string | null,
    duration:number,
}

export interface INotesResponse{
    isSuccess: boolean;
    message: IMessage;
    data: INotes | null;
}

interface IMessage {
    userMessage: string;
    exception: any;
}

export interface IInitialState extends ICommonInitials{
    notesData:INotesResponse| null,
}

export interface IUpdateNotesResponse{
    isSuccess: boolean;
    message: IMessage;
    data: IUpdateNotes[] | null;
}
export interface IUpdateNotes{
    messageId: number,
    channelId: number,
    userId: number,
    message: string,
    isDeleted: boolean,
    isArchived: boolean,
    createdDateTime: string,
    emailId: string,
    userName: string,
    companyId: number,
    isOnline: boolean,
    profileImageUrl: string
}
export interface IUpdateNoteResponse{
    messageId: number
    message: string,
    time: string,
    userId: number,
    taskId: number | undefined
}

export interface initialStates extends ICommonInitials{
    notesData:null | IUpdateNotesResponse
}