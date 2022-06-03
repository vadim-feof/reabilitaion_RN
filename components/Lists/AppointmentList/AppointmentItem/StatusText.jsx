import React from 'react';
import {Text, StyleSheet} from "react-native";
import {getAppointmentStatus} from "../../../../utils/getAppointmentStatus";

const StatusText = ({textStyle, statusText}) => {

    let statusStyles = [textStyle]
    switch (statusText) {
        case 'process':
            statusStyles.push(styles.processStyle)
            break
        case 'viewed':
            statusStyles.push(styles.viewedStyle)
            break
        case 'cancelled':
            statusStyles.push(styles.cancelledStyle)
            break
    }

    return (
        <Text style={[statusStyles, {fontWeight: 'bold', marginLeft: 5}]}>
            {getAppointmentStatus(statusText)}
        </Text>
    );
};

const styles = StyleSheet.create({
    processStyle: {
        color: '#8c8c8c'
    },
    viewedStyle: {
        color: '#58AC24'
    },
    cancelledStyle: {
        color: '#ff4747'
    }
})

export default StatusText;