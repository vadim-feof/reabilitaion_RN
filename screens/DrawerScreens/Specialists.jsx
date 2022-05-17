import React, {useLayoutEffect, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import SpecialistList from "../../components/SpecialistList/SpecialistList";
import {useSpecialist} from "../../context/SpecialistContext";
import AddButton from "../../components/Buttons/AddButton/AddButton";
import {toastShow} from "../../utils/toastShow";


// TODO: добавить изменение специалистов как с новостями
const Specialists = ({navigation, route}) => {

    const {specialists, addSpecialist, updateSpecialist, removeSpecialist, isLoading, fetchSpecialist} = useSpecialist()

    useEffect(async () => {
        await fetchSpecialist()
    }, [])

    useEffect(async () => {
        const type = route.params?.type
        console.log(type)
        if (type)
            switch (type) {
                case 'add':
                    if (route.params.newSpecialist)
                        await addSpecialist(route.params.newSpecialist)
                    break
                case 'edit':
                    if (route.params.editedSpecialist)
                        await updateSpecialist(route.params.editedSpecialist)
                    break
                case 'delete':
                    if (route.params._id)
                        await removeSpecialist(route.params._id)
                    break
                default:
                    toastShow('error', 'Произошла ошибка', 'Неизвестная операция')
            }
    }, [route.params])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => <AddButton
                color={tintColor}
                navigate={() => navigation.navigate('CreateSpecialistScreen', { isEdit: false})}
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
