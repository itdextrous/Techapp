import DashboardHeader from "@components/layouts/DashboardHeader";
import { Pressable, ScrollView, Text, View } from "react-native"
import styles from "./styles";
import tw from 'twrnc';
import { widthPixel } from "@utils/helpers/customStyles";
import { useEffect, useState } from "react";
import DropdownItems from "@components/Dropdown";
import BackIconComponent from "@assets/svgImages/backIcon";
import InputText from "@components/common/InputText";
import React from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "@redux/store";
import Loader  from "@components/common/Loader";


const EditAsset = ({ navigation, route }: any) => {
    const { assetDetails, isLoading } = useSelector((state: RootReducer) => state.assets);
    const [value, setValue] = useState<string>('Location')
    const [text, setText] = useState<string | undefined>(undefined)
    const assets = assetDetails?.data ? assetDetails?.data : [];

    useEffect(() => {
        if(assets?.assetCategory?.categoryName){
        setText(assetDetails.data.assetCategory.categoryName)
        }else{
        setText('')
    }
    }, [assetDetails])
    const BackHandler = () => {
        navigation.goBack()
    }

    return (
        <Pressable style={styles.container} >
            <DashboardHeader navigation={navigation} route={route} task={assets?.assetCode} />
            {isLoading ?
                <Loader
                    height='100%' />
                :
                <ScrollView keyboardShouldPersistTaps={"handled"} style={tw`w-full`}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.wrapper}>
                        <View style={styles.taskHeader}>
                            <Pressable style={styles.backIconHandler}
                                onPress={BackHandler}>
                                <BackIconComponent />
                            </Pressable>
                            <View style={styles.taskNameWrapper}>
                                <Text style={styles.title}>{assets?.assetDescription}</Text>
                            </View>
                        </View>
                        <View>
                            <InputText placeholder="Category"  value={text}
                                onChangeText={(e: string) => setText(e)}
                                 />
                        </View>
                        <View style={{
                            marginTop: 10,
                            paddingVertical: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>
                            <DropdownItems
                                data={[]}
                                value={value}
                                setValue={(value: any) => setValue(value)}
                                placeholder={'Location'}
                                dropDownStyle={[{
                                    maxWidth: widthPixel(130),
                                    borderWidth: 1
                                }]}
                                selectedTextStyle={{
                                    textAlign: 'center',
                                }}
                                icon={false}
                                search={true}
                                placeholderStyle={{
                                    textAlign: 'center'
                                }}
                            />
                            <DropdownItems
                                data={[]}
                                value={value}
                                setValue={(value: any) => setValue(value)}
                                placeholder={'Assignee'}
                                dropDownStyle={[{
                                    maxWidth: widthPixel(130),
                                    borderWidth: 1

                                }]}
                                selectedTextStyle={{
                                    textAlign: 'center',
                                }}
                                icon={false}
                                search={true}
                                placeholderStyle={{
                                    textAlign: 'center'
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            }
        </Pressable>
    )
}

export default EditAsset;