import React from 'react';
import {StyleSheet, View} from "react-native";
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
        justifyContent: "flex-start"
    }
})

export default Registration;