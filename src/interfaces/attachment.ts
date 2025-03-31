
export interface IAttachmentResponse{
    filedataByte:string
}

export interface IAttachmentData{
    title: string, 
    mimeType: string,
    filedataByte:string,
    uploadedBy:number
    attachmentId:number;
    filePath: string;
    dateUploaded: string;
    documentType: string | null;
}

export interface IInitialState{
    attachmentData:any[] | IAttachmentData,
    deleteList:any,
    isLoad:boolean,
    isSuccess:boolean,
    isError:boolean,
    status:boolean,
    attachmentList:any
}
