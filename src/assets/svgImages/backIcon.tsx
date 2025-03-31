import * as React from "react"
import { Svg, Path, G, Defs, ClipPath } from "react-native-svg";

type BackIconComponent={
  color?:string
}
const BackIconComponent:React.FC<BackIconComponent> = ({color}) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="4 2 18 18"
  >
    <G clipPath="url(#a)">
      <Path
        stroke={color?color:'#334151'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m15 6-6 6 6 6"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default BackIconComponent
