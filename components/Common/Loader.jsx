import React from 'react';
import {ActivityIndicator, View, StyleSheet} from "react-native";

const Loader = () => {
    return (
        <View style={styles.loader} pointerEvents={'none'}>
            <ActivityIndicator
                animating={true}
                color={'#D58B40'}
                size={'large'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loader: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 5
    }
})

export default Loader;