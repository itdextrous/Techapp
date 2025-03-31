
import { fontPixel, pixelSizeVertical } from '@utils/helpers/customStyles';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  Pressable,
} from 'react-native';
import tw from 'twrnc';
import CustomButton from '@components/common/Button';
import InputText from '@components/common/InputText';
import ClockIconComponent from '@assets/svgImages/clockIcon';
import timeHours from '@utils/data/timeHoursData';
import styles from './styles';
import getTime from '@utils/helpers/datetime';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { editTasks, saveTaskEstimateTime, saveTaskTime } from '@redux/taskEditSlice';
import { ISaveRequest } from '@interfaces/editTasks';

type SetTimeModal = {
  options: any;
  setOptions: (value: any) => void;
  openModal: string,
  setTime: any,
  taskId: number | undefined,
  userId: number | null,
  taskHandler: () => void
};

const SetTimeModal: React.FC<SetTimeModal> = ({
  options,
  setOptions,
  openModal,
  setTime,
  taskId,
  userId,
  taskHandler
}) => {
  const [updatedHours, setUpdatedHours] = useState<number>(0)
  const [updatedMinutes, setUpdatedMinutes] = useState<number>(0)
  const [updatedDays, setUpdatedDays] = useState<number>(0)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setUpdatedHours(0);
    setUpdatedMinutes(0)
    setUpdatedDays(0)
  }, [options.estimate, options.timeSpent])

  const updateHandler = (items: any) => {
    if (items.title == 'hour') {
      setUpdatedHours((prevHours: any) => {
        const newHours = Number(prevHours) + Number(items.value);
        if (newHours >= 24) {
          // Increment days if hours exceed or equal 24
          setUpdatedDays((prevDays: any) => Number(prevDays) + Math.floor(newHours / 24));
          return newHours % 24; // Return the remainder hours
        } else {
          return newHours;
        }
      });
    } else {
      setUpdatedMinutes((prevMinutes: any) => {
        const newMinutes = Number(prevMinutes) + Number(items.value);
        if (newMinutes >= 60) {
          // Increment hours if minutes exceed or equal 60
          setUpdatedHours((prevHours: any) => {
            const newHours = Number(prevHours) + Math.floor(newMinutes / 60);
            if (newHours >= 24) {
              // Increment days if hours exceed or equal 24
              setUpdatedDays((prevDays: any) => Number(prevDays) + Math.floor(newHours / 24));
              return newHours % 24; // Return the remainder hours
            } else {
              return newHours;
            }
          });
          return newMinutes % 60; // Return the remainder minutes
        } else {
          return newMinutes;
        }
      });
    }
  };
  const closeHandler = () => {
    setOptions(
      openModal == 'estimate' ?
        { estimate: false } :
        openModal == 'timeSpent' ?
          { timeSpent: false } :
          { notes: false })
  }
  const saveHandler = async () => {
    // Example usage
    const durationString = `${updatedDays}d ${updatedHours}h ${updatedMinutes}min`;
    const totalMinutes = getTime.convertDurationToMinutes(durationString);
    let payload = {
      taskId: taskId,
      userId: userId
    }
    if (openModal == 'timeSpent') {
      const timePayload: ISaveRequest | any = {
        ...payload,
        timeWorkedInMinutes: totalMinutes,
      }
      const response = await dispatch(saveTaskTime(timePayload))
      if (response) {
        taskHandler()
      }
    } else {
      const estimatePayload: ISaveRequest | any = {
        ...payload,
        timeEstimateInMinutes: totalMinutes,
      }
      const editEstimate = {
        estimatedTimeInMinutes: totalMinutes,
        inlineTarget: "estimatedTimeInMinutes",
        isInline: true,
        taskId: taskId
      }
      dispatch(saveTaskEstimateTime(estimatePayload))
      const response = await dispatch(editTasks(editEstimate))
      if (response) {
        taskHandler()
      }
    }
    setOptions(
      openModal == 'estimate' ?
        { estimate: false } :
        openModal == 'timeSpent' ?
          { timeSpent: false } :
          { notes: false })
    setTime((prevState: any) => ({
      ...prevState,
      ...(
        openModal == 'estimate' ?
          {
            estimate: updatedDays > 0 ? `${updatedDays}d ${updatedHours}h ${updatedMinutes}min`
              : `${updatedHours}h ${updatedMinutes}min`
          } :
          {
            timeSpent: updatedDays > 0 ? `${updatedDays}d ${updatedHours}h ${updatedMinutes}min`
              : `${updatedHours}h ${updatedMinutes}min`
          }
      )
    }))
  }
  return (
    <Modal
      transparent={true}
      visible={openModal == 'estimate' ?
        options.estimate :
        openModal == 'timeSpent' ? options.timeSpent
          : null}
      onRequestClose={closeHandler}>
      <TouchableWithoutFeedback
        onPress={() => setOptions(
          openModal == 'estimate' ?
            { estimate: false } :
            { timeSpent: false })}>
        <View
          style={tw`flex-1 justify-center items-center bg-opacity-50 bg-black`}>
          <TouchableWithoutFeedback>
            <View
              style={tw`w-80 bg-white items-center shadow-lg rounded-lg`}>
              <View
                style={tw`w-full bg-white py-2 rounded-lg`}>
                <View style={{ paddingBottom: pixelSizeVertical(15) }}>
                  <View>

                    <View style={{
                    }}>
                      <View style={{
                        paddingHorizontal: 10

                      }}>
                        <InputText
                          placeholder='6h 45m'
                          image={<ClockIconComponent />}
                          inputWrapper={{ borderColor: '#d6e0f3', paddingLeft: 5 }}
                          placeholderColor="#bbbecc"
                          value={updatedDays > 0 ? `${updatedDays}d` : `${updatedHours}h ${updatedMinutes}min`}
                        />
                      </View>
                      <View style={styles.timeWrapper}>
                        {timeHours.map((items, index) => {
                          return (
                            <Pressable
                              key={index}
                              style={styles.timings}
                              onPress={() => updateHandler(items)}>
                              <Text style={{
                                fontSize: fontPixel(17),
                                fontFamily:'NotoSans-Regular',
                                color: '#8686f2'
                              }}>{items.title == 'hour' ?
                                items.hour
                                : items.minutes}</Text>
                            </Pressable>
                          )
                        })}
                        
                          <CustomButton title='Save' mode={'outlined'}
                        onPress={() => {
                          closeHandler()
                          saveHandler()
                        }}
                            customButtom={styles.timeSave}
                            buttonTitle={styles.timeTitle}
                          />
                        
                      </View>
                    </View>

                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SetTimeModal;
