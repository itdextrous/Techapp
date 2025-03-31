import { ICommonInitials } from "./login"

export interface IPermissions{
    id:number,
    userId:number,
    companyId:number,
    moduleId:number,
    moduleName:string,
    permissionCode:string,
    permissionName:string,
    isAllowed:boolean
}

export interface PermissionResponse {
    isSuccess:  boolean,
    message: {
        userMessage: string,
        exception: any
    },
    data: IPermissions[]|null
}

export interface IInitialState extends ICommonInitials{
    userPermissions:PermissionResponse | null | undefined,
}