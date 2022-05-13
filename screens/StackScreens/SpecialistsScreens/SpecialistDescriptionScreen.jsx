import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import DeleteButton from "../../../components/Buttons/DeleteButton/DeleteButton";

const SpecialistDescriptionScreen = ({navigation, route}) => {

    const {name, position, description} = route.params

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => <DeleteButton
                color={tintColor}
                navigate={() => navigation.navigate('Specialists', {_id: route.params._id} )}

            />
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.description}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.position}>{position}</Text>
            </View>
            <Image style={styles.photo} source={require('../../../assets/doctorNoPhoto.png')}/>
            <Text style={styles.about}>{description}</Text>
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
