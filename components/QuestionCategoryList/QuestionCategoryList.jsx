import React from 'react';

import {FlatList, RefreshControl, StyleSheet, Text} from "react-native";
import QuestionCategoryItem from "./QuestionCategoryItem/QuestionCategoryItem";


const QuestionCategoryList = ({category, deleteCategory, addQuestion, deleteQuestion,  refresh, isLoading}) => {
    return (
        <FlatList
            data={category}
            renderItem={({item}) => (
                <QuestionCategoryItem categoryItem={item}
                                      deleteCategory={deleteCategory}
                                      addQuestion={addQuestion}
                                      deleteQuestion={deleteQuestion}
                />
            )}
            keyExtractor={item => item._id.toString()}
            refreshControl={<RefreshControl
                refreshing={isLoading}
                onRefresh={refresh}
                title={'Отпустите для обновления'}
                colors={['#D58B40', '#D58B40']}
            />}
        />
    );
};



export default QuestionCategoryList;