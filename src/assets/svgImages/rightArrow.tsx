import * as React from "react"
import { Svg, Path, G, Defs, ClipPath } from "react-native-svg";

type SvgProps = {
    color?: string;
  };
const RightArrowComponent: React.FC<SvgProps> = ({ color }) => (
  <Svg
    width={30}
    height={30}
    fill="none"
    viewBox="0 3 20 10"
  >
    <G clipPath="url(#a)" opacity={0.8}>
      <Path
        stroke="#334151"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9 18 6-6-6-6"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M24 24H0V0h24z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default RightArrowComponent
