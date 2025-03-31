import DashboardHeader from "@components/layouts/DashboardHeader";
import { Animated, FlatList, Linking, Platform, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import styles from "./styles";
import InputText from "@components/common/InputText";
import tw from 'twrnc';
import { colors, fontPixel, heightPixel, pixelSizeVertical } from "@utils/helpers/customStyles";
import { useCallback, useEffect, useState } from "react";
import QRCodeScanner from 'react-native-qrcode-scanner';
import encryptParams from "@utils/helpers/encrypter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootReducer } from "@redux/store";
import { assetDetails, assetList } from "@redux/assetsSlice";
import Loader from "@components/common/Loader";
import RightArrowComponent from "@assets/svgImages/rightArrow";
import LinearGradient from "react-native-linear-gradient";
import { IAsset } from "@interfaces/assets";

type ItemProps = {
    item: IAsset,
    onPress: (item: number) => void
}
const AssetsScreen = ({ navigation, route }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { assetsList, isLoading } = useSelector((state: RootReducer) => state.assets);
    const [searchAssets, setSearchAssets] = useState<any>([])
    const [data, setData] = useState<string>('')
    const [editTest, setEditTest] = useState<string>('')
    const [scannerVisible, setScannerVisible] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getAssetList()
    }, [])
    const getAssetList = async () => {
        const isArchived = false
        let value = {
            search: "",
            assetId: 0,
            isArchived: isArchived,
            categoryIds: "",
            assigneeIds: "",
            brandIds: "",
            statusIds: "",
            locationIds: "",
            warrantyType: ""
        }
        const encrypted = encryptParams(value)
        const response: any = await dispatch(assetList(encrypted));
        setSearchAssets(response?.payload?.data);

    }
    // Handle assets search based on input text
    const searchAssetsHandler = (text: string) => {
        setEditTest(text)
        if (text.length >= 3) {
            const searchList = assetsList?.data?.length > 0 && assetsList.data.filter((items: IAsset) => {
                const searchText = text.toLowerCase();
                const matchesCategory =
                    typeof items.assetCategoryName === 'string' &&
                    items.assetCategoryName.toLowerCase().includes(searchText);

                const matchesCode =
                    typeof items.assetCode === 'string' &&
                    items.assetCode.toLowerCase().includes(searchText);
                const matchesAssignee =
                    typeof items.assigneeName === 'string' &&
                    items.assigneeName.toLowerCase().includes(searchText);

                const matchesLocation =
                    typeof items.assetLocationName === 'string' &&
                    items.assetLocationName.toLowerCase().includes(searchText);

                // Return true if any of the fields match
                return matchesCategory || matchesCode || matchesAssignee || matchesLocation;
            });
            setSearchAssets(searchList)
        }
        else {
            setSearchAssets(assetsList.data)
        }

    }

    const editAssetHandler = (assetId: number) => {
        let assetid = {
            assetId: assetId
        }
        const encrypted = encryptParams(assetid)
        dispatch(assetDetails(encrypted))
        setEditTest('')
        searchAssetsHandler('')
        navigation.navigate('Assets Details')
    }
    const Item = ({ item, onPress }: ItemProps) => (
        <LinearGradient
            colors={['#FFFFFF', '#E9EDF4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.assetsContainer}
        >
            <TouchableOpacity onPress={() => onPress(item.assetId)} >
                <View style={styles.assetsWrapper}>
                    <View style={styles.detailsWrapper}>
                        <Text style={styles.assetsHeading}>{item?.assetCategoryName}</Text>
                        <View style={styles.assetsDetail}>
                            <Text style={[styles.assetsText, { width: '40%' }]}>Code: {item?.assetCode}</Text>
                            <Text style={[styles.assetsText, { width: '55%' }]}>Brand: {item?.assetBrandName?.length > 14 ?
                                `${item?.assetBrandName.substring(0, 14)}...` : item?.assetBrandName}</Text>
                        </View>
                    </View>
                    <View >
                        <RightArrowComponent />
                    </View>
                </View>
            </TouchableOpacity>
        </LinearGradient>
    );

    const renderItem = ({ item }: { item: IAsset }) => {
        return (
            <Item
                item={item}
                onPress={editAssetHandler}
            />
        );
    };
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Simulate an async action (e.g., fetching new data)
        setTimeout(() => {
            getAssetList() // Reset data (or fetch new data here)
            setRefreshing(false);
        }, 2000); // Adjust timeout as needed
    }, []);


    return (
        <View style={styles.container} >

            <DashboardHeader navigation={navigation} route={route} setScannerVisible={setScannerVisible}
                scannerVisible={scannerVisible} />

            {scannerVisible ?
                <QRCodeScanner
                    onRead={(data) => setData(data.data)}
                    topContent={
                        <Text style={{
                            flex: 1,
                            fontSize: 18,
                            padding: 32,
                            color: 'blue'
                        }}
                            onPress={() => Linking.openURL(data)}>
                            {data}
                        </Text>
                    }
                />
                :
                isLoading ?
                    <Loader
                        height='100%' />
                    :
                    <View style={tw`h-full w-full px-5`}>
                        <InputText
                            placeholder="Search Assets"
                            placeholderColor="#BFC0CB"
                            inputWrapper={{ borderColor: "#E9EDF4" }}
                            textInput={styles.textInput}
                            onChangeText={(text) => searchAssetsHandler(text)}
                            value={editTest} />
                        <View style={{
                            marginVertical: 15,
                        }} >
                            <Text style={{
                                fontSize: fontPixel(15),
                                color: "#575962",
                                fontFamily: 'NotoSans-Regular',
                            }}>Type 3 or more characters to start searching for assets.</Text>

                            <Text style={{
                                fontSize: fontPixel(15),
                                marginTop: pixelSizeVertical(8),
                                color: "#575962",
                                fontFamily: 'NotoSans-Regular',
                            }}>You can search for the asset name, category or asset description.</Text>
                        </View>
                        <View style={{ height: Platform.OS == 'android' ? heightPixel(540) : heightPixel(450) }}>
                            <FlatList
                                data={searchAssets}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                        colors={[colors.theme]}
                                        tintColor={colors.theme}
                                    />
                                }
                            />
                        </View>
                    </View>
            }
        </View>
    )
}


export default AssetsScreen;