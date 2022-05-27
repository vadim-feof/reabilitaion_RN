import React from 'react';

import {FlatList, StyleSheet, Text} from "react-native";
import QuestionCategoryItem from "./QuestionCategoryItem/QuestionCategoryItem";


const QuestionCategoryList = ({category}) => {
    return (
        <FlatList
            data={category}
            renderItem={({item}) => (
                <QuestionCategoryItem categoryItem={item}/>
            )}
            keyExtractor={item => item._id.toString()}
        />
    );
};



export default QuestionCategoryList;