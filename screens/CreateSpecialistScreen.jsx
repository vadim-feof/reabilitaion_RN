import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import FormAddNews from "../components/Form/FormAddNews";
import FormAddSpecialist from "../components/Form/FormAddSpecialist";

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
        alignItems: "center"
    },

})

export default CreateSpecialistScreen;
