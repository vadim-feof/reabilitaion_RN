import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from "react-native";
import FitImage from "react-native-fit-image";

const NewsItem = ({news, navigation}) => {
    let content = news.content
    if (news.content.length > 250) {
        content = content.substring(0, 250) + '...'
    }

    return (
        <TouchableHighlight
            delayPressIn={70}
            underlayColor={'#dddddd'}
            onPress={() => navigation.navigate('NewsDescription', news)}
            style={styles.item}
        >
            <>
                <Text style={styles.date}>
                    {new Date(news.date).toLocaleDateString('ru')}
                </Text>
                <Text style={styles.title}>{news.title}</Text>
                <View
                    style={{marginTop: 10}}
                >
                    {news.picture && <FitImage source={{uri: news.picture}}/>}
                </View>
                <View style={styles.description}>
                    <Text style={styles.content}>
                        {content}
                    </Text>
                </View>
            </>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#b8b8b8',
        marginTop: 10,
        marginHorizontal: 7,
    },
    date: {
        color: '#D58B40',
        fontSize: 16,
        fontWeight: 'bold'
    },
    title: {
        marginTop: 5,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        fontSize: 20,
    },
    description: {
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: 'space-between',
        marginTop: 7
    },
    content: {
        flex: 1,
        fontSize: 16,
    }
})

export default NewsItem;