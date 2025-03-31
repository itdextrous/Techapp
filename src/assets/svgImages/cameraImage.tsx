import * as React from "react"
import { Svg, Path, G, Defs, ClipPath } from "react-native-svg";

const CameraImageComponent = () => (
  <Svg
    width={25}
    height={24}
    fill="none"
  >
    <G
      stroke="#8585F2"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#a)"
    >
      <Path d="M5.5 7h1a2 2 0 0 0 2-2 1 1 0 0 1 1-1h6a1 1 0 0 1 1 1 2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
      <Path d="M9.5 13a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h24v24H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default CameraImageComponent
