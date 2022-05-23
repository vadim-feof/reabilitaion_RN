import React from 'react';
import SpecialistItem from "../SpecialistList/SpecialistItem/SpecialistItem";
import {FlatList, RefreshControl} from "react-native";
import ServiceItem from "./ServiceItem/ServiceItem";

const ServiceList = ({services, navigation, refresh, isLoading}) => {
    return (
        <FlatList
            data={services}
            renderItem={({item, index}) => (
                <ServiceItem
                    service={item}
                    navigation={navigation}
                    index={index}
                />
            )}
            keyExtractor={service => service.name}
            refreshControl={<RefreshControl
                refreshing={isLoading}
                onRefresh={refresh}
                title={'Отпустите для обновления'}
                colors={['#D58B40', '#D58B40']}
            />}
        />
    );
};

export default ServiceList;