import React from 'react';
import {FlatList, RefreshControl} from "react-native";
import ServiceItem from "./ServiceItem/ServiceItem";

const ServiceList = ({services, onPressItem, refresh, isLoading}) => {
    return (
        <FlatList
            data={services}
            renderItem={({item, index}) => (
                <ServiceItem
                    service={item}
                    onPress={() => onPressItem(item)}
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