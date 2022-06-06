import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";

const CloseButton = ({color, onPress}) => {
    return (
            <View style={styles.container}>
                <TouchableOpacity onPress={onPress}>
                    <AntDesign name="close" size={36} color={color} />
                </TouchableOpacity>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
})

export default CloseButton;
