import { FlatList, Platform, Pressable, RefreshControl, ScrollView, Text, View } from "react-native"
import styles from "./styles"
import { colors, heightPixel } from "@utils/helpers/customStyles"
import getTime from "@utils/helpers/datetime"
import { IAsset } from "@interfaces/assets"

type DetailView = {
    assetsData: IAsset,
    refreshing:boolean,
    onRefresh:()=>void
}
const DetailView: React.FC<DetailView> = ({ assetsData,refreshing,onRefresh }) => {
    const Item = ({ item }: { item: IAsset }) => (
        <Pressable style={styles.categoryWrapper}>
                <View style={[styles.categoriesContainer, { marginTop: 0 }]}>
                    <Text style={styles.detialKeys}>Category: </Text>
                    <Text style={styles.detialValue}>{item?.assetCategoryName}</Text>
                </View>
                <View style={[styles.categoriesContainer]}>
                    <Text style={styles.detialKeys}>Code: </Text>
                    <Text style={styles.detialValue}>{item?.assetCode}</Text>
                </View> 
                <View style={[styles.categoriesContainer]}>
                    <Text style={styles.detialKeys}>Description: </Text>
                    <Text style={styles.detialValue}>{item?.assetDescription}</Text>
                </View>
                <View style={[styles.categoriesContainer]}>
                    <Text style={styles.detialKeys}>Brand: </Text>
                    <Text style={styles.detialValue}>{item?.assetBrandName}</Text>
                </View>
                <View style={[styles.categoriesContainer]}>
                    <Text style={styles.detialKeys}>Model: </Text>
                    <Text style={styles.detialValue}>{item?.assetModelName}</Text>
                </View>
                <View style={[styles.categoriesContainer]}>
                    <Text style={styles.detialKeys}>Serial#: </Text>
                    <Text style={styles.detialValue}>{item?.serialNumber}</Text>
                </View>
                <View style={[styles.categoriesContainer]}>
                    <Text style={styles.detialKeys}>PO#: </Text>
                    <Text style={styles.detialValue}>{item?.purchaseOrder}</Text>
                </View>
                <View style={[styles.categoriesContainer]}>
                    <Text style={styles.detialKeys}>Status: </Text>
                    <Text style={styles.detialValue}>{item?.assetStatusName}</Text>
                </View>
                <View style={[styles.categoriesContainer]}>
                    <Text style={styles.detialKeys}>Notes: </Text>
                    <Text style={styles.detialValue}>{item?.assetNotes}</Text>
                </View>
                <View style={[styles.categoriesContainer,]}>
                    <Text style={styles.detialKeys}>Department: </Text>
                    <Text style={styles.detialValue}>{item?.assetDepartmentName}</Text>
                </View>
                <View style={[styles.categoriesContainer,]}>
                    <Text style={styles.detialKeys}>Location: </Text>
                    <Text style={styles.detialValue}>{item?.assetLocationName}</Text>
                </View>
                <View style={[styles.categoriesContainer,]}>
                    <Text style={styles.detialKeys}>Address: </Text>
                    <Text style={styles.detialValue}>{item?.assetAddress? JSON.parse(item.assetAddress).label : null}</Text>
                </View>
                <View style={[styles.categoriesContainer,]}>
                    <Text style={styles.detialKeys}>Assignee: </Text>
                    <Text style={styles.detialValue}>{item?.assigneeName}</Text>
                </View>
                <View style={[styles.categoriesContainer,]}>
                    <Text style={styles.detialKeys}>Assigned Date: </Text>
                    <Text style={styles.detialValue}>
                    {getTime.formatedDate(item?.dateAssigned ? item?.dateAssigned:null)}</Text>
                </View>
                <View style={[styles.categoriesContainer,]}>
                    <Text style={styles.detialKeys}>Processor: </Text>
                    <Text style={styles.detialValue}>{item?.processor}</Text>
                </View>
                <View style={[styles.categoriesContainer,]}>
                    <Text style={styles.detialKeys}>RAM Capacity(GB): </Text>
                    <Text style={styles.detialValue}>{item?.ramCapacity}</Text>
                </View>
                <View style={[styles.categoriesContainer,]}>
                    <Text style={styles.detialKeys}>Hard Drive Capacity(GB): </Text>
                    <Text style={styles.detialValue}>{item?.storageCapacity}</Text>
                </View>
                <View style={[styles.categoriesContainer,]}>
                    <Text style={styles.detialKeys}>Operating System: </Text>
                    <Text style={styles.detialValue}>{item?.operatingSystem}</Text>
                </View>
                <View style={[styles.categoriesContainer,]}>
                    <Text style={styles.detialKeys}>Graphics: </Text>
                    <Text style={styles.detialValue}>{item?.graphicsCard}</Text>
                </View>
                <View style={[styles.categoriesContainer]}>
                    <Text style={styles.detialKeys}>Battery: </Text>
                    <Text style={styles.detialValue}>{item?.battery}</Text>
                </View>
        </Pressable>
    );

    const renderItem = ({ item }: { item: IAsset }) => {
        return (
            <Item
                item={item}
            />
        );
    };
    return (
        <View style={{ height:Platform.OS == 'android'? heightPixel(670):heightPixel(580) }}>
            <FlatList
                data={[assetsData]}
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
    )
}

export default DetailView;