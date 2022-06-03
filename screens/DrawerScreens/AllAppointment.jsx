import React, {useEffect} from 'react';
import {Alert, StyleSheet, View} from "react-native";
import AppointmentList from "../../components/Lists/AppointmentList/AppointmentList";
import {useAppointment} from "../../context/AppointmentContext";
import {useIsFocused} from "@react-navigation/native";

const AllAppointment = () => {
    const isFocused = useIsFocused();
    const {appointments, isLoading, cancelAppointmentByAdmin,
        viewAppointmentByAdmin, fetchAllAppointments} = useAppointment()

    useEffect(async () => {
        if (isFocused) {
            await fetchAllAppointments()
        }
    }, [isFocused])

    const openDialogAppointment = (_idAppointment) => {
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
                    onPress: () => cancelAppointmentByAdmin(_idAppointment)
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
                    openDialogAppointment(appointment._id)
                }}
                appointments={appointments}
                isLoading={isLoading}
                refresh={fetchAllAppointments}
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