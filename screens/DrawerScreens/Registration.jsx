import React from 'react';
import {StyleSheet, Text} from "react-native";
import {View} from "react-native";
import FormRegistration from "../../components/Form/FormRegistration";

const Registration = () => {
    return (
        <View style={styles.container}>
            <FormRegistration/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})

export default Registration;