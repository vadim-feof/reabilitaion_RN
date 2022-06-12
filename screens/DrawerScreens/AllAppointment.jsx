import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Alert, StyleSheet, Vibration, View} from "react-native";
import AppointmentList from "../../components/Lists/AppointmentList/AppointmentList";
import {useAppointment} from "../../context/AppointmentContext";
import {useIsFocused} from "@react-navigation/native";
import AllAppointmentList from "../../components/Lists/AllAppointmentList/AllAppointmentList";
import FilterAppointmentMenu from "../../components/Filters/FilterAppointmentMenu";

const AllAppointment = ({navigation}) => {
    const isFocused = useIsFocused();
    const {filteredAppointments, setFilter, appointments, isLoading, cancelAppointmentByAdmin,
        confirmAppointmentByAdmin, fetchAllAppointments} = useAppointment()

    useEffect(async () => {
        if (isFocused) {
            await fetchAllAppointments()
        }
    }, [isFocused])

    const [visibleMenu, setVisibleMenu] = useState(false);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => (
                <FilterAppointmentMenu
                    setFilter={setFilter}
                    color={tintColor}
                    visible={visibleMenu}
                    setVisible={setVisibleMenu}
                />
            )
        })
    }, [navigation, visibleMenu])

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
                    text: 'Подтвердить запись',
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
            'Действительно подтвердить запись?',
            '',
            [
                {
                    text: 'Отмена'
                },
                {
                    text: 'Да',
                    onPress: () => confirmAppointmentByAdmin(_idAppointment)
                },

            ]
        )
    }

    return (
        <View style={styles.container}>
            <AllAppointmentList
                onPressItem={(appointment) => navigation.navigate('UserAppointmentDescription', appointment)}
                appointments={filteredAppointments}
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
