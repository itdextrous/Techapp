import { memo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { Avatar } from "react-native-paper";
import styles from "@screens/Task/styles";
import { Task } from "@interfaces/tasks";
import { fontPixel } from "@utils/helpers/customStyles";
import tw from 'twrnc';
import Loader from "@components/common/Loader";
import CustomDropdown from "./CustomDropdown";

type ItemProps = {
    item: Task;
    onPress: () => void;
};

type ITasks = {
    allProjects: Task[] | undefined,
    onPress: (item: Task) => void;
    serchLoadings: boolean
}

const Item = memo(({ item, onPress }: ItemProps) => {
    const taskLabelsArray = item?.taskLabels?.split(',').map((label: string) => label.trim()) || [];
    return (
        <TouchableOpacity onPress={onPress} style={styles.projectContainer}>
            <View style={[styles.customSideColor, { backgroundColor: item.priorityColour }]} />
            <View style={styles.card}>
                <View style={{ width: '80%', }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.projectName}>{item.taskCode}</Text>
                        {item?.inlineLists == undefined ?
                            <View style={[styles.rattings, { backgroundColor: item.statusColour }]}>
                                <Text style={styles.rattingText} >
                                    {item.statusName}
                                </Text>
                            </View>
                            :
                            item?.inlineLists
                                .filter((cur: any) => taskLabelsArray?.includes(cur.labelId.toString()))
                                .slice(0, 2)?.map((cur: any, index: number) => {
                                    return (
                                        <View key={index} style={[styles.rattings, { backgroundColor: cur.labelColor }]}>
                                            <Text style={styles.rattingText} >
                                                {cur?.labelName?.length > 6 ? `${cur?.labelName?.substring(0, 6)}...` : cur?.labelName}
                                            </Text>
                                        </View>
                                    );
                                })

                        }
                        {taskLabelsArray.length > 2 &&
                            <View style={{}}>
                                <CustomDropdown
                                    labelList={item?.inlineLists}
                                    taskList={taskLabelsArray}
                                />
                            </View>
                        }


                    </View>
                    <View style={styles.name}>
                        <Text style={styles.value}>
                            {item.taskTitle?.length > 30 ? `${item.taskTitle.substring(0, 30)}...` : item.taskTitle}</Text>
                    </View>
                </View>
                {item?.profileImageUrl ?
                    <Avatar.Image size={40} source={{ uri: item.profileImageUrl }}
                        style={{ backgroundColor: 'white' }} />
                    :
                    <View style={[
                        tw`border rounded-full justify-center items-center w-10 h-10`, {
                            borderColor: 'rgba(214,224,243, 1)',
                            alignItems: 'center',
                        }]}>
                        <Text style={{
                            fontSize: fontPixel(22)
                        }}>{item?.taskListAssignees?.length === 0 ? 'U' : item.userName?.substring(0, 1) || ''}</Text>
                    </View>
                }
            </View>

        </TouchableOpacity>
    );
})


const Tasks: React.FC<ITasks> = ({ allProjects, onPress, serchLoadings }) => {

    const renderItem = ({ item, index }: { item: Task, index: number }) => {
        return (
            <Item
                item={item}
                onPress={() => onPress(item)}
            />
        )
    };
    return (
        <View style={styles.tasksWrapper}>
            {serchLoadings && <Loader background='white' />}
            {allProjects?.length == 0 &&
                <Text style={{ textAlign: 'center' }}>No Tasks</Text>
            }
            <FlatList
                data={allProjects}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
                initialNumToRender={10}
                maxToRenderPerBatch={5}
                windowSize={10}
            />
        </View>
    )
}

export default Tasks;