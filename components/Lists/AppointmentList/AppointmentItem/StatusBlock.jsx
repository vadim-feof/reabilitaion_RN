import React from 'react';
import {Text, StyleSheet, View} from "react-native";

const StatusBlock = ({statusText}) => {

    let statusStyles
    switch (statusText) {
        case 'process':
            statusStyles = styles.processStyle
            break
        case 'viewed':
            statusStyles = styles.viewedStyle
            break
        case 'cancelled':
            statusStyles = styles.cancelledStyle
            break
    }

    return (
        <View
            style={[styles.statusBlock, statusStyles]}
        />
    );
};

const styles = StyleSheet.create({
    statusBlock: {
        width: 15,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: 'gray'
    },
    processStyle: {
        backgroundColor: '#D9D9D9'
    },
    viewedStyle: {
        backgroundColor: '#58AC24'
    },
    cancelledStyle: {
        backgroundColor: '#ff4747'
    }
})

export default StatusBlock;