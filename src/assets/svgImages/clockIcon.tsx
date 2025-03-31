import * as React from "react"
import { Svg, Path, G, Defs, ClipPath } from "react-native-svg";

const ClockIconComponent = () => (
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
      <Path d="M2.5 10a7.5 7.5 0 1 0 15 0 7.5 7.5 0 0 0-15 0ZM10 10h2.917M10 5.833V10" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ClockIconComponent
