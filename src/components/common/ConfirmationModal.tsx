import * as React from 'react';
import CustomButton from '@components/common/Button';
import { AppDispatch, RootReducer } from '@redux/store';
import { Platform, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors, fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '@utils/helpers/customStyles';
import { Modal, Portal, Text, } from 'react-native-paper';

type ConfirmationModal = {
    visible:boolean,
    setVisible:(text:boolean)=>void,
    onPress:()=>void
}

const ConfirmationModal: React.FC<ConfirmationModal> = ({visible,setVisible,onPress}) => {

    return (
        <Portal>
            <Modal 
                visible={visible} 
                onDismiss={() => {
                    setVisible(!visible);
                  }}
                  contentContainerStyle={styles.container}
                >
                    <Text style={[styles.text, {
                    fontFamily:'NotoSans-SemiBold',
                    textTransform: 'capitalize',
                    color:"#F01D37",
                    marginBottom:pixelSizeVertical(10)
                }]}>Delete Attachment</Text>
                <Text style={[styles.text,{ color:'#575962'}]}>
                You are about to remove the document from this task. Click Delete to remove the document permanently.
                </Text>
                <View style={styles.modalView}>
                    <CustomButton title={'Delete'} onPress={()=>onPress()}
                         customButtom={[styles.customButtom, { backgroundColor: '#8585F2' }]}
                         buttonTitle={[styles.buttonTitle, { color: '#FFF' }]}/>
                    <CustomButton title={'Cancel'} onPress={()=>setVisible(!visible)}
                         customButtom={[styles.customButtom]}
                         buttonTitle={[styles.buttonTitle,]}/>
                </View>
            </Modal>
            </Portal>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'white',
        paddingHorizontal: pixelSizeHorizontal(12),
        marginHorizontal: pixelSizeHorizontal(20),
        alignSelf: 'center',
        paddingVertical: pixelSizeVertical(12),
        borderRadius: 5,
        borderColor: '#EBEDF3',
        borderWidth: 1,
        width: widthPixel(330)
    },
    text: {
        lineHeight: 28,
        fontFamily:'NotoSans-Regular',
        fontSize: Platform.OS == 'android' ? fontPixel(17) : fontPixel(16)
    },
    customButtom: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#8585F2',
        width: widthPixel(100),
        height: heightPixel(40),
    },
    buttonTitle: {
        fontSize:fontPixel(16),
        alignSelf: 'center',
    },
    modalView: {
        marginTop: pixelSizeVertical(25),
        marginBottom: pixelSizeVertical(10),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})

export default ConfirmationModal;