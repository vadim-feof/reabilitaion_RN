import React, {useEffect, useLayoutEffect} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {toastShow} from "../../utils/toastShow";
import AddButton from "../../components/Buttons/AddButton/AddButton";
import {useLFK} from "../../context/LFKContext";
import NewsList from "../../components/NewsList/NewsList";
import LFKList from "../../components/LFKList/LFKList";
import CreateLFKScreen from "../StackScreens/LFKScreen/CreateLFKScreen"

const Lfk = ({navigation, route}) => {
    const {items, fetchItems, addItems, updateItems, removeItems, isLoading} = useLFK()

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
        navigation.setOptions({
            headerRight: ({tintColor}) => <AddButton
                color={tintColor}
                navigate={() => navigation.navigate('CreateLfkScreen', { isEdit: false })}
            />
        });
    }, [navigation]);
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