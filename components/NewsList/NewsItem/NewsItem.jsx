import React from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const NewsItem = ({news, navigation}) => {
    return (
        <TouchableOpacity
            delayPressIn={70}
            activeOpacity={0.8}
            style={styles.item}
            onPress={() => navigation.navigate('NewsDescription', news)}
        >
            <View style={styles.imgData}>
                <Image style={styles.img} source={require('../../../assets/news.jpg')}/>
                <Text style={styles.data}>{news.data}</Text>
            </View>


            <View style={styles.description}>
                <Text style={styles.title}>{news.title}</Text>

                <Text style={styles.full}>{news.full}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        margin: 10
    },
    imgData: {
        display: "flex",
        flexDirection: "row",
    },
    img: {
        width: 250,
        height: 250,
    },
    data: {
        color: '#D58B40',
        marginLeft: 20,
        fontWeight: 'bold'

    },
    description: {
        alignItems: "flex-start",
        flexShrink: 1,
        justifyContent: 'space-around',
    },
    title: {
        fontWeight: 'bold',
        flexWrap: 'wrap',
        fontSize: 18,
        padding: 5,
    },
    full: {
        fontSize: 16,
        padding: 5,
    }
})

export default NewsItem;