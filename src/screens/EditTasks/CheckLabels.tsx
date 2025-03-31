import { Checkbox } from "react-native-paper";

type CheckLables = {
    checked:boolean | undefined,
    onPress:()=>void
}
const CheckLabels:React.FC<CheckLables> = ({checked, onPress})=>{
    return(
        <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={onPress}
        />
    )
}

export default CheckLabels;