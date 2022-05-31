import React from 'react';
import {StyleSheet, View} from "react-native";
import FormEditAccount from "../../../components/Form/FormEditAccount";

const EditMyAccountScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <FormEditAccount navigation={navigation}/>
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

export default EditMyAccountScreen;