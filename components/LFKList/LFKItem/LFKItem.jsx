import React from 'react';
import {STATIC_IMAGE_LFK_URL} from "../../../services/api";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import FitImage from "react-native-fit-image";

const LfkItem = ({item, navigation}) => {
    let content = item.content
    if (item.content.length > 250) {
        content = content.substring(0, 250) + '...'
    }

    const imageUrl = STATIC_IMAGE_LFK_URL + item.picture

    return (
        <TouchableHighlight
            delayPressIn={70}
            underlayColor={'#dddddd'}
            onPress={() => navigation.navigate('LfkDescription', item)}
            style={styles.item}
        >
            <>
                <Text style={styles.title}>{item.title}</Text>
                {<View
                    style={{marginTop: 10}}
                >
                    {item.picture ? <FitImage source={{uri: imageUrl}}/> : null}
                </View>}
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
export default LfkItem;