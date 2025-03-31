import { Button, Pressable, Text, TextInput, View } from "react-native";
import styles from "./styles";
import { Portal, Modal, Icon, } from "react-native-paper";
import { fontPixel, widthPixel } from "@utils/helpers/customStyles";


const TitleModal = ({ editHandler, setTitle, titleModalVisible, title, setTitleModalVisible }: any) => {
    const handleModalClose = () => {
        editHandler()
        setTitleModalVisible(false);
    };
    return (
            <Portal >
                <Modal visible={titleModalVisible} 
                onDismiss={handleModalClose}
                     contentContainerStyle={{
                        position: 'absolute',
                        width: '100%',
                        top: 60,
                        left: 10,
                        padding: 20, // Optional padding
                      }}
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                      >
                    <Pressable
                        onPress={handleModalClose} style={{
                            flex: 1,
                            alignItems: 'center',
                            flexDirection:'row',
                            // borderWidth:1,
                            width:widthPixel(300)
                        }}>
                        <View style={[styles.focusTaskNameWrapper]}>
                            <TextInput
                                placeholder="title"
                                value={title}
                                autoFocus
                                style={styles.focusTitleInput}
                                onChangeText={(e: string) => setTitle(e)}
                            />
                        </View>
                            <Pressable
                            style={{
                                position:'relative',
                                left:-10,
                            }} onPress={handleModalClose}>
                                <Icon
                                    source="close"
                                    size={fontPixel(30)}
                                />
                                </Pressable>
                        
                    </Pressable>
                </Modal>
            </Portal>
        
    )
}
export default TitleModal;
