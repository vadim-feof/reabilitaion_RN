import React, {useEffect} from 'react';
import {Alert, StyleSheet, Vibration, View} from "react-native";
import AppointmentList from "../../components/Lists/AppointmentList/AppointmentList";
import {useAppointment} from "../../context/AppointmentContext";
import {useIsFocused} from "@react-navigation/native";
import AllAppointmentList from "../../components/Lists/AllAppointmentList/AllAppointmentList";

const AllAppointment = ({navigation}) => {
    const isFocused = useIsFocused();
    const {appointments, isLoading, cancelAppointmentByAdmin,
        viewAppointmentByAdmin, fetchAllAppointments} = useAppointment()

    useEffect(async () => {
        if (isFocused) {
            await fetchAllAppointments()
        }
    }, [isFocused])

    const openDialogAppointment = (_idAppointment) => {
        Vibration.vibrate(80)
        Alert.alert(
            'Выберите действие',
            '',
            [
                {
                    text: 'Отмена'
                },
                {
                    text: 'Отменить запись',
                    onPress: () => openConfirmCancel(_idAppointment)
                },
                {
                    text: 'Рассмотреть запись',
                    onPress: () => openConfirmViewed(_idAppointment)
                },
            ]
        )
    }

    const openConfirmCancel = (_idAppointment) => {
        Alert.alert(
            'Действительно отменить запись?',
            '',
            [
                {
                    text: 'Отмена'
                },
                {
                    text: 'Да',
                    onPress: () => cancelAppointmentByAdmin(_idAppointment)
                },

            ]
        )
    }

    const openConfirmViewed = (_idAppointment) => {
        Alert.alert(
            'Действительно рассмотреть запись?',
            '',
            [
                {
                    text: 'Отмена'
                },
                {
                    text: 'Да',
                    onPress: () => viewAppointmentByAdmin(_idAppointment)
                },

            ]
        )
    }

    return (
        <View style={styles.container}>
            <AllAppointmentList
                onPressItem={(appointment) => navigation.navigate('UserAppointmentDescription', appointment)}
                appointments={appointments}
                isLoading={isLoading}
                refresh={fetchAllAppointments}
                onLongPressItem={(appointment) =>
                { if (appointment.appointmentStatus === 'process')
                    openDialogAppointment(appointment._id)
                }}
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

export default AllAppointment;