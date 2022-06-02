import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Dimensions, Alert, Vibration} from 'react-native';
import DeleteButton from "../../../components/Buttons/DeleteButton/DeleteButton";
import EditButton from "../../../components/Buttons/EditButton/EditButton";
import {STATIC_IMAGE_SPECIALIST_URL} from "../../../services/api";
import FitImage from "react-native-fit-image";
import {useServices} from "../../../context/ServicesContext";
import ServicesModal from "../../../components/ModalWindows/ServicesModal/ServicesModal";
import {Collapse, CollapseBody, CollapseHeader} from "accordion-collapse-react-native";
import {AntDesign} from "@expo/vector-icons";
import ServiceList from "../../../components/Service/ServiceList";
import {ScrollView} from "react-native";

const SpecialistDescriptionScreen = ({navigation, route}) => {

    const specialist = route.params
    const {name, position, description, photo} = specialist
    const imageUrl = STATIC_IMAGE_SPECIALIST_URL + specialist.photo

    const {services, isLoading, fetchServices} = useServices()
    const [visibleModal, setVisibleModal] = useState(false)
    useEffect(() => {
        fetchServices()
    }, [])

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

    const openAlertDelete = (idService, idSpec) => {
        Vibration.vibrate(80)
        Alert.alert(
            'Выберите действие',
            '',
            [
                {
                    text: 'Отмена',
                },
                {
                    text: 'Удалить услугу у специалиста',
                    onPress: confirmDelete(idService, idSpec)
                },
            ]
        )
    }


    const confirmDelete = (idService, idSpec) => {
        Vibration.vibrate(80)
        Alert.alert(
            'Действительно удалить?',
            '',
            [
                {
                    text: 'Отмена',
                },
                {
                    text: 'Удалить',
                    onPress: () => console.log(idService, idSpec)
                },
            ]
        )
    }

    const openAlertAdd = () => {
        Vibration.vibrate(80)
        Alert.alert(
            'Выберите действие',
            '',
            [
                {
                    text: 'Отмена',
                },
                {
                    text: 'Добавить услугу',
                    onPress: () => setVisibleModal(isVisible => !isVisible)
                },
            ]
        )
    }

    const confirmAdd = (idService) => {
        Vibration.vibrate(80)
        Alert.alert(
            'Действительно добавить?',
            '',
            [
                {
                    text: 'Отмена',
                },
                {
                    text: 'Добавить услугу',
                    onPress: () => console.log(idService)
                },
            ]
        )
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <ServicesModal
                    isLoading={isLoading}
                    refresh={fetchServices}
                    services={services}
                    onPressItem={(service) => {
                        confirmAdd(service._id)
                        setVisibleModal(isVisible => !isVisible)}}
                    closeModal={() => setVisibleModal(false)}
                    visible={visibleModal}
                />
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


                <Collapse handleLongPress={openAlertAdd}>
                    <CollapseHeader>
                        <View style={styles.header}>
                            <Text style={styles.text}>Предоставляемые услуги</Text>
                            <AntDesign name="down" size={24} color="black"/>
                        </View>
                    </CollapseHeader>

                    <CollapseBody>
                        <ServiceList
                            services={specialist.Services}
                            onPressItem={(service) => openAlertDelete(service._id, specialist._id)}
                            isLoading={false}
                            refresh={() => {
                            }}
                        />
                    </CollapseBody>
                </Collapse>
            </View>
        </ScrollView>
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
    },
    header: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        padding: 10,
        backgroundColor: '#F3F3F3',
        height: 70,
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },

})

export default SpecialistDescriptionScreen;
