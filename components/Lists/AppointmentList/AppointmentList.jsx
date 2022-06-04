import React from 'react';
import {FlatList, RefreshControl} from "react-native";
import AppointmentItem from "./AppointmentItem/AppointmentItem";
import ListEmptyText from "../../Common/ListEmptyText";

const AppointmentList = ({appointments, refresh, isLoading, onPressItem}) => {
    return (
        <FlatList
            data={appointments}
            renderItem={({item}) => (
                <AppointmentItem
                    appointment={item}
                    onPress={(appointment) => onPressItem(appointment)}
                />
            )}
            keyExtractor={item => item._id}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={refresh}
                    title={'Отпустите для обновления'}
                    colors={['#D58B40', '#D58B40']}
                />
            }
            ListEmptyComponent={
                !isLoading
                ?
                <ListEmptyText
                    text={'На данный момент у вас нет записей\nили выберите другой фильтр'}
                />
                :
                null
            }
        />
    );
};

export default AppointmentList;
