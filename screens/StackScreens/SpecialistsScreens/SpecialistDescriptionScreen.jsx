import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import DeleteButton from "../../../components/Buttons/DeleteButton/DeleteButton";
import EditButton from "../../../components/Buttons/EditButton/EditButton";
import {STATIC_IMAGE_SPECIALIST_URL} from "../../../services/api";
import FitImage from "react-native-fit-image";

const SpecialistDescriptionScreen = ({navigation, route}) => {

    const specialist = route.params
    const {name, position, description, photo} = specialist
    const imageUrl = STATIC_IMAGE_SPECIALIST_URL + specialist.photo

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => (
                <>
                    <DeleteButton
                        color={tintColor}
                        navigate={() => navigation.navigate('Specialists', {
                            type: 'delete',
                            _id: route.params._id
                        })}
                    />
                    <EditButton
                        color={tintColor}
                        navigate={() => navigation.navigate('UpdateSpecialistScreen', {
                                editingSpecialist: specialist,
                                isEdit: true
                            }
                        )}
                    />
                </>
            )
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.description}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.position}>{position}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <FitImage style={styles.photo}
                          source={photo ? {uri: imageUrl} : require('../../../assets/doctorNoPhoto.png')}
                          resizeMode='cover'
                />
            </View>
            <Text style={styles.about}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "flex-start",
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
        width: 300,
        height: 300,
        borderWidth: 3,
        borderColor: '#D58B40',
        overflow: 'hidden'
    },
    about: {
        marginTop: 10,
        lineHeight: 28,
        fontSize: 20,
        padding: 15
    }
})

export default SpecialistDescriptionScreen;
