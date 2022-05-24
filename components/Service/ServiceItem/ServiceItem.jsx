import React from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";

const ServiceItem = ({service, index, navigation}) => {

    const itemClass = [styles.item]
    if (index % 2 === 0) {
        itemClass.push(styles.greyItem)
    }

    return (
        <TouchableHighlight
            delayPressIn={70}
            underlayColor={'#dddddd'}
            onPress={() => navigation.navigate('ServiceDescriptionScreen', service)}
        >
                <View style={itemClass}>
                    <View style={styles.description}>
                        <Text style={styles.code}>{service.code}</Text>
                        <Text style={styles.name}>{service.name}</Text>
                        <Text style={styles.price}>{service.price}</Text>
                        <Text style={styles.price}>{service.description}</Text>
                    </View>
                </View>


        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    greyItem: {
        backgroundColor: '#F3F3F3'
    },
    item: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.2)',

    },
    description: {
        alignItems: "flex-start",
        flexShrink: 1,
        justifyContent: 'space-around',
        padding: 5
    },
    code: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        flexWrap: 'wrap',
        fontSize: 18,
        padding: 5,

    },
    name: {
        fontWeight: 'bold',
        flexWrap: 'wrap',
        fontSize: 18,
        padding: 5,
    },
    price: {
        flexWrap: 'wrap',
        fontSize: 18,
        padding: 5,
    }
})

export default ServiceItem;