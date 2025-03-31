import * as React from "react"
import { Svg, Path, G, Defs, Circle, ClipPath } from "react-native-svg";


const AddCircleIcon = () => (
    <Svg
        width={15}
        height={15}
        fill="none"
        viewBox="1 1 10 10"

    >
        <Path
            stroke="#9E9E9E"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.2}
            d="M6 1v10M1 6h10"
        />
    </Svg>
)
export default AddCircleIcon
