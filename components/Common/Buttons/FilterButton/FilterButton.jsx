import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const FilterButton = ({color, onPress}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <AntDesign name="filter" size={30} color={color} />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        marginRight: 20
    },
})

export default FilterButton;
