import Icons from '@utils/helpers/Icons';
import {  heightPixel, widthPixel, } from '@utils/helpers/customStyles';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, Pressable, View, ScrollView, Platform, Keyboard } from 'react-native';
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import styles from './styles';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { editTasks } from '@redux/taskEditSlice';
import Toast from "react-native-toast-message";

type DetailModal = {
  modalVisible: boolean,
  setModalVisible: (item: boolean) => void,
  detailText: string,
  setDetailText: (detail: string) => void,
  handleSave?: any,
  taskID?: number | undefined

}
const showToast = (width: any, text: string | undefined) => {
  Toast.show({
    type: 'customToast',
    text2: text,
    position: 'top',
    props: styles.toastStyle
  });
};

const DetailModal: React.FC<DetailModal> = ({
  setDetailText,
  detailText,
  modalVisible,
  setModalVisible,
  handleSave,
  taskID
}) => {
  const richText = useRef<any>();
  const dispatch = useDispatch<AppDispatch>();
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [textEdit, setTextedit] = useState("");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardShown(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardShown(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  useEffect(() => {
    if (modalVisible) {
      setTextedit(detailText)
      if (richText.current && typeof richText.current.focus === 'function') {
        richText.current.focus(); // Use the correct method to focus on the editor
      }
    }
  }, [modalVisible])

  const handleChange = (html: string) => {
    setTextedit(html)
    // Log the final output
  };

  const saveHandler = () => {
    setDetailText(textEdit)
    const payload = {
      taskId: taskID,
      isInline: true,
      inlineTarget: "taskDescription",
      taskDescription: textEdit
    }
    const res = dispatch(editTasks(payload))
    showToast(widthPixel(150), 'changes saved');
    setTextedit('')
  }

  const closeRequest = () => {
      setModalVisible(!modalVisible);
      if (textEdit) {
        handleSave ?
          handleSave(textEdit) :
          saveHandler()
      }

      setTextedit('')
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeRequest}
      >
        
          <View style={styles.modalView}>
            <View style={styles.textEditorWrap}>
              <Pressable
                style={[styles.button]}
                onPress={closeRequest}>
                <Icons.AntDesign name='close' size={20} />
              </Pressable>
            </View>
            <RichToolbar
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderColor: 'rgba(242, 242, 252, 1)',
                backgroundColor: "white"
              }}
              editor={richText}
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.setUnderline,
                actions.alignLeft,
                actions.alignRight,
                actions.alignCenter,
                actions.insertLink,
                actions.insertBulletsList,
                actions.insertOrderedList,
              ]}
              selectedIconTint={'red'}
            />
            <View style={{ height: Platform.OS == 'android' ? heightPixel(520) : heightPixel(485) }}>
              <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>

                <RichEditor
                  initialFocus
                  ref={richText}
                  initialContentHTML={textEdit}
                  onChange={(items) => handleChange(items)}
                  placeholder='Task Details'
                  initialHeight={400}
                  editorStyle={{
                    contentCSSText: `
                    ul, ol {
                        padding-left: 10px;
                        margin-left: 10px;
                        margin-top: 0px;
                        margin-bottom: 0px; /* Remove bottom margin from ul */
                        padding-top: 0px;
                        padding-bottom: 0px;
                      }
                    li {
                         margin-top: 0px;
                        margin-bottom: 0px;
                        margin-left: 0px;
                        padding-left: 0px;
                    }
                         p, div, span {
                        margin: 0px;
                        padding: 0px;
                      }
                  `
                  }}
                />
                {keyboardShown && <View style={{ height: Platform.OS == 'android' ? heightPixel(280) : heightPixel(200) }} />}
              </ScrollView>
            </View>
            
          </View>
      </Modal>
    </View>
  );
};


export default DetailModal;

