import React, {useEffect, useLayoutEffect} from 'react';
import {StyleSheet, View} from "react-native";
import NewsList from "../../components/NewsList/NewsList";
import {useNews} from "../../context/NewsContext";
import AddButton from "../../components/Buttons/AddButton/AddButton";
import {toastShow} from "../../utils/toastShow";

// TODO: progressbar for picture upload
const News = ({navigation, route}) => {

    const {news, addNews, updateNews, removeNews, isLoading, fetchNews} = useNews()

    useEffect(async () => {
        await fetchNews()
    }, [])

    useEffect(async () => {
        const type = route.params?.type
        if (type)
            switch (type) {
                case 'add':
                    if (route.params.newNews)
                        await addNews(route.params.newNews)
                    break
                case 'edit':
                    if (route.params.editedNews)
                        await updateNews(route.params.editedNews)
                    break
                case 'delete':
                    if (route.params._id)
                        await removeNews(route.params._id)
                    break
                default:
                    toastShow('error', 'Произошла ошибка', 'Неизвестная операция')
            }
    }, [route.params])


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => <AddButton
                color={tintColor}
                navigate={() => navigation.navigate('CreateNewsScreen', { isEdit: false })}
            />
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <NewsList news={news}
                      navigation={navigation}
                      refresh={fetchNews}
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

export default News;