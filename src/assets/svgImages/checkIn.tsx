import * as React from "react"
import { Svg, Path, G, Defs, ClipPath } from "react-native-svg";

type SvgProps = {
    color?: string;
  };
const CheckInComponent: React.FC<SvgProps> = ({color}) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    // {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill={color}
        d="M20.891 2.006 20.997 2l.13.008.09.016.123.035.107.046.1.057.09.067.082.075.052.059.082.116.052.096c.047.1.077.206.09.316l.005.106c0 .075-.008.149-.024.22l-.035.123-6.532 18.077a1.551 1.551 0 0 1-2.738.156l-.065-.127-3.352-6.702-6.67-3.336a1.55 1.55 0 0 1-.898-1.259L1.68 10c0-.56.301-1.072.841-1.37l.14-.07 18.017-6.506.106-.03.107-.018Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default CheckInComponent
