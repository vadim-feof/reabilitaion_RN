import React from 'react';
import {StyleSheet, View} from 'react-native';
import FormEditSpecialist from "../../../components/Form/FormAddSpecialist";

const UpdateSpecialistScreen = ({navigation, route}) => {

    return (
        <View style={styles.container}>
            <FormEditSpecialist
                isEdit={true}
                editingSpecialist={route.params.editingSpecialist}
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

export default UpdateSpecialistScreen;
