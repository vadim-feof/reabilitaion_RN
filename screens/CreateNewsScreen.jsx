import React from 'react';
import {StyleSheet, View} from "react-native";
import FormAddNews from "../components/Form/FormAddNews";

const CreateNewsScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <FormAddNews navigation={navigation}/>
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

export default CreateNewsScreen;