import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import FormEditService from "../../../components/Form/FormAddService.jsx";

const UpdateServiceScreen = ({navigation, route}) => {
    return (
        <View style={styles.container}>
            <FormEditService
                isEdit={true}
                editingService={route.params.editingService}
                navigation={navigation}
            />
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

export default UpdateServiceScreen;