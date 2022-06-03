import React from 'react';
import {FlatList} from "react-native";
import QuestionItem from "./QuestionItem/QuestionItem";

const QuestionList = ({adminAccess, questionArray, deleteQuestion, idCategory}) => {
    return (
        <FlatList
            removeClippedSubviews={false}
            data={questionArray}
            renderItem={({item}) => (
                <QuestionItem
                    adminAccess={adminAccess}
                    questionItem={item}
                    deleteQuestion={deleteQuestion}
                    idCategory={idCategory}
                />
            )}
            keyExtractor={item => item._id.toString()}
        />
    );
};

export default QuestionList;