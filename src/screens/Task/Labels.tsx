import React, { memo } from "react";
import { FlatList, Platform, Text, TouchableOpacity, View } from "react-native";
import styles from "@screens/Task/styles";
import tw from 'twrnc';
import { IStatus } from "@interfaces/tasks";
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical } from "@utils/helpers/customStyles";

type Labels = {
  data: IStatus[],
  selected:any,
  setSelected:(item: any) => void,
  handleTaskList:(task?:any, statusId?:string)=>void
}

type ILables = {
  item: IStatus,
  onPress: () => void,
  index: number,
  selected:any
}

const Item = memo(({ item, onPress, index,selected }: ILables) => (
  <View>
      <TouchableOpacity onPress={onPress} style={{
        marginLeft: index == 0 ? 0 : pixelSizeHorizontal(15)
      }}>
        <View style={{ marginVertical: pixelSizeVertical(11) }}>
          <Text style={[styles.title, {
            color:selected?.text == item.text ? "#334151" : '#A0A7B7' ,
          }]} >{item.text} ({item.count})</Text>
        </View>
        <View
          style={[styles.bottomLine,
            {
              backgroundColor: selected?.text == item.text? 'rgba(133, 133, 242, 1)' : "transparent",
            }
          ]} />
      </TouchableOpacity>
  </View>

));

const Labels: React.FC<Labels> = ({ data,selected,setSelected,handleTaskList}) => {
  const handlePress = (item: IStatus) => {
    setSelected(item);
    if(selected?.text != item.text){
      handleTaskList(undefined, item.id.toString())

    }
  };
  const renderItem = ({ item, index }: { item: any, index: number }) => {
    return (
      <Item
        item={item}
        index={index}
        onPress={() => handlePress(item)}
        selected={selected}
      />
    );
  };

  return (
    <View style={[tw`mt-2`,
      { height: data?.length == 0 ? 0 : Platform.OS == 'android'? heightPixel(52):heightPixel(48)}
      ]}>
      <View
      style={[styles.boderLine,
      {
        backgroundColor: data?.length == 0 ? 'transparent' : '#E6E6FA',
      }
      ]} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={3}
        windowSize={10}
      />
    </View>

  )
}

export default Labels;