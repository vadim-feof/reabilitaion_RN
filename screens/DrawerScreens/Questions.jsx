import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from "react-native";
import {Collapse, CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import CustomCollapseHeader from "../../components/CustomHeader/CustomCollapseHeader";
import CustomCollapseBody from "../../components/CustomCollapseBody/CustomCollapseBody";

const Questions = () => {

    const [questions, setQuestions] = useState([
        {
            name: '1. Общие вопросы', questionsArray: ['Как нас найти', 'Как записаться на прием',
                'О нашем отделении']
        },
        {
            name: '2. Вопросы по работе отделения', questionsArray: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3']
        },
        {
            name: '3. Вопросы', questionsArray: ['Вопрос 11', 'Вопрос 22', 'Вопрос 33']
        }

    ])

    return (
        <View style={styles.container}>
            {questions.map(question => (
                <Collapse>
                    <CollapseHeader>
                        <CustomCollapseHeader>{question.name}</CustomCollapseHeader>
                    </CollapseHeader>

                    <CollapseBody>
                        {question.questionsArray.map(questionsItem =>
                            <CustomCollapseBody>
                                {questionsItem}
                            </CustomCollapseBody>)}
                    </CollapseBody>
                </Collapse>))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})

export default Questions;