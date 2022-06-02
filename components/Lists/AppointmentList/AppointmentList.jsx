import React from 'react';
import {FlatList, RefreshControl} from "react-native";
import AppointmentItem from "./AppointmentItem/AppointmentItem";

const AppointmentList = ({appointments, refresh, isLoading}) => {
    return (
        <FlatList
            data={appointments}
            renderItem={({item}) => (
                <AppointmentItem
                    appointment={item}
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
        />
    );
};

export default AppointmentList;