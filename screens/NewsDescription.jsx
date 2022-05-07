import React from 'react';
import {Image, StyleSheet, Text, View, ScrollView} from "react-native";

const NewsDescription = ({route}) => {
    const {title, full} = route.params
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Image style={styles.photo} source={require('../assets/news.jpg')}/>
                <Text style={styles.full}>{full}</Text>
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: "center",
        marginTop: 15
    },
    photo: {
        marginTop: 15,
        width: 370,
        height: 370,
    },
    full: {
        marginTop: 10,
        lineHeight: 28,
        fontSize: 20,
        padding: 15
    }
})

export default NewsDescription;