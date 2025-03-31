import * as React from "react"
import { Svg, Path, G, Defs, ClipPath } from "react-native-svg";

type RightAttachmentArrowComponent = {
    color?: string;
  };
const RightAttachmentArrowComponent: React.FC<RightAttachmentArrowComponent> = ({ color }) =>(
  <Svg
    width={24}
    height={24}
    fill="none"
     viewBox="0 1 32 10"
  >
    <Path
      stroke="#9E9E9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 5v14l10-7L7 5Z"
    />
  </Svg>
)
export default RightAttachmentArrowComponent
