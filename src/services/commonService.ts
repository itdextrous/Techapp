import axios from "@interceptors/axiosInstance";
import { AxiosResponse } from "axios";


const post = async (payload:any, url:string) => {
    const response = await axios<AxiosResponse>({
        method: 'POST',
        url: url,
        data:payload
    });
    return response.data;

};
const get = async ( url:string) => {
    const response = await axios<AxiosResponse>({
        method: 'GET',
        url: url,
    });
    return response.data;

};

const service = {post, get}
export default service; 