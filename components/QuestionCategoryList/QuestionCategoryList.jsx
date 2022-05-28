import React from 'react';

import {FlatList, StyleSheet, Text} from "react-native";
import QuestionCategoryItem from "./QuestionCategoryItem/QuestionCategoryItem";


const QuestionCategoryList = ({category, deleteCategory, addQuestion, deleteQuestion}) => {
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
        />
    );
};



export default QuestionCategoryList;