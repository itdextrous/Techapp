import { View } from "react-native";
import Labels from "./Labels";
import { useEffect, useState } from "react";
import { ILabel, IStateValues, ITaskEdit } from "@interfaces/editTasks";
import { heightPixel, pixelSizeHorizontal, widthPixel } from "@utils/helpers/customStyles";
import styles from "./styles";
import CustomLabels from "./CustomLabels";
import Toast from "react-native-toast-message";
import { editTasks } from "@redux/taskEditSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";

type LabelsView = {
    task: ITaskEdit | undefined | null
    selected: boolean
    setSelected: (cur: boolean) => void
}
const LabelsView: React.FC<LabelsView> = ({ task, selected, setSelected }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [checked, setChecked] = useState<ILabel[]>([])

    const taskLabelsArray = task?.tasks?.taskLabels ? task.tasks.taskLabels.split(",") || [] : [];
    // Filter and map the inlineLists.label for each label id
    const labelText: any[] = taskLabelsArray.length !== 0 ? taskLabelsArray?.map((labelId: string) => {
        return task?.statusPriorityList?.label?.filter((item: ILabel) => item.id.toString() == labelId.trim())?.map((item: ILabel) => item.text);
    }) : [];
    const labelColor: any[] = taskLabelsArray?.map((labelId: string) => {
        return task?.statusPriorityList?.label.filter((item: ILabel) => item.id.toString() == labelId.trim())?.map((item: ILabel) => item.bgColor);
    });
    const [value, setValue] = useState<IStateValues>({
        status: "0 status",
        priority: undefined,
        labels: undefined,
        admin: undefined,
        assignee: undefined
    });
    const [color, setColor] = useState<IStateValues>({
        status: undefined,
        priority: undefined,
        labels: undefined,
        admin: undefined,
        assignee: '#FFF'
    });
    useEffect(() => {
        if (task) {
            setValue(prev => ({
                ...prev,
                status: task?.tasks?.statusName,
                priority: task?.tasks?.priorityName,
                labels: labelText.length == 0 ? '' : labelText[0][0],
                admin: labelText.length > 1 ? labelText[1][0] || '' : '',
                assignee: task?.tasks?.taskListAssignees[0]
            }));
            setColor(prev => ({
                ...prev,
                status: task?.tasks?.statusColour,
                priority: task?.tasks?.priorityColour,
                labels: labelColor.length == 0 ? '' : labelColor[0][0],
                admin: labelColor.length > 1 ? labelColor[1][0] || '' : '',
            }));
            const allLables = task?.statusPriorityList?.label || []; // Ensure allLables is an array even if undefined
            const nestedArray = labelText;
            const label = nestedArray.flatMap(innerArray => innerArray);
            const newLabels = allLables.map((item: ILabel) => {
                if (label.includes(item.text)) {
                    return { ...item, selected: true };
                }
                return { ...item, selected: false }; // Ensure you return the original item if not matched
            });

            setChecked(newLabels);
        }
    }, [task]);

    const changeHandler = (fieldName: string, value: any) => {
        fieldName = fieldName.includes("assignee") ? 'assignee':fieldName;
        setValue((prev: IStateValues) => ({
            ...prev,
            [fieldName]: value
        }))
    }

    const colorHandler = (fieldName: string, value: any) => {
        fieldName = fieldName.includes("priority") ? 'priority':fieldName;
        fieldName = fieldName.includes("status") ? 'status':fieldName;
        setColor((prev: IStateValues) => ({
            ...prev,
            [fieldName]: value
        }))
    }

    const handleCheck = (item: ILabel, indexes: number) => {

        // Count the number of selected items
        const selectedCount = checked.filter((checkedItem: ILabel) => checkedItem.selected).length;

        // If there are already 2 selected items and the user tries to select another, show an error message
        if (selectedCount >= 5 && !checked[indexes].selected) {
            Toast.show({
                type: 'customToast',
                text2: 'Maximum upto five labels can be selected',
                position: 'bottom',
                props: {
                    width: widthPixel(350),
                    backgroundColor: '#323232',
                },
            });
            return; // Prevent further execution
        }
        // Filter the checked array based on the indexes
        const newCheckedItems = checked.map((checkedItem: ILabel, index: number) => {

            if (index === indexes) {
                // Toggle the `selected` property for the specific item
                return { ...checkedItem, selected: !checkedItem.selected };
            }
            return checkedItem; // Return unchanged item for other indices
        });

        const payload = {
            taskId: task?.tasks?.taskId,
            isInline: true,
            inlineTarget: "taskLabels",
            taskLabels: newCheckedItems
                .filter((checkedItem: ILabel) => checkedItem.selected)
                .map((checkedItem: ILabel) => checkedItem.id)
                .join(',')
        }
        dispatch(editTasks(payload))

        // Update the state with all items in newCheckedItems
        setChecked(newCheckedItems);
        // setSelected(!selected)
    };
    return (
        <View style={styles.labelWrapper}>

            <CustomLabels
                selected={selected}
                setSelected={setSelected}
                checked={checked}
                handleCheck={handleCheck}
            />
            <Labels
                label={'Priority'}
                data={task?.statusPriorityList?.priority}
                value={value.priority}
                setValue={changeHandler}
                placeholder={'0 priority'}
                color={color.priority}
                setColor={colorHandler}
                dropdown={{
                    width: widthPixel(140),
                     height: heightPixel(37), borderWidth:
                        !task ? 1 : 0
                }}
                taskId={task?.tasks?.taskId}
                textColor='white'
            />

            <Labels
                label={'Status'}
                data={task?.statusPriorityList?.status}
                value={value.status}
                setValue={changeHandler}
                placeholder={'0 status'}
                color={color.status}
                setColor={colorHandler}
                dropdown={{
                    marginLeft:pixelSizeHorizontal(-4),
                    width: widthPixel(140), height: heightPixel(37), borderWidth:
                        !task ? 1 : 0
                }}
                taskId={task?.tasks?.taskId}
                textColor="white"
            />

            <Labels
                label={'Assignee'}
                data={task?.statusPriorityList?.members}
                value={value.assignee}
                setValue={changeHandler}
                placeholder={'0 assignee'}
                color={color.assignee}
                setColor={colorHandler}
                dropdown={{ maxWidth: widthPixel(180), paddingLeft: 0, paddingRight: 30, }}
                defaultProfileImage={task?.tasks?.taskListAssignees[0]?.profileImageUrl}
                taskId={task?.tasks?.taskId}
                textColor="rgba(23, 28, 48, 1)"
            />
        </View>
    )
}

export default LabelsView;