import React from 'react';
import {StyleSheet, View} from "react-native";
import FormAddService from "../../../components/Form/FormAddService";

const CreateServiceScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <FormAddService navigation={navigation}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "flex-start",
    },

})

export default CreateServiceScreen;
