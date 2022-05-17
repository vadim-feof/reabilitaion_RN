import React from 'react';
import SpecialistItem from "../SpecialistList/SpecialistItem/SpecialistItem";
import {FlatList, RefreshControl} from "react-native";
import ServiceItem from "./ServiceItem/ServiceItem";

const ServiceList = ({service, navigation}) => {
    return (
        <FlatList
            data={service}
            renderItem={({item, index}) => (
                <ServiceItem
                    service={item}
                    navigation={navigation}
                    index={index}
                />
            )}
            keyExtractor={service => service.name}
        />
    );
};

export default ServiceList;