import React from 'react';
import AppointmentItem from "../AppointmentList/AppointmentItem/AppointmentItem";
import {FlatList, RefreshControl} from "react-native";
import ListEmptyText from "../../Common/ListEmptyText";
import AllAppointmentItem from "./AllAppointmentItem/AllAppointmentItem";

const AllAppointmentList = ({appointments, refresh, isLoading, onPressItem}) => {
    return (
        <FlatList
            data={appointments}
            renderItem={({item}) => (
                <AllAppointmentItem
                    appointment={item}
                    onPress={() => onPressItem(item)}
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
                        text={'На данный момент у вас нет записей'}
                    />
                    :
                    null
            }
        />
    );
};

export default AllAppointmentList;