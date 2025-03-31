import { ICommonInitials } from "./login"


export interface INotificationResponse { 
    isSuccess: boolean,
    message: {
      userMessage: string,
      exception: any
    },
    data: INotificationData | null
}

export interface INotificationData {
    data:{
        item1:number,
        item2:[INotifications],
        item3:boolean
    }
}

export interface INotifications{
    taskLogId:number,
    taskId:number,
    projectId:number,
    taskTitle:string,
    taskCode:string,
    statusId:number,
    statusName:string,
    statusColour:string,
    logMessage:string,
    userId:number,
    logDateTime:string,
    name:string,
    email:string,
    companyId:number,
    isOnline:boolean,
    profileImageUrl:string,
    isDeleted:boolean
}

export interface initialStates extends ICommonInitials{
    notificationData:null | INotificationData
}