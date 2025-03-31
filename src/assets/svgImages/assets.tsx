import * as React from "react"
import { Svg, Path, G, Defs, ClipPath } from "react-native-svg";

type SvgProps = {
    color: string;
  };
const AssetsComponent: React.FC<SvgProps> = ({ color }) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    viewBox="2 3 30 10"
  >
    <G
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#a)"
    >
      <Path d="M4 20a8 8 0 1 0 16 0 8 8 0 0 0-16 0Z" />
      <Path d="M9.334 20a2.667 2.667 0 1 0 5.333 0 2.667 2.667 0 0 0-5.333 0ZM22.666 6.667a2.667 2.667 0 1 0 5.334 0 2.667 2.667 0 0 0-5.334 0ZM18.957 23.967l8.826-16.232M8.105 13.008l16.29-8.841" />
      <Path d="M9.334 20a2.667 2.667 0 1 0 5.333 0 2.667 2.667 0 0 0-5.333 0Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default AssetsComponent
