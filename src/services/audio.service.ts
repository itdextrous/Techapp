import ApiEndpoints from '@enums/apiEndpoints ';
import { BASE_URL } from '@env';
import service from './commonService';


/**
 * uploadAttachment 
 * @param params value for update profile
 * @returns an item of type IProfileImageResponse
 */
const uploadAudio = async (params:any, token:string | null|undefined) => {
    // append headers
      const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("applicationId", `trakk-app-14100`);
        myHeaders.append("publicKey", `j0rOv+RmD5tXBjGpaknLMGdCHsJFLvdGOnvu3W/04+I=`);
    
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: params,
        };
        try {
            const response = await fetch(`${BASE_URL}${ApiEndpoints.AUDIO.SAVE_AUDIO}`, requestOptions);
            
            // Check if the response is okay
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            // Parse the JSON response
            const result = await response.json();
            return result as any;
        } catch (error) {
            console.error('Error uploading audio:', error); // Improved error logging
            throw error; // Optional: rethrow the error if you want to handle it elsewhere
        }
    };

    /**
 * getAudio 
 * @param payload 
 * @returns an item of type any
 */

const getAudio = async (payload: string) => {
    const url = `${ApiEndpoints.AUDIO.AUDIO_DATA}${payload}`
    const response = await service.get(url);
    return response as any;

};

const AudioService = {
    uploadAudio,
    getAudio
};

export default AudioService;
