import * as React from 'react';
import CustomButton from '@components/common/Button';
import { View } from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { getLocation } from '@redux/locationSlice';
import GetCurrentLocation from '@utils/helpers/getCurentLocation';
import { useState } from 'react';
import CheckingLocationModal from './CheckingLocationModal';
import styles from './styles';

type CheckInsModal = {
    visible: boolean;
    setVisible: (item: boolean) => void;
    setColor: (item: string) => void;
}

const CheckInsModal: React.FC<CheckInsModal> = ({ visible, setVisible, setColor }) => {
    const [visibleLocation, setVisibleLocation] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>();

    const hideModal = () => setVisible(false);

    const proceedHandler = () => {
        getUserLoactions();
        hideModal();
    }

    const cancelHandler = () => {
        hideModal()
    }
    // get user current lng and lst
    const getUserLoactions = async () => {
        const location: { latitude: number, longitude: number } = await GetCurrentLocation()
        dispatch(getLocation(location))
        setVisibleLocation(true)

    }

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.container}>
                <Text style={styles.text}>This feature allows you to check in and check out of the job locations.
                </Text>
                <Text style={styles.text}>
                    The app only records your location and time when you check in or check out.
                </Text>
                <Text style={styles.text}>Do you wish to continue ?
                </Text>
                <View style={styles.modalView}>
                    <CustomButton title={'Proceed'} mode='contained'
                        customButtom={[styles.customButtom, { backgroundColor: '#8585F2' }]}
                        buttonTitle={[styles.buttonTitle, { color: '#FFF', }]}
                        onPress={proceedHandler} />
                    <CustomButton title={'Not Now'} mode='contained'
                        customButtom={[styles.customButtom, { borderColor: '#8585F2' }]}
                        buttonTitle={[styles.buttonTitle,]}
                        onPress={cancelHandler} />
                </View>
            </Modal>
            <CheckingLocationModal visible={visibleLocation} setVisible={setVisibleLocation} />
        </Portal>

    );
};

export default CheckInsModal;