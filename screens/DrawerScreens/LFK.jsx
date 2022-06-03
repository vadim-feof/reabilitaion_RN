import React, {useEffect, useLayoutEffect} from 'react';
import {View, StyleSheet} from "react-native";
import {toastShow} from "../../utils/toastShow";
import AddButton from "../../components/Common/Buttons/AddButton/AddButton";
import {useLFK} from "../../context/LFKContext";
import LFKList from "../../components/Lists/LFKList/LFKList";
import {useAuth} from "../../context/AuthContext";
import {checkAdminRole} from "../../utils/checkAdminRole";

const Lfk = ({navigation, route}) => {
    const {items, fetchItems, addItems, updateItems, removeItems, isLoading} = useLFK()

    const {user} = useAuth()

    useEffect(async () => {
        await fetchItems()
    }, [])

    useEffect(async () => {
        const type = route.params?.type
        if (type)
            switch (type) {
                case 'add':
                    if (route.params.newItems)
                        await addItems(route.params.newItems)
                    break
                case 'edit':
                    if (route.params.editedItems)
                        await updateItems(route.params.editedItems)
                    break
                case 'delete':
                    if (route.params._id)
                        await removeItems(route.params._id)
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
                    navigate={() => navigation.navigate('CreateLfkScreen', { isEdit: false })}
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
            <LFKList items={items}
                      navigation={navigation}
                      refresh={fetchItems}
                      isLoading={isLoading}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    }
})

export default Lfk;