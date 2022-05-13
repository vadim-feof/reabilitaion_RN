import React, {useEffect} from 'react';

import {StyleSheet, View} from 'react-native';
import SpecialistList from "../../components/SpecialistList/SpecialistList";
import {useSpecialist} from "../../context/SpecialistContext";

const Specialists = ({navigation, route}) => {

    const {specialists, addSpecialist, removeSpecialist, isLoading, fetchSpecialist} = useSpecialist()

    useEffect(async () => {
        await fetchSpecialist()
    }, [])

    useEffect(async () => {
        const newSpecialist = route.params?.newSpecialist
        if (newSpecialist) {
            await addSpecialist(newSpecialist)
        }
    }, [route.params?.newSpecialist])

    return (
        <View style={styles.container}>
            <SpecialistList
                specialists={specialists}
                navigation={navigation}
                refresh={fetchSpecialist}
                isLoading={isLoading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
        backgroundColor: '#fff'
    }
})

export default Specialists;
