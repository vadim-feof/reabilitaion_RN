import React, {useEffect} from 'react';
import {Alert, StyleSheet, View} from "react-native";
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
            <AllAppointmentList
                onPressItem={(appointment) => navigation.navigate('UserAppointmentDescription', appointment)}
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