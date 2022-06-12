import React from 'react';
import {StyleSheet, TouchableHighlight, View} from "react-native";
import {Text} from "react-native";
import StatusBlock from "../../AppointmentList/AppointmentItem/StatusBlock";
import StatusText from "../../AppointmentList/AppointmentItem/StatusText";
import moment from "moment";

const AllAppointmentItem = ({appointment, onPress, onLongPress}) => {

    const {Specialist, Service, User} = appointment

    return (
        <TouchableHighlight delayPressIn={70}
                            underlayColor={'#dddddd'}
                            onPress={onPress}
                            onLongPress={onLongPress}
        >
            <View style={styles.wrapper}>
                <StatusBlock
                    statusText={appointment.appointmentStatus}
                />
                <View style={styles.description}>
                    <Text style={[styles.text, styles.name]}>
                        {Specialist ? Specialist.name : 'Нет информации о специалисте'}
                    </Text>
                    <Text style={[styles.text, styles.name]}>
                        {Service ? Service.name : 'Нет информации об услуге'}
                    </Text>
                    <Text style={[styles.text]}>
                        Дата: {moment(appointment.desiredDate).format('LL')}
                    </Text>
                    <Text style={[styles.text]}>
                        Время: {moment(appointment.desiredTime).format('LT')}
                    </Text>
                    <View style={styles.statusWrapper}>
                        <Text  style={[styles.text, styles.name]}>Пациент: </Text>
                        <Text style={[styles.text]}>
                            {User ? User.name : 'Нет информации о пользователе'}
                        </Text>
                    </View>
                    <View style={styles.statusWrapper}>
                        <Text  style={[styles.text, styles.name]}>Телефон: </Text>
                        <Text style={[styles.text]}>
                            {User ? User.phone : 'Нет информации о номере телефона'}
                        </Text>
                    </View>

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
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    statusText: {
        textDecorationLine: 'underline'
    },
    status: {
        fontWeight: 'bold',
    },
})

export default AllAppointmentItem;
