import * as React from "react"
import { Svg, Path, G, Defs, ClipPath } from "react-native-svg";

const DownArrowIconComponent = () => (
  <Svg
    width={24}
    height={24}
    fill="none"
  >
    <G clipPath="url(#a)">
      <Path
        stroke="#9E9E9E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m6 10 6 6 6-6H6Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M24 24H0V0h24z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default DownArrowIconComponent
