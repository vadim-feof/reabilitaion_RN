import React, {useEffect} from 'react';
import {StyleSheet, View} from "react-native";
import AppointmentList from "../../components/Lists/AppointmentList/AppointmentList";
import {useAppointment} from "../../context/AppointmentContext";
import {useIsFocused} from "@react-navigation/native";

const Appointment = () => {
    const isFocused = useIsFocused();
    const {appointments, isLoading, fetchUserAppointments} = useAppointment()

    useEffect(async () => {
        if (isFocused) {
            await fetchUserAppointments()
        }
    }, [isFocused])

    return (
        <View style={styles.container}>
            <AppointmentList
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