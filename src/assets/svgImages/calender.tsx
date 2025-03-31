import * as React from "react"
import { Svg, Path, G, Defs, ClipPath } from "react-native-svg";


const CalenderComponent = () => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    // viewBox="3 1 22 20"
    viewBox="3 2 19 20"
  >
    <G
      stroke="#9E9E9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#a)"
    >
      <Path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7ZM16 3v4M8 3v4M4 11h16M11 15h1M12 15v3" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default CalenderComponent
