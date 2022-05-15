import React from 'react';
import {StyleSheet, View} from 'react-native';
import FormEditNews from "../../../components/Form/FormAddNews";

const UpdateNewsScreen = ({navigation, route}) => {

    return (
        <View style={styles.container}>
            <FormEditNews
                navigation={navigation}
                isEdit={true}
                editingNews={route.params.editingNews}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "flex-start"
    },
})

export default UpdateNewsScreen
