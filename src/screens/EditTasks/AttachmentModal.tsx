import React, { useCallback, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, FlatList, TouchableOpacity } from 'react-native';
import { docPicker, openCamera } from '@utils/helpers/openCamera';
import attachmentList, { IattachmentList } from '@utils/data/attachmentList';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootReducer } from '@redux/store';
import { attachments, uploadAttachments } from '@redux/attachmentSlice';
import { fontPixel, heightPixel, pixelSizeVertical } from '@utils/helpers/customStyles';

type AttachmentModal = {
  modalVisible: boolean,
  setModalVisible: (item: boolean) => void
  taskId: number | undefined,
  companyId: number | undefined,
 
}

const AttachmentModal: React.FC<AttachmentModal> = React.memo(({ modalVisible, setModalVisible, taskId, companyId }) => {
  const { userData } = useSelector((state: RootReducer) => state.auth)
  const dispatch = useDispatch<AppDispatch>();
  const token = userData?.data?.token;
  const [chooseTitle, setChooseTitle]= useState<string>('')

 

  const updateAttachmentDoc = useCallback(async (docs: any) => {
    for (const doc of docs) {
      const userAttachmentForm: FormData = new FormData();
      userAttachmentForm.append('FileSent', {
        uri: doc.uri,
        name: doc.name,
        type: doc.type,
      });
      userAttachmentForm.append("Title", doc.name);
      userAttachmentForm.append("MimeType", doc.type);
      userAttachmentForm.append("CompanyId", companyId);
      userAttachmentForm.append("TaskId", taskId);
      const params: any = {
        formData: userAttachmentForm,
        token: token
      }
      dispatch(uploadAttachments(params))

    }
  }, [companyId, taskId, token, dispatch]);

  const updateAttachment = useCallback(async (images: ImageOrVideo[] | any) => {
    // Create a new FormData object
    for (const image of images) {
      const userAttachmentForm: FormData = new FormData();
      const filename = image.path.substring(image.path.lastIndexOf('/') + 1);

      userAttachmentForm.append('FileSent', {
        uri: image.path,
        name: filename,
        type: image.mime,
      });
      userAttachmentForm.append("Title", filename);
      userAttachmentForm.append("MimeType", image.mime);
      userAttachmentForm.append("CompanyId", companyId);
      userAttachmentForm.append("TaskId", taskId);
      const params: any = {
        formData: userAttachmentForm,
        token: token
      }
     await dispatch(uploadAttachments(params))
    }
  }, [companyId, taskId, token, dispatch]);

  const handleItemSelect = useCallback((item: IattachmentList) => {
    setChooseTitle(item.title)
    const cropperCircleOverlay: boolean = false;
    let text = 'Uploading attachment...'
    switch (item.id) {
      case '1':
        openCamera('camera', setModalVisible, cropperCircleOverlay, updateAttachment,text);
        break;
      case '2':
        openCamera('images', setModalVisible, cropperCircleOverlay, updateAttachment,text);
        break;
      case '3':
        docPicker(setModalVisible, updateAttachmentDoc, text);
        break;
      case '4':
        setModalVisible(false);
        break;
      default:
        break;
    }
  }, [setModalVisible, updateAttachment, updateAttachmentDoc]);
  
  const renderItem = useCallback(({ item }: { item: IattachmentList }) =>
    {

return(
    <TouchableOpacity style={styles.optionWrapper} onPress={() => handleItemSelect(item)} >
      <Text style={{
        fontFamily:'NotoSans-Medium',
        color: item.title == chooseTitle ? '#545FE5' : '#363435',
        fontSize: fontPixel(17)
      }} >{item.title}</Text>
    </TouchableOpacity>
  )}, [handleItemSelect,chooseTitle]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }} >
            <FlatList
              data={attachmentList}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>

        </View>
      </Pressable>
    </Modal>
  );
});

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    width: '100%',
  },
  modalView: {
    width: '60%',
    backgroundColor:'#FFFFFF',
    borderRadius: 18,
    borderColor:'#E6E6FA',
    borderWidth:1.5,
    alignSelf: 'center',
    position: 'absolute',
    bottom: pixelSizeVertical(100),
    elevation: 5,
    height: heightPixel(255),
    zIndex: 999,
  },
  optionWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#EBEDF3',
    paddingVertical: pixelSizeVertical(17),
    alignItems: 'center',
    alignSelf:'center',
    marginBottom: 3,
    width:'95%'
  }
});

export default AttachmentModal;