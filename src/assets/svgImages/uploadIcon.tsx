import * as React from "react"
import { Svg, Path, G, Defs, ClipPath } from "react-native-svg";

const UploadIconComponent = () => (
  <Svg
    width={24}
    height={24}
    fill="none"
  >
    <G
      stroke="#9E9E9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#a)"
    >
      <Path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 9l5-5 5 5M12 4v12" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default UploadIconComponent
