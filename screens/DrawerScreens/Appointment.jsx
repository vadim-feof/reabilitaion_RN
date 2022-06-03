import React, {useEffect} from 'react';
import {Alert, StyleSheet, View} from "react-native";
import AppointmentList from "../../components/Lists/AppointmentList/AppointmentList";
import {useAppointment} from "../../context/AppointmentContext";
import {useIsFocused} from "@react-navigation/native";

const Appointment = () => {
    const isFocused = useIsFocused();
    const {appointments, isLoading, fetchUserAppointments, cancelAppointmentByUser} = useAppointment()

    useEffect(async () => {
        if (isFocused) {
            await fetchUserAppointments()
        }
    }, [isFocused])

    const openCancelAppointment = (_idAppointment) => {
        Alert.alert(
            'Выберите действие',
            '',
            [
                {
                    text: 'Отменить запись',
                    onPress: () => openConfirmCancel(_idAppointment)
                },
                {
                    text: 'Отмена'
                }
            ]
        )
    }

    const openConfirmCancel = (_idAppointment) => {
        Alert.alert(
            'Отменить запись?',
            '',
            [
                {
                    text: 'Да',
                    onPress: () => cancelAppointmentByUser(_idAppointment)
                },
                {
                    text: 'Отмена'
                }
            ]
        )
    }

    return (
        <View style={styles.container}>
            <AppointmentList
                onPressItem={(appointment) => {
                    if (appointment.appointmentStatus === 'process')
                        openCancelAppointment(appointment._id)
                }}
                appointments={appointments}
                isLoading={isLoading}
                refresh={fetchUserAppointments}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})

export default Appointment;