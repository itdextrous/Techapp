import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '@utils/helpers/customStyles';
import { Platform, StyleSheet } from 'react-native'
import tw from 'twrnc';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'white',
        paddingHorizontal: pixelSizeHorizontal(15),
        marginHorizontal: pixelSizeHorizontal(20),
        alignSelf: 'center',
        paddingVertical: pixelSizeVertical(12),
        borderRadius: 5,
        borderColor: '#EBEDF3',
        borderWidth: 1,
        width: widthPixel(310)
    },
    text: {
        lineHeight: 28,
        fontFamily:'NotoSans-Regular',
        fontSize: Platform.OS == 'android' ? fontPixel(17) : fontPixel(16)
    },
    customButtom: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#8585F2',
        width: widthPixel(100),
        height: heightPixel(40),
    },
    close: {
        width: widthPixel(300),
    },
    buttonTitle: {
        fontSize:fontPixel(16),
        alignSelf: 'center',
    },
    modalView: {
        marginTop: pixelSizeVertical(20),
        marginBottom: pixelSizeVertical(10),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    historyWrapper: {
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor: 'rgba(241, 242, 249, 0.25)', 
        borderRadius: 6,
        borderBottomColor: '#B7B7B7',
        paddingHorizontal: pixelSizeHorizontal(10), 
        paddingVertical: 6, 
        marginVertical: pixelSizeVertical(8), 
        borderBottomWidth: 1.5,
        paddingBottom:pixelSizeVertical(15)
    },
    historyContentWrapper:{
        width:'46%'
    },
    dateContainer: {
        marginTop: pixelSizeVertical(12),
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateHeading: {
        color: '#171C30',
        fontSize:fontPixel(16),
        fontFamily:'NotoSans-Medium'
    },
    date: {
        ...tw`pl-1 border w-30 mr-2 h-full justify-center`,
        borderColor: '#EBEDF3',
        borderRadius:5
    },
    dateText: {
        color: '#575952',
        fontSize: fontPixel(16),
        fontFamily:'NotoSans-Regular'
    },
    dateWrapper: {
        ...tw`w-41 h-9s items-center flex-row `,
    },
    cardDetails:{ 
        color: '#334151',
        fontSize: fontPixel(15) ,
        lineHeight:19,
        fontFamily:'NotoSans-Regular',
    }
})

export default styles;