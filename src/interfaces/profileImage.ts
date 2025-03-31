import { ICommonInitials } from "@interfaces/login"

export interface IProfileData{
    contentType: null|string,
    serializerSettings: null|string,
    statusCode: null|string|number,
    value: {
        profileImageUrl: string
    }
}
export interface IProfileImageResponse {
    isSuccess:  boolean,
    message: {
        userMessage: string,
        exception: any
    },
    data: IProfileData | null 
}
export interface IProfileInitialData extends ICommonInitials{
    profileData:IProfileImageResponse| null,
}

export interface IprofileParams{
    formData: FormData,
      token : string | null | undefined
}