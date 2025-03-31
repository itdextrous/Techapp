import * as React from "react"
import { Svg, Path, G, Defs, ClipPath } from "react-native-svg";

type StarIconComponent={
  color?:string,
  strok?:string
}
const StarIconComponent:React.FC<StarIconComponent> = ({color,strok}) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    viewBox="1 2 17 10"
  >
    <G clipPath="url(#a)">
      <Path
        fill={color}
        stroke={strok?strok:"#475378"}
        strokeWidth={0.8}
        d="m8 11.833-4.115 2.164.786-4.582L1.338 6.17l4.6-.667 2.057-4.168 2.058 4.168 4.6.667-3.334 3.245.786 4.582L8 11.833Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default StarIconComponent
