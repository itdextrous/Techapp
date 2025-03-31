import { ICommonInitials } from "./login"

export interface ForgotResponse{
    isSuccess:boolean,
    message:{
        userMessage:string,
        exception:string | null
    },
    data:any[]|null
}

export interface ISendEmail{
    emailId:string,
    type:number
}
export interface IInitialState extends ICommonInitials{
    forgotResponse?:ForgotResponse| null | undefined,
    emailResponse?:ForgotResponse| null | undefined,
}
