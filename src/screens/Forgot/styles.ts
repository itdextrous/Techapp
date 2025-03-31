import { fontPixel, heightPixel, pixelSizeVertical } from '@utils/helpers/customStyles';
import { Platform, StyleSheet } from 'react-native'
import tw from 'twrnc';

const styles = StyleSheet.create({
  container: {
    ...tw`flex-1`,
  },
  wrapper: {
    ...tw
      `bg-white rounded-lg self-center w-80 py-10 px-5 flex flex-col items-center justify-center`
  },

  formWrapper: {
    ...tw`flex flex-1 justify-center`
  },
  forgotButton: {
    ...tw`w-40 justify-start ml--4 pl-0 mt-2`
  },
  signIn: {
    ...tw
      ` w-full bg-indigo-400 rounded-md mt-4`,
    height: heightPixel(42)
  },
  buttonText: {
    ...tw`text-white`,
  },
  error: {
    ...tw`text-red-500 self-start`,
  },
  buttonWrapper: {
    ...tw` w-65 border-indigo-400 rounded-md  my-5 `,
    borderWidth: 1,
    height: Platform.OS == 'android' ? undefined : heightPixel(45)
  },
  textWrapper: {
    ...tw`flex-row justify-between items-center w-65 `,
  },
  heading: {
    ...tw`text-xl`,
    fontFamily: 'NotoSans-SemiBold',
    textAlign: 'center',
    color: 'rgba(49, 60, 100, 1)'
  },
  title: {
    fontSize: fontPixel(15),
    color: '#000',
    textAlign: 'center',
    marginVertical: pixelSizeVertical(10),
    fontFamily: 'NotoSans-Regular',
  },
  horizonalLine: {
    ...tw`w-14 h-px`,
    backgroundColor: '#b4c1dc'
  },
  images: {
    ...tw`w-5 h-5 ml-2`,
  },
})

export default styles;