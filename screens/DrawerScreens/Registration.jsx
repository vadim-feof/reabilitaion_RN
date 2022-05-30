import React from 'react';
import {StyleSheet, View} from "react-native";
import FormRegistration from "../../components/Form/FormRegistration";

const Registration = ({navigation}) => {

    return (
        <View style={styles.container}>
            <FormRegistration navigation={navigation}/>
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