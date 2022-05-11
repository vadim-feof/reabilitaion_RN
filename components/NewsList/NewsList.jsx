import React from 'react';
import {FlatList, StyleSheet} from "react-native";
import NewsItem from "./NewsItem/NewsItem";

const NewsList = ({news, navigation}) => {
    return (
        <FlatList
            data={news}
            renderItem={({item}) => (
                <NewsItem news={item}
                          navigation={navigation}
                />
            )}
            keyExtractor={news => news._id}
        />
    );
};

export default NewsList;