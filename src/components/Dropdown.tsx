
import DownArrowComponent from "@assets/svgImages/downArrow";
import { AppDispatch, RootReducer } from "@redux/store";
import { editTasks } from "@redux/taskEditSlice";
import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from "@utils/helpers/customStyles";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Avatar, Icon } from "react-native-paper";
import { useDispatch } from "react-redux";
import MyComponent from "./CustomPlaceholder";
import tw from 'twrnc';

type DropdownItems = {
  data: any[],
  value: string | null | any,
  setValue: (item: any) => void,
  placeholder?: string,
  dropDownStyle?: any,
  icon: boolean,
  search: boolean,
  placeholderStyle?: any
  selectedTextStyle?: any
  setColor?: (item: string) => void,
  leftIcon?: boolean,
  defaultProfileImage?: string | null,
  label?: string,
  taskId?: number | undefined
  dropdownRef?: any
}
const DropdownItems: React.FC<DropdownItems> = ({ icon,
  search,
  data,
  dropDownStyle,
  value,
  setValue,
  placeholder,
  placeholderStyle,
  selectedTextStyle,
  setColor,
  leftIcon,
  defaultProfileImage,
  label,
  taskId,
  dropdownRef
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const changeHandler = (item: any) => {
    if (label !== undefined) {
      editHandler(item, label)
    }
    setValue(item);
    if (setColor) {
      setColor(item.bgColor)
    }
  }
  const editHandler = async (item: any, label: string) => {
    const labelHandler = (labels: string) => {
      switch (labels) {
        case 'Status':
          return {
            inlineTarget: 'statusId',
            statusId: item.id
          };
        case 'Priority':
          return {
            inlineTarget: 'priorityId',
            priorityId: item.id
          }
        case 'Assignee':
          return {
            inlineTarget: 'taskAssignees',
            taskAssignees: [{
              assigneeRoleId: 0,
              email: item.email,
              isOnline: item.isOnline,
              name: item.text,
              profileImageUrl: item.profileImageUrl,
              reportingManagerId: 0,
              taskAssigneeId: 0,
              taskId: taskId,
              userId: item.id,
              userName: item.userName
            }]
          }
        default:
          break;
      }
    }
    const target = labelHandler(label)
    const payload: any = {
      taskId: taskId,
      isInline: true,
      ...target
    }
    dispatch(editTasks(payload))
  }
  const Item = (props: any) => {
    return (
      <View style={{
        paddingVertical: 10,
        marginBottom: 5,
        borderRadius: 5,
        paddingHorizontal: 5,
        alignItems: 'center',
        backgroundColor: props.bgColor,
        flexDirection: 'row',
        justifyContent: leftIcon ? undefined : props.bgColor ? 'center' : 'flex-start'
      }}>
        {leftIcon ?
          props.profileImageUrl == undefined ?
            <View style={[
              tw`border rounded-full justify-center items-center w-8 h-8`, {
                borderColor: 'rgba(214,224,243, 1)',
                marginRight: 10,
                alignItems: 'center',
              }]}>
              <Text style={{
                fontSize: fontPixel(17)
              }}>{props.userName?.substring(0, 1)}</Text>
            </View>
            :
            <Avatar.Image size={30}
              source={
                { uri: props.profileImageUrl }}
              style={{ backgroundColor: 'white', marginRight: 10 }} />
          : null}
        <Text style={selectedTextStyle}>
          {props.text}
        </Text>
      </View>
    )
  }

  const [searchFilter, setSearchFilter] = useState('');

  const filteredData = useMemo(() => {
    if (data) {
      return data.filter((item: any) =>
        item?.text?.toLowerCase().includes(searchFilter.toLowerCase())
      );
    } else {
      return []
    }
  }, [searchFilter, data]);
  return (
    <Dropdown
      ref={dropdownRef}
      showsVerticalScrollIndicator={false}
      style={[dropDownStyle, styles.dropdown]}
      placeholderStyle={[placeholderStyle, styles.placeholderStyle]}
      selectedTextStyle={[selectedTextStyle, styles.selectedTextStyle]}
      containerStyle={{ borderRadius: 5, paddingHorizontal: pixelSizeHorizontal(7) }}
      iconStyle={styles.iconStyle}
      data={filteredData}
      renderItem={(props) => <Item {...props} />}
      search={search}
      searchPlaceholder="Search"

      maxHeight={300}
      inputSearchStyle={{
        borderRadius: 5, height: heightPixel(40), paddingVertical: 0, fontSize: fontPixel(15),
        color: '#575962'
      }}

      labelField="text"
      valueField="text"
      placeholder={placeholder}
      value={label == 'Assignee' ? value?.userName : value}
      onChange={(item) => changeHandler(item)}
      renderRightIcon={() =>
        icon ? (
          <DownArrowComponent />
        )
          :
          null}
      renderInputSearch={(props) => <MyComponent {...props} setSearchFilter={setSearchFilter} searchFilter={searchFilter} />}
      renderLeftIcon={() => {
        return leftIcon ? (
          value?.profileImageUrl == undefined ?
            <View style={[
              tw`border rounded-full justify-center items-center w-8 h-8`, {
                borderColor: 'rgba(214,224,243, 1)',
                alignItems: 'center',
              }]}>
              <Text style={{
                fontSize: fontPixel(17)
              }}>{value?.userName ? value?.userName?.substring(0, 1) : "U"}</Text>
            </View>
            :
            <Avatar.Image
              size={30}
              source={
                value?.profileImageUrl
                  ? { uri: value.profileImageUrl }
                  : defaultProfileImage == null
                    ? require('@assets/images/Ellipse.png')
                    : { uri: defaultProfileImage }
              }
              style={{ backgroundColor: 'white', marginRight: pixelSizeHorizontal(4) }}
            />
        ) : null;
      }}

    />
  )
}

const styles = StyleSheet.create({
  dropdown: {
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: pixelSizeHorizontal(10),
  },
  placeholderStyle: {
    fontSize: fontPixel(16),
    fontFamily: 'NotoSans-Medium',
  },
  selectedTextStyle: {
    fontSize: fontPixel(16),
    fontFamily: 'NotoSans-Medium',
    // color:'#100C08'
  },
  iconStyle: {
    width: widthPixel(25),
    height: heightPixel(25),
  },
})
export default DropdownItems;