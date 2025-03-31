import { useCallback, useState } from "react";
import DashboardHeader from "@components/layouts/DashboardHeader";
import { Button, Pressable, StyleProp, Text, View, ViewStyle } from "react-native"
import tw from 'twrnc';
import { FromDateView, ToDateView } from "./DateView";
import HistoryCards from "./HistoryCards";
import CheckInsModal from "./CheckInsModal";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootReducer, } from "@redux/store";
import CheckingLocationModal from "./CheckingLocationModal";
import permissions from "@utils/helpers/permissions";
import encryptParams from "@utils/helpers/encrypter";
import getTime from "@utils/helpers/datetime";
import { checkinList, checkinStatus } from "@redux/checkinListSlice";
import GetCurrentLocation from "@utils/helpers/getCurentLocation";
import { getLocation } from "@redux/locationSlice";
import Loader from "@components/common/Loader";
import ErrorBoundary from "@services/ErrorBoundry";
import { fontPixel, pixelSizeHorizontal, pixelSizeVertical } from "@utils/helpers/customStyles";
import LocationComponent from "@assets/svgImages/location";
import CustomTooltip from "@components/CustomTooltip";

const CheckIns = ({ navigation, route }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfos } = useSelector((state: RootReducer) => state.userInformation);
  const { status, isLoading, checkinData } = useSelector((state: RootReducer) => state.checkin);
  const { currentLocation } = useSelector((state: RootReducer) => state.userLocation);
  const [fromDate, setFromDate] = useState<Date>(new Date()); // State for the "From" date
  const [toDate, setToDate] = useState<Date>(new Date());
  const [screen, setScreen] = useState<string>('');
  const [visibleLocation, setVisibleLocation] = useState<boolean>(false)
  const [color, setColor] = useState<string>('CHECK IN');
  const [visible, setVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState<{ latitude: number, longitude: number }>({
    latitude: 0,
    longitude: 0
  });
  const [state, setState] = useState<any>({
    first: true,
    second: false
  });

  // Check the status of location permission
  const CheckInsPermission = async () => {
    const permissionStatus = await permissions();

    if (status == 'checkin') {
      setScreen('clockout')
      if (permissionStatus == 'The permission is granted') {
        setVisibleLocation(true)
      } else {
        setVisible(true)
      }
    } else {
      setScreen('clockin')
      if (permissionStatus == 'The permission is granted') {
        setVisibleLocation(true)
      } else {
        setVisible(true)
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      setFromDate(new Date())
      setToDate(new Date())
    }, [route])
  )

  // Changing the color of location icon when its active or not
  useFocusEffect(
    useCallback(() => {
      getStatus();
      getChekinList()
    }, [status, checkinStatus, currentLocation, toDate, fromDate, visible]),
  );



  const getStatus = async () => {
    let value = {
      userId: userInfos?.id
    }
    const encriptedString = encryptParams(value)
    const response: any = await dispatch(checkinStatus(encriptedString))
    if (response?.payload.data) {
      setColor('CHECK OUT')
    } else {
      setColor('CHECK IN')
    }
  }
  const getChekinList = async () => {
    const location: { latitude: number, longitude: number } = await GetCurrentLocation();

    dispatch(getLocation(location))
    setLocation(location)
    let payload: any = {
      endDate: `${getTime.dateFormat(toDate)}T23:59:59.999Z`,
      startDate: `${getTime.dateFormat(fromDate)}T00:00:00.000Z`,
      userId: userInfos?.id
    }
    const encriptedString = encryptParams(payload)
    await dispatch(checkinList(encriptedString))
  }

  const tooltipHandler = () => {
    setState == undefined ? null : setState({
      first: false,
      second: true
    })
  }

  return (
    <ErrorBoundary screenName={'Checkin screen'}>

      <View style={tw`items-center bg-white flex-1`} >

        <DashboardHeader route={route} checkIns={CheckInsPermission} color={color} setState={setState} state={state} />
        <CheckInsModal visible={visible} setVisible={setVisible} setColor={setColor} />
        {isLoading ?
          <Loader
            top='0%'
            height='100%' />
          :
          <View style={tw`p-4 w-full`}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: fontPixel(18), color: '#000', fontFamily: 'NotoSans-Bold' }}>
                History
              </Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <CustomTooltip component={
                  <Pressable onPress={CheckInsPermission} style={{
                    width: 40,
                    alignItems: 'center',
                    height: 40,
                    justifyContent: 'center',
                  }}>
                    <LocationComponent />
                  </Pressable>
                }
                  setState={setState}
                  state={state.first}
                  title={"Click to checkIn and checkOut"}
                  buttonTitle={"Next"}
                  tooltipStyle={{ marginLeft: 10, }}
                  tooltipHandler={tooltipHandler}
                />
                <Pressable onPress={CheckInsPermission}
                  style={{
                    backgroundColor: '#4D4DD1',
                    paddingHorizontal: pixelSizeHorizontal(10),
                    paddingVertical: pixelSizeVertical(5),
                    borderRadius: 5
                  }}>
                  <Text style={{
                    color: '#FFFFFF',
                    fontFamily: 'NotoSans-Regular',
                    fontSize: fontPixel(16)
                  }}>{color}</Text>
                </Pressable>
              </View>
            </View>
            <View style={[tw`mt-1`, { flexDirection: 'row', justifyContent: 'space-between' }]}>
              <FromDateView heading="From" initialDate={fromDate} setDate={setFromDate} setState={setState}
                state={state.second} />
              <ToDateView heading="To" initialDate={toDate} setDate={setToDate} />
            </View>
            <HistoryCards setRefreshing={setRefreshing}
            getStatus={getStatus}
            getChekinList={getChekinList} refreshing={refreshing}/>
            <CheckingLocationModal visible={visibleLocation}
              setVisible={setVisibleLocation}
              screen={screen}
              location={location}
              statusVoid={getStatus}
            />

          </View>
        }
      </View>
    </ErrorBoundary>
  )
}

export default CheckIns;

