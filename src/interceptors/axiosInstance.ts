import { APPLICATION_ID, BASE_URL, PUBLIC_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from 'axios';
import type { AxiosRequestConfig } from 'axios';

/**
 * Axios Request Interceptor Configuration
 * 
 * @param config - The Axios request configuration object.
 * @returns The updated Axios request configuration.
 */
axiosClient.interceptors.request.use(
  async function (config) {
    const token:any = await AsyncStorage.getItem('token');
    const authToken = JSON.parse(token)
     // Set the base URL for the Axios requests
    config.baseURL = `${BASE_URL}`;
    config.headers!['Content-Type'] = 'application/json; charset=utf-8';
    config.headers!.Accept = 'application/json';
    config.headers!['applicationId'] = `${APPLICATION_ID}`;
    config.headers!['publicKey'] = `${PUBLIC_KEY}`;
    if (token) {
    config.headers['Authorization'] = `Bearer ${authToken}`
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const axios = <T>(cfg: AxiosRequestConfig) => axiosClient.request<any, T>(cfg);

export default axios;