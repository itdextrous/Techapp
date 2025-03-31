import * as React from "react"
import { Svg, Path, G, Defs, ClipPath } from "react-native-svg";

const TimeIconComponent = () => (
  <Svg
    width={20}
    height={20}
    fill="none"
  >
    <G
      stroke="#9E9E9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#a)"
    >
      <Path d="M5.417 5.833h9.166M5.417 14.167h9.166M5 16.667V15a5 5 0 1 1 10 0v1.667a.833.833 0 0 1-.833.833H5.833A.833.833 0 0 1 5 16.667Z" />
      <Path d="M5 3.333V5a5 5 0 1 0 10 0V3.333a.833.833 0 0 0-.833-.833H5.833A.833.833 0 0 0 5 3.333Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default TimeIconComponent
