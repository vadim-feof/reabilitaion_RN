import React from 'react';

import {FlatList, RefreshControl} from 'react-native';
import SpecialistItem from "./SpecialistItem/SpecialistItem";

const SpecialistList = ({specialists, onPressItem, refresh, isLoading}) => {
    return (
        <FlatList
            data={specialists}
            renderItem={({item}) => (
                <SpecialistItem
                    specialist={item}
                    onPress={() => onPressItem(item)}
                />
            )}
            keyExtractor={specialist => specialist._id}
            refreshControl={<RefreshControl
                refreshing={isLoading}
                onRefresh={refresh}
                title={'Отпустите для обновления'}
                colors={['#D58B40', '#D58B40']}
            />}
        />
    );
};

export default SpecialistList;
