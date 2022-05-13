import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';

const SpecialistDescriptionScreen = ({route}) => {
    const {name, position} = route.params
    return (
        <View style={styles.container}>
            <View style={styles.description}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.position}>{position}</Text>
            </View>
            <Image style={styles.photo} source={require('../../../assets/doctorNoPhoto.png')}/>
            <Text style={styles.about}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi fuga fugiat
                hic in itaque laudantium libero, magnam nostrum pariatur quaerat quis quos reiciendis repellendus
                tempore temporibus unde veniam veritatis. Illo.</Text>
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
    description: {
        marginTop: 15,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: "center"
    },
    position: {
        marginTop: 10,
        fontSize: 18,
        textAlign: "center"
    },
    photo: {
        marginTop: 15,
        borderRadius: Dimensions.get('window').width / 2,
        borderWidth: 1,
        borderColor: '#D58B40'
    },
    about: {
        marginTop: 10,
        lineHeight: 28,
        fontSize: 20,
        padding: 15
    }
})

export default SpecialistDescriptionScreen;
