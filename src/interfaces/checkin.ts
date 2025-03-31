import { ICommonInitials } from "./login";

interface ICommonResponse {
    isSuccess: boolean;
    message: IMessage;
}

export interface ICheckInListResponse extends ICommonResponse{
    data: ICheckList | null;
}

interface IMessage {
    userMessage: string;
    exception: any;
}

export interface ICheckList {
    userId: number,
    firstName: string,
    lastName: string,
    checkInDate: string | null,
    checkOutDate: string | null
}

export interface IInitialState extends ICommonInitials{
    checkinData:ICheckInListResponse| null,
    checkinStatus:ICheckinStaus | null,
    status:string,
    checkin:any|null,
    isLoad:boolean
}

export interface ICheckinStaus extends ICommonResponse{
    data: ICheckinStatusResponse | null;

}

export interface ICheckinStatusResponse {
    checkInDate: string,
    checkInLocation: string,
    checkInLocationLat: string,
    checkInLocationLong: string
}

export enum Status {
    Checkin = 'checkin',
    Checkout = 'checkout'
}
export interface ICheckin{
    userId: number,
    date: string,
    location: string | null,
    lat: string,
    long: string,
    action: Status
}

export interface ICheckinList extends ICommonResponse{
    data: boolean,
}