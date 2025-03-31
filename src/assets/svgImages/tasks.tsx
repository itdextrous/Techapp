import * as React from "react";
import { Svg, Path } from "react-native-svg";

type SvgProps = {
  color: string;
};

const TasksComponent: React.FC<SvgProps> = ({ color })=>(
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
      d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13 3h-2a2 2 0 1 0 0 4h2a2 2 0 1 0 0-4ZM9 12h.01M13 12h2M9 16h.01M13 16h2"
    />
  </Svg>
);

export default TasksComponent;
