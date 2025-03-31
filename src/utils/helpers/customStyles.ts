import {
    Dimensions,
    PixelRatio,
    Platform,
} from "react-native";


// default device height and width
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
export const FullHeight = () => {
    return SCREEN_HEIGHT;
}
const widthBaseScale = SCREEN_WIDTH / 414;
const heightBaseScale = SCREEN_HEIGHT / 896;

/**
 * Dynamic sizes
 * @param size 
 * @param based = width
 */
function normalize(size: number, based = "width") {
    const newSize =
        based === "height" ? size * heightBaseScale : size * widthBaseScale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) + 2
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }
}

// for full screen height
const screenHeight = () => {
    return Dimensions.get('window').height;
}
//for width  pixel
const widthPixel = (size: number) => {
    return normalize(size, 'width');
};
//for height  pixel
const heightPixel = (size: number) => {
    return normalize(size, 'height');
};
//for font  pixel
const fontPixel = (size: number) => {
    return Platform.OS =='android' ? heightPixel(size):heightPixel(size - 2);
};
//for Margin and Padding vertical pixel
const pixelSizeVertical = (size: number) => {
    return heightPixel(size);
};
//for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size: number) => {
    return widthPixel(size);
};

const ios = {
    paddingTop:pixelSizeVertical(50)
}

const colors = {
    grey:'#A0A7B7',
    darkGrey:'rgba(54,52,53, 1)',
    theme:"#6767E6"
}
export {
    widthPixel,
    heightPixel,
    screenHeight,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
    ios,
    colors
};
