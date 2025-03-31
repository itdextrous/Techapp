import * as React from "react"
import { Svg, Path, G, Defs, ClipPath } from "react-native-svg";

const LocationComponent = () => (
  <Svg
    width={24}
    height={24}
    fill="none"
  >
    <G clipPath="url(#a)">
      <Path
        fill="#2CA079"
        d="M17.657 16.657 13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0Z"
      />
      <Path fill="#fff" d="M9 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default LocationComponent
