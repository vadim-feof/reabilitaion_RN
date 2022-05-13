import React, {useEffect, useLayoutEffect} from 'react';
import {StyleSheet, View} from "react-native";
import NewsList from "../../components/NewsList/NewsList";
import {useNews} from "../../context/NewsContext";
import AddButton from "../../components/Buttons/AddButton/AddButton";

const News = ({navigation, route}) => {

    const {news, addNews, updateNews, isLoading, fetchNews} = useNews()

    useEffect(async () => {
        await fetchNews()
    }, [])

    useEffect(async () => {
        const edit = route.params.edit
        if (edit && route.params.editedNews) {
            await updateNews(route.params.editedNews)
        }
        else if (!edit && route.params.newNews) {
            await addNews(route.params.newNews)
        }
    }, [route.params])



    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => <AddButton
                color={tintColor}
                navigate={() => navigation.navigate('CreateNewsScreen')}
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