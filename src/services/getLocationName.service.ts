import axios from 'axios';
import { API_KEY, GOOGLE_MAP_URL } from '@env';
import { GeocodingResponse } from '@interfaces/location';

/**
 * currentLocation 
 * @param payload 
 * @returns an item of type GeocodingResponse
 */

const currentLocation = async (payload: {latitude:number,longitude:number}) => {
           let url = `${GOOGLE_MAP_URL}latlng=${payload.latitude},${payload.longitude}&key=${API_KEY}`
            const response = await axios.get(url);
        return response.data as GeocodingResponse;

};

const LocationService = {
    currentLocation,
};
export default LocationService;
