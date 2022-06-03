import React from 'react';
import {View, TouchableHighlight, Text, StyleSheet} from "react-native";
import {getAppointmentStatus} from "../../../../utils/getAppointmentStatus";
import StatusText from "./StatusText";
import StatusBlock from "./StatusBlock";

const AppointmentItem = ({appointment, cancel}) => {

    const {Specialist, Service} = appointment

    return (
        <TouchableHighlight delayPressIn={70}
                            underlayColor={'#dddddd'}
                            onPress={() => {}}
        >
            <View style={styles.wrapper}>
                <StatusBlock
                    statusText={appointment.appointmentStatus}
                />
                <View style={styles.description}>
                    <Text style={[styles.text, styles.name]}>{
                        Specialist.name}
                    </Text>
                    <Text style={[styles.text, styles.name]}>
                        {Service.name}
                    </Text>
                    <Text style={[styles.text]}>
                        Стоимость: {Service.price}
                    </Text>
                    <View style={styles.statusWrapper}>
                        <Text style={[styles.text, styles.statusText]}>
                            Статус:
                        </Text>
                        <StatusText
                            textStyle={styles.text}
                            statusText={appointment.appointmentStatus}
                        />
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        borderBottomLeftRadius: 80,
        borderBottomRightRadius: 80,
        marginTop: 10,
    },
    description: {
        marginLeft: 10,
        flexShrink: 1,
        justifyContent: 'flex-start',
        paddingVertical: 10,
    },
    text: {
        fontSize: 20,
        marginTop: 5,
        flexWrap: 'wrap',
    },
    name: {
        fontWeight: 'bold',

    },
    statusWrapper: {
        flexDirection: 'row'
    },
    statusText: {
        textDecorationLine: 'underline'
    },
    status: {
        fontWeight: 'bold',
    }
})

export default AppointmentItem;