import React from 'react';
import {StyleSheet, View} from 'react-native';
import FormAddSpecialist from "../../../components/Form/FormAddSpecialist";

const CreateSpecialistScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <FormAddSpecialist navigation={navigation}/>
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

export default CreateSpecialistScreen;
