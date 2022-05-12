import React from 'react';

import {FlatList, RefreshControl} from 'react-native';
import SpecialistItem from "./SpecialistItem/SpecialistItem";

const SpecialistList = ({doctors, navigation}) => {
    return (
        <FlatList
            data={doctors}
            renderItem={({item}) => (
                <SpecialistItem doctor={item} navigation={navigation}/>
            )}
            keyExtractor={doctor => doctor.name}
        />
    );
};

export default SpecialistList;
