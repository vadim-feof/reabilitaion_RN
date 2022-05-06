import React from 'react';
import {StyleSheet, View, Text} from "react-native";

const News = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Здесь хотят быть новости ʕ•́ᴥ•̀ʔっ♡ʕ ᵔᴥᵔ ʔ{'\n'}
                localhost:5000/api/{'\n'}
                GET('/news') - все новости{'\n'}
                GET('/news/:id') - одну новость{'\n'}
                POST('/news') - добавить новость{'\n'}
                PUT('/news/:id') - обновить новость{'\n'}
                DELETE('/news/:id') - удалить новость{'\n'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 24,
    }
})

export default News;