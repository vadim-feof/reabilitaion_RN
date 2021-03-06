import React from 'react';
import {FlatList, RefreshControl} from "react-native";
import LfkItem from "./LFKItem/LFKItem";
import ListEmptyText from "../../Common/ListEmptyText";

const LFKList = ({items, navigation, refresh, isLoading}) => {
    return (
        <FlatList
            data={items}
            renderItem={({item}) => (
                <LfkItem item={item}
                          navigation={navigation}
                />
            )}
            keyExtractor={items => items._id.toString()}
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
                        text={'На данный момент нет ЛФК комплексов'}
                    />
                    :
                    null
            }
        />
    );
};

export default LFKList;