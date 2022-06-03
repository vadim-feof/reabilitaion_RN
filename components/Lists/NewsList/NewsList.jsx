import React from 'react';
import {FlatList, RefreshControl} from "react-native";
import NewsItem from "./NewsItem/NewsItem";
import ListEmptyText from "../../Common/ListEmptyText";

const NewsList = ({news, navigation, refresh, isLoading}) => {
    return (
        <FlatList
            data={news}
            renderItem={({item}) => (
                <NewsItem news={item}
                          navigation={navigation}
                />
            )}
            keyExtractor={news => news._id.toString()}
            refreshControl={<RefreshControl
                refreshing={isLoading}
                onRefresh={refresh}
                title={'Отпустите для обновления'}
                colors={['#D58B40', '#D58B40']}
            />}
            ListEmptyComponent={
                !isLoading
                    ?
                    <ListEmptyText
                        text={'На данный момент нет новостей'}
                    />
                    :
                    null
            }
        />
    );
};

export default NewsList;