import React from 'react';
import {Collapse, CollapseBody, CollapseHeader} from "accordion-collapse-react-native";
import {FlatList, Text} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import QuestionItem from "./QuestionItem/QuestionItem";

const QuestionList = ({questionArray}) => {
    return (
        <FlatList
            data={questionArray}
            renderItem={({item}) => (
                <QuestionItem
                    questionItem={item}
                />
            )}
            keyExtractor={item => item._id.toString()}
        />
    );
};

export default QuestionList;