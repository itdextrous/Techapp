import * as React from "react"
import { Svg, Path, G, Defs, ClipPath } from "react-native-svg";

const LogoutComponent = () => (
  <Svg
    width={24}
    height={24}
    fill="none"
  >
    <G
      stroke="#909CBA"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#a)"
    >
      <Path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
      <Path d="M9 12h12l-3-3M18 15l3-3" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default LogoutComponent
