
import { IAttachmentData } from '@interfaces/attachment';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const getUniqueFilePath = async (basePath: string, fileName: string, mimeType: string) => {
    let uniqueFileName = fileName;
    let filePath = `${basePath}/${uniqueFileName}`;
    let counter = 1;

    while (await RNFS.exists(filePath)) {
        uniqueFileName = `downloadedFile(${counter}).${mimeType === 'image/png' ? 'png' :
            mimeType === 'image/jpeg' ? 'jpeg' :
                mimeType === 'text/javascript' ? 'js' : 'pdf'}`;
        filePath = `${basePath}/${uniqueFileName}`;
        counter++;
    }

    return filePath;
};

const pdfHandler = async (item: IAttachmentData) => {

    const requestStoragePermission = async () => {
        try {
            const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
            if (result === RESULTS.GRANTED) {
                downloadedFiles()
            } else if (result === RESULTS.DENIED) {
                // Permission has been denied
                console.log('Storage permission denied');
                return false;
            } else if (result === RESULTS.BLOCKED) {
                // Permission has been denied and cannot be requested again
                console.log('Storage permission blocked');
                Alert.alert(
                    'Permission Required',
                    'Please enable storage permission in app settings to continue.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Settings', onPress: () => openSettings() }
                    ]
                );
            } else {
                // Permission denied or unknown error
                Alert.alert(
                    'Permission Denied',
                    'Storage permission is required to proceed.',
                    [{ text: 'OK', onPress: () => console.log('Permission denied') }]
                );
            }
            //   return false;
        } catch (error) {
            console.warn(error);
            return false;
        }
    }

    const downloadedFiles = async () => {
        try {

            // Define the file path
            let externalDirPath = RNFS.ExternalStorageDirectoryPath;
            const documentDirPath = `${externalDirPath}/Documents`;
            // Check if Documents directory exists, create if not
            const documentDirExists = await RNFS.exists(documentDirPath);
            if (!documentDirExists) {
                await RNFS.mkdir(documentDirPath);
            }

            // Define the file path
            const basePath = Platform.OS === 'android' ? documentDirPath : RNFS.DocumentDirectoryPath;
            const fileName = `${item.title}`;
            const mimeType = item.mimeType;
            // Get a unique file path to avoid overwriting
            const filePath = await getUniqueFilePath(basePath, fileName, mimeType);

            // Write the base64 string to a file
            await RNFS.writeFile(filePath, item.filedataByte, 'base64');

            // Check if the file exists
            const fileExists = await RNFS.exists(filePath);
            if (fileExists) {
                Alert.alert('Success', `File has been downloaded`);
            } else {
                Alert.alert('Error', 'Failed to create file.');
            }
        } catch (error) {
            console.error('Failed to download PDF file:', error);
            Alert.alert('Error', 'Failed to download file.');
        }
    }
    const isAndroid13OrHigher = Platform.OS === 'android' && Platform.Version >= 33;
    if (!isAndroid13OrHigher) {

        requestStoragePermission()
    } else {
        downloadedFiles()
    }
}

export default pdfHandler;