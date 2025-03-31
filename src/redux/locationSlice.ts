import { ILocationInitialState } from "@interfaces/location";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LocationService from "@services/getLocationName.service";
import log from "@services/log";
import { handle401Error } from "@utils/helpers/errorHandler";
/**
 * Redux Slice for userLocation
 * This slice manages the user location in the Redux store.
 */

// initial state
const initialState:ILocationInitialState = {
  currentLocation:null,
  isLoading:false,
  isSuccess:false,
  isError:false,
}

// get location
export const getLocation = createAsyncThunk('userLocation', async(params:{latitude:number,longitude:number}, thunkApi)=>{
  // call  getLocation api
  try {
      const response = await LocationService.currentLocation(params);
         if (response.status === 'OK' && response.results.length > 0) {
            // Access the formatted address or other components as needed
            const placeName = response.results[0].address_components;
            const place = 
            placeName.find((component: {types: string | string[]}) =>
              component.types.includes('sublocality')
          )?.long_name || 
          placeName.find((component: {types: string | string[]}) =>
          component.types.includes("sublocality_level_1")
        )?.long_name ||
        placeName.find((component: {types: string | string[]}) =>
          component.types.includes("political")
      )?.long_name ||
      placeName.find((component: {types: string | string[]}) =>
        component.types.includes('neighborhood')
    )?.long_name || '';
            // Find the city and country in the address components
           const city =
             placeName.find((component: {types: string | string[]}) =>
               component.types.includes('administrative_area_level_3'),
             )?.long_name ||
             placeName.find((component: {types: string | string[]}) =>
               component.types.includes('administrative_area_level_2'),
             )?.long_name ||
             placeName.find((component: {types: string | string[]}) =>
               component.types.includes('administrative_area_level_1'),
             )?.long_name ||
             '';
  
            const country =
              placeName.find((component: { types: string | string[]; }) => component.types.includes('country'))
                ?.long_name || '';
  
                const postalCode = 
                placeName.find((component:{ types: string | string[]; })=> component.types.includes("postal_code"))
                ?.long_name || '';

            const address = `${place},${" "}${city},${" "}${country},${" "}${postalCode}`
            return address;
          } else {
            throw new Error('Unable to retrieve place information');
          }
  } catch (error) {
    log.error(error, 'error from locatoion slice')
    return await handle401Error(error, thunkApi);
  }
})

const userLocationSlice = createSlice({
  name: "userLocation",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getLocation.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(getLocation.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.currentLocation = action.payload;
    })
    builder.addCase(getLocation.rejected,(state)=>{
      state.isLoading=false;
      state.isError =true;
    })
  }
});
export default userLocationSlice.reducer;
