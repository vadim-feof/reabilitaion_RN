import React from 'react';
import {FlatList, RefreshControl} from "react-native";
import LfkItem from "./LFKItem/LFKItem";

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
        />
    );
};

export default LFKList;