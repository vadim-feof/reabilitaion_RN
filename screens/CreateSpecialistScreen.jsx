import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const CreateSpecialistScreen = ({route}) => {

    return (
        <View style={styles.container}>
            <Text>Добавить специалиста</Text>
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
