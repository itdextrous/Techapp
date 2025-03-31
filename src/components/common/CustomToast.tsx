// CustomToast.js
import CorrectIcon from '@assets/svgImages/correctIcon';
import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '@utils/helpers/customStyles';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';

const CustomToast = ({ text1, text2, props,autoHide, visibilityTime , ...rest}: any) => {
  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        Toast.hide();
      }, visibilityTime || 4000); // Default 4 seconds if not provided
      return () => clearTimeout(timer);
    }
  }, [autoHide, visibilityTime]);
  const { width, backgroundColor, marginTop, textAlign,color,fontFamily,fontSize } = props
  return (
    <BaseToast
      {...rest}
      style={[styles.toast, props]}
      contentContainerStyle={[styles.contentContainer, { backgroundColor: backgroundColor }]}
      text1Style={styles.text1}
      text2Style={[styles.text2, { textAlign: textAlign , color:color?color:'#FFFFFF', 
        fontFamily:fontFamily, fontSize:fontSize}]}
      text1={text1}
      text2={text2}
      renderLeadingIcon={() => {
        
        return (
          text2 == 'changes saved' &&
          <View style={{justifyContent:'center', marginLeft:pixelSizeHorizontal(15)}}>
          <CorrectIcon />
          </View>
      
        )
      }}
    />
  )
};

const styles = StyleSheet.create({
  toast: {
    bottom: pixelSizeVertical(60),
    borderRadius: 5,
    borderLeftWidth: 0,
    height: heightPixel(50),
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: pixelSizeHorizontal(15),
    height: heightPixel(48),
    backgroundColor: 'red',
  },
  text1: {
    fontSize: fontPixel(17),
    fontWeight: '400',
  },
  text2: {
    fontSize: fontPixel(15),
    color: '#FFFFFF',
    // textAlign:'center'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomToast;
