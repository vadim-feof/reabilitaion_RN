import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Dimensions, Alert, Vibration, LogBox} from 'react-native';
import DeleteButton from "../../../components/Common/Buttons/DeleteButton/DeleteButton";
import EditButton from "../../../components/Common/Buttons/EditButton/EditButton";
import {STATIC_IMAGE_SPECIALIST_URL} from "../../../services/api";
import FitImage from "react-native-fit-image";
import {useServices} from "../../../context/ServicesContext";
import ServicesModal from "../../../components/ModalWindows/ServicesModal/ServicesModal";
import {Collapse, CollapseBody, CollapseHeader} from "accordion-collapse-react-native";
import {AntDesign} from "@expo/vector-icons";
import ServiceList from "../../../components/Lists/ServiceList/ServiceList";
import {ScrollView} from "react-native";
import {useAuth} from "../../../context/AuthContext";
import {checkAdminRole} from "../../../utils/checkAdminRole";

const SpecialistDescriptionScreen = ({navigation, route}) => {

    const specialist = route.params
    const {name, position, description, photo} = specialist
    const imageUrl = STATIC_IMAGE_SPECIALIST_URL + specialist.photo

    const {services, isLoading, fetchServices, addServiceToSpec, deleteServiceFromSpec} = useServices()

    const [visibleModal, setVisibleModal] = useState(false)

    const {user} = useAuth()

    const [specialistServices, setSpecialistServices] = useState(specialist.Services)

    useEffect(() => {
        fetchServices()
    }, [])

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    useLayoutEffect(() => {
        if (checkAdminRole(user.roles)) {
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
        }
        else {
            navigation.setOptions({
                headerRight: null
            });
        }
    }, [navigation, user.roles]);

    const openAlertDelete = (idService, idSpec) => {
        if (!checkAdminRole(user.roles))
            return

        Vibration.vibrate(80)
        Alert.alert(
            '???????????????? ????????????????',
            '',
            [
                {
                    text: '????????????',
                },
                {
                    text: '?????????????? ???????????? ?? ??????????????????????',
                    onPress: () => confirmDelete(idService, idSpec)
                },
            ]
        )
    }


    const confirmDelete = (idService, idSpec) => {
        Vibration.vibrate(80)
        Alert.alert(
            '?????????????????????????? ???????????????',
            '',
            [
                {
                    text: '????????????',
                },
                {
                    text: '??????????????',
                    onPress: async () => {
                        const {Services} = await deleteServiceFromSpec(idService, idSpec)
                        setSpecialistServices(Services)
                    }
                },
            ]
        )
    }

    const openAlertAdd = () => {
        if (!checkAdminRole(user.roles))
            return

        Vibration.vibrate(80)
        Alert.alert(
            '???????????????? ????????????????',
            '',
            [
                {
                    text: '????????????',
                },
                {
                    text: '???????????????? ????????????',
                    onPress: () => setVisibleModal(isVisible => !isVisible)
                },
            ]
        )
    }

    const confirmAdd = (idService, idSpec) => {
        Vibration.vibrate(80)
        Alert.alert(
            '?????????????????????????? ?????????????????',
            '',
            [
                {
                    text: '????????????',
                },
                {
                    text: '???????????????? ????????????',
                    onPress: async () => {
                        const {Services} = await addServiceToSpec(idService, idSpec)
                        setSpecialistServices(Services)
                    }
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
                        confirmAdd(service._id, specialist._id)
                        setVisibleModal(isVisible => !isVisible)
                    }}
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
            </View>
            <Collapse handleLongPress={openAlertAdd}>
                <CollapseHeader>
                    <View style={styles.header}>
                        <Text style={styles.text}>?????????????????????????????? ????????????</Text>
                        <AntDesign name="down" size={24} color="black"/>
                    </View>
                </CollapseHeader>

                <CollapseBody>
                    {
                        specialistServices.length === 0
                            ? <Text style={[styles.header, styles.text]}> ???????????? ??????????????????????</Text>
                            :
                            <ServiceList
                                services={specialistServices}
                                onPressItem={(service) => openAlertDelete(service._id, specialist._id)}
                                isLoading={false}
                                refresh={() => {
                                }}
                            />
                    }
                </CollapseBody>
            </Collapse>
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
