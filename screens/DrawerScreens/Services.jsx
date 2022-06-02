import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import ServiceList from "../../components/Lists/ServiceList/ServiceList";
import AddButton from "../../components/Common/Buttons/AddButton/AddButton";
import {useSpecialist} from "../../context/SpecialistContext";
import {toastShow} from "../../utils/toastShow";
import {useServices} from "../../context/ServicesContext";

const Services = ({navigation, route}) => {

    const {services, addService, updateService, removeService, isLoading, fetchServices} = useServices()


    useEffect(async () => {
       await fetchServices()
    }, [])

    useEffect(async () => {
        const type = route.params?.type
        console.log(type)
        if (type)
            switch (type) {
                case 'add':
                    if (route.params.newService)
                        await addService(route.params.newService)
                    break
                case 'edit':
                    if (route.params.editedService)
                        await updateService(route.params.editedService)
                    break
                case 'delete':
                    if (route.params._id)
                        await removeService(route.params._id)
                    break
                default:
                    toastShow('error', 'Произошла ошибка', 'Неизвестная операция')
            }
    }, [route.params])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => <AddButton
                color={tintColor}
                navigate={() => navigation.navigate('CreateServiceScreen', { isEdit: false })}
            />
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ServiceList
                services={services}
                onPressItem={(service) => navigation.navigate('ServiceDescriptionScreen', service)}
                refresh={fetchServices}
                isLoading={isLoading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
        backgroundColor: '#fff'
    }
})

export default Services;