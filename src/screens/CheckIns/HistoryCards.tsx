import { colors, fontPixel, heightPixel } from "@utils/helpers/customStyles";
import { FlatList, Platform, RefreshControl, Text, View } from "react-native"
import tw from 'twrnc';
import styles from "./styles";
import { useSelector } from "react-redux";
import { RootReducer } from "@redux/store";
import getTime from "@utils/helpers/datetime";
import { ICheckList } from "@interfaces/checkin";
import React, { useCallback } from "react";

type HistoryCards = {
    setRefreshing:any,
    refreshing: boolean,
    getStatus:()=>void,
    getChekinList:()=>void
}
const HistoryCards:React.FC<HistoryCards> = ({getStatus,getChekinList,setRefreshing,refreshing}) => {
    const { checkinData } = useSelector((state: RootReducer) => state.checkin);
    let checkinHistory: ICheckList | null | undefined = checkinData?.data

    // Reverse the data array
    const checkIns = checkinHistory ? (checkinHistory as unknown as ICheckList[]) : [];

    const Item = ({ item, onPress, checkIn, checkOut }: any) => (
        <View style={styles.historyWrapper}>
            <View style={styles.historyContentWrapper}>
                <Text style={styles.cardDetails}>
                    <Text style={{ fontFamily: 'NotoSans-SemiBold' }}>In:</Text> {
                        item?.checkInLocation
                        && item.checkInLocation}.</Text>
                <Text style={styles.cardDetails}>{checkIn}</Text>
            </View>
            <View style={styles.historyContentWrapper}>
                {item?.checkOutLocation ?
                    <>
                        <Text style={styles.cardDetails}>
                            <Text style={{ fontFamily: 'NotoSans-SemiBold', }}>Out:</Text> {item.checkOutLocation}.</Text>
                        <Text style={styles.cardDetails}>{checkOut}</Text></>
                    : <Text style={{
                        fontSize: fontPixel(15),
                        fontFamily: 'NotoSans-SemiBold', color: '#334151',
                    }}>Not Checked out Yet</Text>
                }
            </View>
        </View>
    );

    const renderItem = ({ item }: { item: any }) => {

        const checkIn =
            item && getTime.formatDate(item.checkInDate)
        const checkOut =
            item && item.checkOutDate == null ?
                '----' : getTime.formatDate(new Date(item.checkOutDate))
        return (
            <Item
                item={item}
                checkIn={checkIn}
                checkOut={checkOut}
            // onPress={onPress}
            />
        );
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Simulate an async action (e.g., fetching new data)
        setTimeout(() => {
          getStatus();
          getChekinList()
          setRefreshing(false);
        }, 1000); // Adjust timeout as needed
      }, []);
    return (
        <View style={[tw`mt-3`, {
            height:
                Platform.OS == 'android' ? heightPixel(570) : heightPixel(520)
        }]}>

            <FlatList
                data={checkIns}
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

export default HistoryCards;