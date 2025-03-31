import * as React from 'react';
import CustomButton from '@components/common/Button';
import { AppDispatch, RootReducer } from '@redux/store';
import getTime from '@utils/helpers/datetime';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Modal, Portal, Text, } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { checkin } from '@redux/checkinListSlice';
import { ICheckin, Status } from '@interfaces/checkin';
import { colors, pixelSizeVertical } from '@utils/helpers/customStyles';

type CheckingLocationModal = {
    visible: boolean;
    setVisible: (item: boolean) => void;
    screen?: string,
    location?: { latitude: number, longitude: number },
    statusVoid?: () => void
}

const CheckingLocationModal: React.FC<CheckingLocationModal> = ({ visible,
    setVisible, screen, location, statusVoid
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const hideModal = () => setVisible(false);
    const { userInfos } = useSelector((state: RootReducer) => state.userInformation);
    const { status } = useSelector((state: RootReducer) => state.checkin);
    const { currentLocation } = useSelector((state: RootReducer) => state.userLocation);
    const [currentTime, setCurrentTime] = useState('Checking in');
    useEffect(() => {

        // Update the current time every second
        const interval = setInterval(() => {
            const time = getTime.UpdateTime;
            setCurrentTime(time);
        }, 1000);
        // Clear the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const proceedHandler = async () => {
        if(!currentLocation){
        Alert.alert("Your location cannot be confirmed at this stage. Please try again.")
        setVisible(false)
        return;
        }
        const date = new Date();
        let payload: ICheckin = {
            userId: Number(userInfos?.id),
            date: date.toISOString(),
            location: currentLocation,
            lat: location !== undefined ? location.latitude.toString() : '',
            long: location !== undefined ? location.longitude.toString() : '',
            action: status == 'checkin' ? Status.Checkout : Status.Checkin
        }
        await dispatch(checkin(payload))
        statusVoid !== undefined ? statusVoid() : null
        setVisible(false)
    }
    const cancelHandler = () => {
        hideModal()
    }
    const getStatus = () => {
        let updatedStatus;
        if (screen == "clockout") {
            updatedStatus = status == "clockin" ? "Checking in" : "Checking Out";
        } else {
            updatedStatus = status == "clockout" ? "Checking Out" : "Checking in";

        }
        return updatedStatus;
    }

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.container}>
                <Text style={[styles.text, {
                    fontFamily:'NotoSans-SemiBold',
                    textTransform: 'capitalize',
                    color:getStatus() == 'Checking in'?'#2CA079':'#FFA800',
                    marginBottom:pixelSizeVertical(10)
                }]}>{getStatus() == 'Checking in'? 'Check In':'Check Out'}</Text>
                <Text style={[styles.text,{ color:'#575962'}]}>You are {getStatus()} {getStatus() == 'Checking in' ? 'at' : 'from'}</Text>
                <Text style={[styles.text,{ color:'#575962'}]}>{currentLocation} @ {currentTime}</Text>
                <View style={styles.modalView}>
                    <CustomButton title={'Proceed'}
                        customButtom={[styles.customButtom, { backgroundColor: '#8585F2' }]}
                        buttonTitle={[styles.buttonTitle, { color: '#FFF' }]}
                        onPress={proceedHandler} />
                    <CustomButton title={'Cancel'}
                        customButtom={[styles.customButtom]}
                        buttonTitle={[styles.buttonTitle,]}
                        onPress={cancelHandler} />
                </View>
            </Modal>
        </Portal>
    );
};

export default CheckingLocationModal;