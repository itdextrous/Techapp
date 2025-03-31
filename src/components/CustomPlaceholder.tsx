import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '@utils/helpers/customStyles';
import React from 'react';
import {  View, StyleSheet } from 'react-native';
import InputText from './common/InputText';
import { Appbar } from 'react-native-paper';

const MyComponent = ({setSearchFilter,searchFilter}:any) => {

  return (
    <View>
      <InputText
      image={<Appbar.Action icon="magnify" color='#d6e0f3'
         style={{width:20, height:20, marginHorizontal:0,}}/>}
        placeholderColor="#BFC0CB"
        placeholder="Search"
        onChangeText={(text) => setSearchFilter(text)}
        value={searchFilter}
        inputWrapper={styles.placeholderWrapper}
        textInput={styles.inputSearchStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderWrapper:{
    color:'black', 
    paddingLeft: pixelSizeHorizontal(5),
     marginTop:pixelSizeVertical(6),
     marginBottom:pixelSizeVertical(6),
    borderWidth:1,
    borderColor: "#E9EDF4",
    borderRadius:5,
    height:heightPixel(45), 
    paddingVertical:0,
  },
  inputSearchStyle:{
    borderRadius:5, 
    height:heightPixel(40),
    paddingVertical:0, 
    fontSize:fontPixel(17),
    color:'#575962'
  }
});

export default MyComponent;
