import React from 'react';
import {StyleSheet, View} from "react-native";
import FormCreateAppointment from "../../components/Form/FormCreateAppointment";

const CreateAppointment = ({navigation}) => {
    return (
        <View style={styles.container}>
            <FormCreateAppointment
                navigation={() => {
                    navigation.navigate('Appointment')
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

export default CreateAppointment;