import { fontPixel, pixelSizeVertical, widthPixel } from '@utils/helpers/customStyles';
import React from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import tw from 'twrnc';
import CustomButton from '@components/common/Button';

type CameraModel = {
  dateModalVisible: boolean;
  setDateModalVisible: (value:boolean)=>void;
  openCamera: (value:string)=>void;
};

const CameraModel: React.FC<CameraModel> = ({
  dateModalVisible,
  setDateModalVisible,
  openCamera,
}) => {
  return (
    <Modal
      transparent={true}
      visible={dateModalVisible}
      onRequestClose={() => setDateModalVisible(!dateModalVisible)}>
      <TouchableWithoutFeedback
        onPress={() => setDateModalVisible(!dateModalVisible)}>
        <View
          style={tw`flex-1 justify-center items-center bg-opacity-50 bg-black`}>
          <TouchableWithoutFeedback>
            <View
              style={tw`w-60 bg-white items-center shadow-lg rounded-lg`}>
              <View
                style={tw`w-full bg-white py-2 rounded-lg`}>
                <View style={{paddingVertical: pixelSizeVertical(5)}}>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                    }}>
                    <CustomButton
                      title="Choose images"
                      customButtom={[styles.button1]}
                      buttonTitle={styles.text}
                      onPress={() => {
                        openCamera('images');
                      }}
                    />
                    <View
                      style={[
                        tw`w-full border-b`,
                        {borderColor: 'rgba(214,224,243, 1)'}
                      ]}></View>
                    <CustomButton
                      title="Take a photo"
                      customButtom={styles.button1}
                      buttonTitle={styles.text}
                      onPress={() => {
                        openCamera('camera');
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  text: {
    ...tw`text-sm font-medium`
  },
  button1: {
    ...tw`self-center w-5/6 bg-white rounded-lg items-center justify-center`,
  },
});
export default CameraModel;
