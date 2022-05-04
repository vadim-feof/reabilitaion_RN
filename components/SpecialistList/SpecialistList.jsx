import React from 'react';

import {FlatList, Text, View} from 'react-native';
import SpecialistItem from "./SpecialistItem/SpecialistItem";

const SpecialistList = ({doctors, navigation}) => {
    return (
        <FlatList
            endFillColor={'#e30000'}
            data={doctors}
            renderItem={({item}) => (
                <SpecialistItem doctor={item} navigation={navigation}/>
            )}
            keyExtractor={doctor => doctor.name}
        />
    );
};

export default SpecialistList;
