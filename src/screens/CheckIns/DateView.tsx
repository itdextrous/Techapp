import CalenderComponent from "@assets/svgImages/calender";
import { useCallback, useState } from "react";
import { Image, Pressable, StyleProp, Text, View,Modal, TouchableOpacity, Platform  } from "react-native"
import styles from "./styles";
import CustomTooltip from "@components/CustomTooltip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from 'react-native-modern-datepicker';
import moment from 'moment';
import { heightPixel, pixelSizeVertical, widthPixel } from "@utils/helpers/customStyles";

type FromDateView = {
    heading: string
    setDate: (item: Date) => void,
    initialDate: any,
    state:any,
    setState:any
}
const pickerStyle: StyleProp<any> = {
    width: widthPixel(300),
    height:heightPixel(300),
  borderRadius: 5,
  elevation: 5,
  };
export const FromDateView: React.FC<FromDateView> = ({ heading, setDate, initialDate,state,setState }) => {
    const [open, setOpen] = useState<boolean>(false);
    const onConfirmSingle = 
        ( date: any) => {
          const dates:any = moment.utc(date, "YYYY/MM/DD");
            const dateObject = new Date(dates);
            setDate(dateObject); // Update internal state
            setOpen(false);
        }
        
    const onDismiss = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const tooltipHandler = ()=>{
        setState == undefined ? null : setState({
          first: false,
          second: false
      })
      AsyncStorage.setItem('tooltip', 'false')
    }

    return (
        <View style={styles.dateContainer}>
            <View>
                <Text style={styles.dateHeading}>{heading}</Text>
                <View style={styles.dateWrapper}>
                    <View style={styles.date}>
                        <Text style={styles.dateText}>{initialDate.toLocaleDateString('en-GB')}</Text>
                    </View>
                    <CustomTooltip component={
                      <Pressable onPress={() => setOpen(true)}>
                      <CalenderComponent />
                  </Pressable>
                    }
                        setState={setState}
                        state={state}
                        title={"Click to Select date"}
                        buttonTitle={"Finish"}
                        tooltipHandler={tooltipHandler}
                    />
                </View>
            </View>



            {/* Modal to display DatePicker */}
      {open && (
        <Modal
          transparent={true}
        //   animationType="slide"
          visible={open}
          onRequestClose={onDismiss}
        >
          <Pressable
          onPress={onDismiss}
            style={{
              flex: 1,
            //   justifyContent: 'center',
            marginTop:pixelSizeVertical(220),
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0)', // Dim background when modal is open
            }}
          >
            <View style={{ backgroundColor: '#fff', 
                 borderRadius: 10, 
                 marginTop: Platform.OS == 'android'?undefined: pixelSizeVertical(30) }}>
              <DatePicker
                mode="calendar"
                onDateChange={onConfirmSingle}
                current={moment(initialDate).format('YYYY-MM-DD')}
                selected={moment(initialDate).format('YYYY-MM-DD')} // Set default date to today
                style={pickerStyle}
                options={{
                  backgroundColor: '#FFFFFF',
                  textHeaderColor: 'rgba(0, 0, 0, 0.87)',
                  textDefaultColor: 'rgba(0, 0, 0, 0.87)',
                  selectedTextColor: '#FFFFFF',
                  mainColor: '#8585f2',
                  textSecondaryColor: 'rgba(0, 0, 0, 0.6)',
                  borderColor: 'rgba(122, 146, 165, 0.1)',
                  
                }}
              />
            </View>
          </Pressable>
        </Modal>
      )}
        </View>
    )
}


type ToDateView = {
    heading: string
    setDate: (item: Date) => void,
    initialDate: Date
}

export const ToDateView: React.FC<ToDateView> = ({ heading, setDate, initialDate }) => {
    const [open, setOpen] = useState<boolean>(false);
    const onDismiss = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = 
    ( date: any) => {
        const dates:any = moment(date, "YYYY/MM/DD");
        const dateObject = new Date(dates);
        setDate(dateObject); // Update internal state
        setOpen(false);
    }

    return (
        <View style={styles.dateContainer}>
            <View>
                <Text style={styles.dateHeading}>{heading}</Text>
                <View style={styles.dateWrapper}>
                    <View style={styles.date}>
                        <Text style={styles.dateText}>{initialDate.toLocaleDateString('en-GB')}</Text>
                    </View>
                    <Pressable onPress={() => setOpen(true)}>
                        <CalenderComponent />
                    </Pressable>
                </View>
            </View>
{open && (
        <Modal
          transparent={true}
        //   animationType="slide"
          visible={open}
          onRequestClose={onDismiss}
        >
          <Pressable
          onPress={onDismiss}
            style={{
              flex: 1,
            //   justifyContent: 'center',
            marginTop:pixelSizeVertical(220),
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0)', // Dim background when modal is open
            }}
          >
            <View style={{ backgroundColor: '#fff', 
                 borderRadius: 10,
                 marginTop: Platform.OS == 'android'?undefined: pixelSizeVertical(30)  }}>
              <DatePicker
                mode="calendar"
                onDateChange={onConfirmSingle}
                current={moment(initialDate).format('YYYY-MM-DD')}
                selected={moment(initialDate).format('YYYY-MM-DD')} // Set default date to today
                style={pickerStyle}
                options={{
                  backgroundColor: '#FFFFFF',
                  textHeaderColor: 'rgba(0, 0, 0, 0.87)',
                  textDefaultColor: 'rgba(0, 0, 0, 0.87)',
                  selectedTextColor: '#FFFFFF',
                  mainColor: '#8585f2',
                  textSecondaryColor: 'rgba(0, 0, 0, 0.6)',
                  borderColor: 'rgba(122, 146, 165, 0.1)',
                  
                }}
              />
            </View>
          </Pressable>
        </Modal>
      )}
        </View>
    )
}
