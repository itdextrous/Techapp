// ErrorBoundary.tsx
import axios from '@interceptors/axiosInstance';
import { RootReducer } from '@redux/store';
import { AxiosResponse } from 'axios';
import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { useSelector } from 'react-redux';

// Define your log error function
export const logErrorToApi = async (error: Error, errorInfo: React.ErrorInfo, userInfos?:any, apiName?:string) => {
    try {
        let payload = {
            userId: userInfos?.id,
            taskId: 0,
            actiontype: `${apiName} error`,
            view: 'mobile',
            actionResponse: error.message
        }
        const response = await axios<AxiosResponse>({
            method:'POST',
            url:"/MobileLogs",
            data:payload
        })
    } catch (apiError) {
        console.error('Failed to log error to API:', apiError);
    }
};

const ErrorFallback = ({ error,resetError,screenName }:any) => {
    const { userInfos } = useSelector((state: RootReducer) => state.userInformation);
    const functionName = error.stack?.split('\n')[1]?.trim().split(' ')[1] || 'Unknown function';
    const fallBack = async () => {
        let payload = {
            userId: userInfos?.id,
            taskId: 0,
            actiontype: `${screenName ? screenName :'screen'} Data error in ${functionName?functionName:''} function`,
            view: 'mobile',
            actionResponse: error.message
        }
        const response = await axios<AxiosResponse>({
            method: 'POST',
            url: "/MobileLogs",
            data: payload
        })
    }
    fallBack();
    return null; // or provide some UI to display the error
};

const ErrorBoundary= ({ children,screenName  }:any) => (
    <ReactErrorBoundary 
     FallbackComponent={(props) => <ErrorFallback {...props} screenName={screenName} />}
     onError={logErrorToApi}>
    
        {children}
    </ReactErrorBoundary>
);

export default ErrorBoundary;
