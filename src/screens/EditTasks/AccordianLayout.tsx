import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import Icons from "@utils/helpers/Icons";
import { IAttachmentData } from "@interfaces/attachment";
import { AppDispatch, RootReducer } from "@redux/store";
import AttachmentModal from "./AttachmentModal";
import UploadIconComponent from "@assets/svgImages/uploadIcon";
import DownArrowComponent from "@assets/svgImages/downArrow";
import RightAttachmentArrowComponent from "@assets/svgImages/rightAttachmentArrow";
import styles from "./styles";
import { fontPixel, pixelSizeHorizontal, pixelSizeVertical } from "@utils/helpers/customStyles";
import { IPermissions } from "@interfaces/permissions";
import { deleteAttachment } from "@redux/attachmentSlice";

type DetailesLayoutProps = {
    open: boolean,
    setOpen: (item: boolean) => void,
    setSelected: (item: boolean) => void,
    taskId?: number | undefined
    companyId?: number | undefined,
    screenName: any,
    navigation: any,
    list: any,
    userId: number
}
const DetailesLayout: React.FC<DetailesLayoutProps> = ({
    open,
    setOpen,
    setSelected,
    screenName,
    taskId,
    companyId,
    navigation,
    list,
    userId
}) => {
    const [pickerVisible, setPickerVisible] = useState<boolean>(false)
    const { attachmentData } = useSelector((state: RootReducer) => state.attachment);
    const { userPermissions } = useSelector((state: RootReducer) => state.permissionSlice);
    const [newAttachment, setNewAttachments] = useState<IAttachmentData[] | any>([])
    const deletePermissions = userPermissions && userPermissions.data && userPermissions.data.filter(
        (permission: IPermissions) => permission.permissionCode === "TADL"
    );
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (list?.length !== 0) {
            setNewAttachments(attachmentData)
        } else {
            setNewAttachments([])
        }
    }, [attachmentData, list])

    const DisplayHandler = useCallback(async (item: IAttachmentData) => {
        const { mimeType, filedataByte, uploadedBy } = item;
        let permission: boolean | null | undefined = deletePermissions && deletePermissions !== undefined && deletePermissions.length > 0 &&
            deletePermissions[0].isAllowed
        let show: boolean = false;
        if (permission) {
            show = uploadedBy == userId ? true : false
        }

        const deleteHandler = () => {
            try {
                let payload = {
                    attachmentId: item.attachmentId,
                    title: item.title,
                    documentType: null,
                    mimeType: item.mimeType,
                    filePath: item.filePath,
                    dateUploaded: item.dateUploaded,
                    uploadedBy: item.uploadedBy
                }
                dispatch(deleteAttachment(payload))
                setTimeout(() => {
                    navigation.goBack()

                }, 1000);

            } catch (error) {
                console.log(error)
            }

        }
        if (mimeType.includes("image")) {
            let base64Pdf = `data:image/png;base64,${filedataByte}`
            navigation.navigate("PdfNavigations", { item: base64Pdf, mimeType: 'image', show: show, onPress: () => deleteHandler() })
        } else if (mimeType == 'text/javascript') {
            const path = `${RNFS.CachesDirectoryPath}/video.mp4`;
            await RNFS.writeFile(path, filedataByte, 'base64');
            const content = await RNFS.readFile(path);
            navigation.navigate("PdfNavigations", { item: content, mimeType: 'doc', show: show, onPress: () => deleteHandler() })
        } else if (mimeType.includes("video")) {
            const path = `${RNFS.CachesDirectoryPath}/video.mp4`;
            await RNFS.writeFile(path, filedataByte, 'base64');
            navigation.navigate("PdfNavigations", { item: path, mimeType: 'video', show: show, onPress: () => deleteHandler() })
        } else {
            let base64Pdf = `data:application/pdf;base64,${filedataByte}`
            navigation.navigate("PdfNavigations", { item: base64Pdf, mimeType: 'pdf', show: show, onPress: () => deleteHandler() })
        }
    }, [navigation]
    );

    const renderedAttachments = useMemo(
        () =>
            screenName.name === "Edit Task" &&
            newAttachment.map((item: IAttachmentData, index: number) => {
                const positionInRow = index % 3;

                return (
                    <Pressable
                        key={index}
                        style={[
                            styles.attachments,
                            {
                                marginLeft: positionInRow === 0 ? pixelSizeHorizontal(10) : 0,
                                marginRight: positionInRow === 0 ? pixelSizeHorizontal(10) : 0, // Right margin adjustment
                            },
                        ]}
                        onPress={() => DisplayHandler(item)}
                    >
                        {item.mimeType.includes("image") ? (
                            <Image
                                source={{ uri: `data:image/png;base64,${item.filedataByte}` }}
                                resizeMode="cover"
                                style={{ height: "80%", width: "100%", borderRadius: 5 }}
                            />
                        ) : item.mimeType === "text/javascript" ? (
                            <Icons.MaterialCommunityIcons name="code-json" size={70} />
                        ) : item.mimeType.includes("video") ? (
                            <Icons.FontAwesome name="file-video-o" size={70} />
                        ) : (
                            <Icons.FontAwesome name="file-pdf-o" size={70} color={"#e72f20"} />
                        )}
                        <Text>{`${item.title.substring(0, 9)}...`}</Text>
                    </Pressable>
                );
            }),
        [newAttachment, DisplayHandler, screenName.name]
    );

    return (
        <Pressable style={[styles.accordianContainer, {
            minHeight: open ? 300 : 50,
        }]} onPress={()=>setSelected(false)}>
            <View style={styles.attachmentContainer}>
                <View style={styles.attachmentWrapper}>
                    <View >
                        <Text style={{
                            fontSize: fontPixel(17),
                            fontFamily: 'NotoSans-Medium',
                            marginBottom: 1, color: 'rgba(23, 28, 48, 1)'
                        }}>Attachments</Text>
                    </View>
                </View>
                <Pressable style={{ marginTop: pixelSizeVertical(5), }} onPress={() => {
                    setOpen(!open)
                    setSelected(false)
                }}>
                    {open ?
                        <DownArrowComponent /> :
                        <RightAttachmentArrowComponent />}
                </Pressable>
            </View>

            {open &&
                <ScrollView style={styles.attachmentView}
                    nestedScrollEnabled
                >
                    <View style={styles.uploadWrapper}>

                        <Pressable style={styles.uploadView}
                            onPress={() => setPickerVisible(true)}>
                            <UploadIconComponent />
                        </Pressable>
                        {renderedAttachments}

                    </View>
                </ScrollView>
            }
            <AttachmentModal
                taskId={taskId}
                companyId={companyId} modalVisible={pickerVisible} setModalVisible={setPickerVisible} />

        </Pressable>
    )
}

export default DetailesLayout;