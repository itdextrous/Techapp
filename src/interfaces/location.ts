import { ICommonInitials } from "./login";

interface PlusCode {
    compound_code: string;
    global_code: string;
}
interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

interface Bounds {
    northeast: {
        lat: number;
        lng: number;
    };
    southwest: {
        lat: number;
        lng: number;
    };
}

interface Geometry {
    bounds?:Bounds
    location: {
        lat: number;
        lng: number;
    };
    location_type: string;
    viewport: {
        northeast: { lat: number; lng: number };
        southwest: { lat: number; lng: number };
    };
}

interface GeocodingResult {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: Geometry;
    place_id: string;
    types: string[];
    plus_code?: PlusCode;
}

export interface GeocodingResponse {
    results: GeocodingResult[];
    status: string;
}

export interface ILocationInitialState extends ICommonInitials{
    currentLocation:string| null,
}
