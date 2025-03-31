import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet, Dimensions, Image } from "react-native";
import { IFilterLabels } from "@interfaces/editTasks";
import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from "@utils/helpers/customStyles";

const CustomDropdown = ({ labelList, taskList, customLabelList }: any) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<TouchableOpacity | null>(null);

    const openDropdown = () => {
        if (buttonRef.current) {
            buttonRef.current.measureInWindow((x, y, width) => {
                setDropdownPosition({ top: y + 30, left: x }); // Adjusted for better positioning
                setIsDropdownOpen(true);
            });
        }
    };

    let labels: any = [];
    if (customLabelList) {
        labels = customLabelList?.filter((cur: any) => cur.selected);
    } else {
        labels = labelList?.filter((cur: IFilterLabels) => taskList.includes(cur.labelId.toString()));
    }
    return (
        <View >
            {/* Dropdown Trigger */}
            <TouchableOpacity
                ref={buttonRef}
                style={styles.dropdownButton}
                onPress={openDropdown}
            >
                <Image source={require('@assets/images/Vector.png')}
                    resizeMode="contain"
                    style={{
                        width: widthPixel(30),
                        height: heightPixel(30)
                    }} />

            </TouchableOpacity>

            {/* Dropdown Modal */}
            {isDropdownOpen && (
                <Modal transparent animationType="none">
                    <TouchableOpacity
                        style={styles.overlay}
                        activeOpacity={1}
                        onPress={() => setIsDropdownOpen(false)}
                    />

                    <View style={[styles.dropdownContainer, { top: dropdownPosition.top, left: dropdownPosition.left - 50 }]}>
                        {/* Close Button */}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsDropdownOpen(false)}
                        >
                            {/* <Icons.FontAwesome name="times" size={20} color="black" /> */}
                            <Image source={require('@assets/images/close.png')}
                                resizeMode="contain"
                                style={{
                                    width: widthPixel(15),
                                    height: heightPixel(15)
                                }} />
                        </TouchableOpacity>

                        {/* Dropdown List */}
                        <FlatList
                            data={labels}
                            keyExtractor={(item) => item?.labelId?.toString() || item?.id?.toString()}
                            renderItem={({ item }) => (
                                <View style={[styles.item, { backgroundColor: item?.labelColor || item?.bgColor }]}>
                                    <Text style={styles.itemText}>
                                        {(item?.labelName || item?.text)?.length > 15
                                            ? `${(item?.labelName || item?.text).substring(0, 15)}...`
                                            : item?.labelName || item?.text}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: heightPixel(25),
        borderColor: "#ccc",
        borderRadius: 8,
        width: widthPixel(40),
        backgroundColor: "#fff",
    },
    buttonText: {
        color: "#000",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark background when dropdown is open
    },
    dropdownContainer: {
        position: "absolute",
        width: widthPixel(180),
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        elevation: 5,
    },
    closeButton: {
        alignSelf: 'flex-end',
        right: 5,
        zIndex: 10,
        paddingHorizontal: pixelSizeHorizontal(5),
        paddingBottom: pixelSizeVertical(10),
    },
    item: {
        paddingHorizontal: pixelSizeHorizontal(10),
        paddingVertical: pixelSizeVertical(9),
        borderRadius: 8,
        marginVertical: pixelSizeVertical(4),
        alignItems: "center",
    },
    itemText: {
        color: "white",
        fontWeight: "bold",
        fontSize:fontPixel(16)
    },
});

export default CustomDropdown;
