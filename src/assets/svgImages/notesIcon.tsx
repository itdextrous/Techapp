import * as React from "react"
import { Svg, Path, G, Defs, ClipPath } from "react-native-svg";

const NotesIconComponent = () => (
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
      <Path d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5ZM9 7h6M9 11h6M9 15h4" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default NotesIconComponent
