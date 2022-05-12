import React from 'react';
import {StyleSheet, Image, Text, View, TouchableNativeFeedback, Dimensions} from 'react-native';

const SpecialistItem = ({doctor, navigation}) => {
    return (
        <TouchableNativeFeedback
            delayPressIn={70}
            onPress={() => navigation.navigate('SpecialistDescription', doctor)}
        >
            <View style={styles.item}>
                <Image style={styles.photo} source={require('../../../assets/doctorNoPhoto.png')}/>
                <View style={styles.description}>
                    <Text style={styles.name}>{doctor.name}</Text>
                    <Text style={styles.position}>{doctor.position}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        borderBottomLeftRadius: 80,
        borderBottomRightRadius: 80,
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: Dimensions.get('window').width / 2,
    },
    description: {
        alignItems: "flex-start",
        flexShrink: 1,
        justifyContent: 'space-around',
    },
    name: {
        fontWeight: 'bold',
        flexWrap: 'wrap',
        fontSize: 18,
        padding: 5,
    },
    position: {
        fontSize: 16,
        padding: 5,
    }
})

export default SpecialistItem;
