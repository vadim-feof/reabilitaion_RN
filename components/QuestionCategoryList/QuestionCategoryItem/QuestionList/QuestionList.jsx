import React from 'react';
import {Collapse, CollapseBody, CollapseHeader} from "accordion-collapse-react-native";
import {FlatList, Text} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import QuestionItem from "./QuestionItem/QuestionItem";

const QuestionList = ({questionArray, deleteQuestion, idCategory}) => {
    return (
        <FlatList
            data={questionArray}
            renderItem={({item}) => (
                <QuestionItem
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