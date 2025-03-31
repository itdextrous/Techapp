import { APPLICATION_ID, BASE_URL, PUBLIC_KEY } from "@env";
import { IProfileImageResponse } from "../interfaces/profileImage";
import ApiEndpoints from "@enums/apiEndpoints ";

/**
 * upload profile 
 * @param userProfileForm value for update profile
 * @returns an item of type IProfileImageResponse
 */
const uploadProfile = async (userProfileForm: FormData, token:string | null|undefined) => {
// append headers
  const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("applicationId", `${APPLICATION_ID}`);
    myHeaders.append("publicKey", `${PUBLIC_KEY}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: userProfileForm,
    };
        const response = await fetch(`${BASE_URL}${ApiEndpoints.PROFILE.SAVE_USER_PROFILE_IMAGE}`, requestOptions);
        const result = await response.json(); 
        return result as IProfileImageResponse;
};

const UploadProfileService = {
    uploadProfile,
};
export default UploadProfileService;
