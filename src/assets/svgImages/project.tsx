import * as React from "react"
import { Svg, Path } from "react-native-svg";

type SvgProps = {
    color: string;
  };
const ProjectComponent: React.FC<SvgProps> = ({ color }) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 13a8 8 0 0 1 7 7 6 6 0 0 0 3-5 9 9 0 0 0 6-8 3 3 0 0 0-3-3 9 9 0 0 0-8 6 6 6 0 0 0-5 3"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7 14a6 6 0 0 0-3 6 6 6 0 0 0 6-3M15 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
    />
  </Svg>
)
export default ProjectComponent
