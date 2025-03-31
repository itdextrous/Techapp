import { FlatList, Platform, Pressable, RefreshControl, ScrollView, Text, View } from "react-native"
import styles from "./styles"
import getTime from "@utils/helpers/datetime"
import { IAsset } from "@interfaces/assets"
import { colors, heightPixel, screenHeight } from "@utils/helpers/customStyles"

type AssetsPurchase = {
    assetsData: IAsset,
    refreshing: boolean,
    onRefresh: () => void
}
const AssetsPurchase: React.FC<AssetsPurchase> = ({ assetsData, refreshing, onRefresh }) => {
    const Item = ({ item }: { item: IAsset }) => (
        <Pressable style={styles.categoryWrapper}>
            <View style={[styles.categoriesContainer, { marginTop: 0 }]}>
                <Text style={styles.detialKeys}>Purchase Date: </Text>
                <Text style={styles.detialValue}>{item?.purchaseDate && getTime.formatedDate(item?.purchaseDate ? item.purchaseDate : null)}</Text>
            </View>
            <View style={[styles.categoriesContainer]}>
                <Text style={styles.detialKeys}>Purchase From: </Text>
                <Text style={styles.detialValue}>{item?.purchasedFrom}</Text>
            </View>
            <View style={[styles.categoriesContainer]}>
                <Text style={styles.detialKeys}>Purchase Amount: </Text>
                <Text style={styles.detialValue}>{item?.purchaseAmount}</Text>
            </View>
            <View style={[styles.categoriesContainer]}>
                <Text style={styles.detialKeys}>Warranty Expiry: </Text>
                <Text style={styles.detialValue}>{item?.warrantyExpiry && getTime.formatedDate(item?.warrantyExpiry ? item?.warrantyExpiry : null)}</Text>
            </View>
            <View style={[styles.categoriesContainer]}>
                <Text style={styles.detialKeys}>Warranty Type: </Text>
                <Text style={styles.detialValue}>{item?.assetWarrantyType}</Text>
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
        <View style={{ height:Platform.OS == 'android'? heightPixel(670):heightPixel(620) }}>
        <FlatList
            style={{ height: screenHeight() }}
            data={[assetsData]}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
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
    );
}

export default AssetsPurchase;