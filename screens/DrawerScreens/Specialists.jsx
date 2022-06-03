import React, {useLayoutEffect, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import SpecialistList from "../../components/Lists/SpecialistList/SpecialistList";
import {useSpecialist} from "../../context/SpecialistContext";
import AddButton from "../../components/Common/Buttons/AddButton/AddButton";
import {toastShow} from "../../utils/toastShow";
import {useAuth} from "../../context/AuthContext";
import {checkAdminRole} from "../../utils/checkAdminRole";


// TODO: добавить изменение специалистов как с новостями
const Specialists = ({navigation, route}) => {

    const {specialists, addSpecialist, updateSpecialist, removeSpecialist, isLoading, fetchSpecialist} = useSpecialist()

    const {user} = useAuth()

    useEffect(async () => {
        await fetchSpecialist()
    }, [])

    useEffect(async () => {
        const type = route.params?.type
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
        if (checkAdminRole(user.roles)) {
            navigation.setOptions({
                headerRight: ({tintColor}) => <AddButton
                    color={tintColor}
                    navigate={() => navigation.navigate('CreateSpecialistScreen', { isEdit: false})}
                />
            });
        }
        else {
            navigation.setOptions({
                headerRight: null
            });
        }
    }, [navigation, user.roles]);

    return (
        <View style={styles.container}>
            <SpecialistList
                specialists={specialists}
                onPressItem={(specialist) => navigation.navigate('SpecialistDescriptionScreen', specialist)}
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
