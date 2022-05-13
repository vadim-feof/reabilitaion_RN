import React, {useEffect, useLayoutEffect} from 'react';
import {StyleSheet, View} from "react-native";
import NewsList from "../../components/NewsList/NewsList";
import {useNews} from "../../context/NewsContext";
import AddButton from "../../components/Buttons/AddButton/AddButton";

const News = ({navigation, route}) => {

    const {news, addNews, isLoading, fetchNews} = useNews()

    useEffect(async () => {
        await fetchNews()
    }, [])

    useEffect(async () => {
        const newNews = route.params?.newNews
        if (newNews) {
            await addNews(newNews)
        }
    }, [route.params?.newNews])



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