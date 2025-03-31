import DashboardHeader from "@components/layouts/DashboardHeader";
import { Pressable, Text, View } from "react-native"
import styles from "./styles";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootReducer } from "@redux/store";
import Loader from "@components/common/Loader";
import assetsOptions from "@utils/data/assetsOptions";
import DetailView from "./DetailView";
import AssetsPurchase from "./AssetsPurchase";
import encryptParams from "@utils/helpers/encrypter";
import { assetDetails } from "@redux/assetsSlice";
import BackIconComponent from "@assets/svgImages/backIcon";
import { heightPixel, widthPixel } from "@utils/helpers/customStyles";


const AssetDetails = ({ navigation, route }: any) => {
    const { assetDetailsData, isLoading } = useSelector((state: RootReducer) => state.assets);
    const assets = assetDetailsData?.data?.assetDetails ? assetDetailsData?.data?.assetDetails : {};
    const [assetTitle, setAssetTitle]= useState<string>('Details')
    const [refreshing, setRefreshing] = useState(false);
    const [assetsData, setAssetsData] = useState(assets);
    const dispatch = useDispatch<AppDispatch>();
    
    const seletedColor = (item:string)=>{
        setAssetTitle(item)
    }
        useEffect(()=>{
            setAssetsData(assets)
        },[assets])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
          // You can replace the following line with actual data fetching logic
          let assetid = {
            assetId: assets.assetId
        }
        const encrypted = encryptParams(assetid)

        dispatch(assetDetails(encrypted))

          setRefreshing(false);
      }, [assets]); 
      
      const BackHandler = ()=>{
        navigation.goBack()
      }
    return (
        <Pressable style={styles.container}>
            <DashboardHeader navigation={navigation} route={route} />
            {isLoading ?
                <Loader
                    height='100%' />
                :
                    <View style={styles.wrapper}>
                        <View style={styles.optionWrapper}>
                        <Pressable style={styles.backIconHandler}
                                onPress={BackHandler}>
                                <BackIconComponent />
                            </Pressable>
                            <View style={styles.optionsList}>
                            {assetsOptions.map((item, index) => {
                                return (
                                    <Pressable key={index} style={[styles.options,
                                    ]} onPress={()=>seletedColor(item.title)}>
                                        <Text style={[styles.optionText,{
                                            color:assetTitle == item.title ? "#334151" : "#A0A7B7",
                                        }]}>{item.title}</Text>
                                        {assetTitle == item.title && <View 
                                        style={[styles.bottomLine,
                                            {width:item.title == 'Details'? widthPixel(75):widthPixel(205)}
                                        ]}/>}
                                    </Pressable>
                                )
                            })}
                            </View>
                        </View>
                        {assetTitle == 'Details' ?
                        <DetailView assetsData={assetsData} refreshing={refreshing} onRefresh={onRefresh}/>
                        :
                        <AssetsPurchase assetsData={assetsData} refreshing={refreshing} onRefresh={onRefresh}/>
                        }
                    </View>
                // </ScrollView>
            }
        </Pressable>
    )
}

export default AssetDetails;