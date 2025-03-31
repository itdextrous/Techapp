
export interface ICommon{
    email:string | null
}
export interface ILogin extends ICommon {
    password: string
}

export interface ILoginData  extends ICommon{
    token: string|null,
    isCompany?: boolean,
    isEmailLogin?: boolean,
    refreshToken?: string,
    profileImage?: null | string,
    companyLogo?: null | string,
    companyList?: null | string,
    multiFactorAuthentication?: boolean,
    authenticationType?: null | string,
    authenticationSecret?: null | string,
    nextAuthenticatedDateTime?: string | Date
}

export interface LoginResponse {
    isSuccess:  boolean,
    message: {
        userMessage: string,
        exception: any
    },
    data: ILoginData|null
}
export interface IGoogleLogin extends ICommon {
    isVerified:true,
    givenName:string | null,
    familyName:string | null,
    displayName:string | null,
}

export interface IGoogleResposne extends ICommon{
    id: string; 
    name: string | null; 
    photo: string | null; 
    familyName: string | null; 
    givenName: string | null;
}
export interface ICommonInitials{
    isLoading:boolean,
    isSuccess:boolean,
    isError:boolean,
}
export interface IInitialState extends ICommonInitials{
    userData:LoginResponse | null | undefined,
}