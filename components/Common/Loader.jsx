import React from 'react';
import {ActivityIndicator, View, StyleSheet, Modal} from "react-native";

const Loader = () => {
    return (
        <Modal visible={true} transparent={true}>
            <View style={styles.loader} pointerEvents={'none'}>
                <ActivityIndicator
                    animating={true}
                    color={'#D58B40'}
                    size={'large'}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
        backgroundColor: 'rgba(0,0,0,0.3)'
    }
})

export default Loader;
