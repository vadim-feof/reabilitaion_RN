import React from 'react';
import {FlatList, RefreshControl, Text} from "react-native";
import ServiceItem from "./ServiceItem/ServiceItem";
import ListEmptyText from "../../Common/ListEmptyText";

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
            ListEmptyComponent={
                !isLoading
                    ?
                    <ListEmptyText
                        text={'На данный момент услуг нет'}
                    />
                    :
                    null
            }
        />
    );
};

export default ServiceList;