import React, {useLayoutEffect, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import SpecialistList from "../../components/SpecialistList/SpecialistList";
import {useSpecialist} from "../../context/SpecialistContext";
import AddButton from "../../components/Buttons/AddButton/AddButton";

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


    useEffect(async () => {
        const idSpecialist = route.params?._id
        if (idSpecialist) {
            await removeSpecialist(idSpecialist)
        }
    }, [route.params?._id])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => <AddButton
                color={tintColor}
                navigate={() => navigation.navigate('CreateSpecialistScreen')}
            />
        });
    }, [navigation]);

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
