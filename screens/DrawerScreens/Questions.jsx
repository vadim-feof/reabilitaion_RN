import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from "react-native";
import {Collapse, CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import CustomCollapseHeader from "../../components/CustomHeader/CustomCollapseHeader";
import CustomCollapseBody from "../../components/CustomCollapseBody/CustomCollapseBody";
import {AntDesign} from "@expo/vector-icons";

const Questions = () => {

    const [questions, setQuestions] = useState([
        {
            name: '1. Общие вопросы', questionsArray: [{question:'Как нас найти', answer: 'Нас не найти'},
                {question:'Как записаться на прием', answer: 'Никак'},
                {question:'О нашем отделении', answer: 'Круточо'}]
        },
        {
            name: '2. Вопросы по работе отделения',
            questionsArray: [{question: 'Наше отделение', answer: 'описание отделения'},
                {question: 'другой вопрос', answer: 'другой ответ'}]
        },

    ])

    return (
        <View style={styles.container}>
            {questions.map(question => (
                <Collapse>
                    <CollapseHeader style={styles.header}>
                            <Text style={styles.text}>{question.name}</Text>
                            <AntDesign name="down" size={24} color="black" />
                    </CollapseHeader>

                    <CollapseBody>
                        {question.questionsArray.map(questionsItem =>
                            <Collapse>

                                <CollapseHeader style={styles.header2}>
                                    <Text style={styles.text}>{questionsItem.question}</Text>
                                    <AntDesign name="down" size={24} color="black" style={{marginRight: 25}}/>
                                </CollapseHeader>

                                    <CollapseBody style={styles.body}>
                                        <Text style={styles.textAnswer}>{questionsItem.answer}</Text>
                                    </CollapseBody>
                            </Collapse>)}
                    </CollapseBody>
                </Collapse>))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        padding: 10,
        backgroundColor: '#F3F3F3',
        height: 70,
        alignItems: "center",
        justifyContent: "space-between"

    },
    header2: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        padding: 10,
        backgroundColor: '#fffcfc',
        height: 70,
        alignItems: "center",
        justifyContent: "space-between"

    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    body:{
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        padding: 30,
        backgroundColor: '#fff',
        height: 70,
        alignItems: "center",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    textAnswer: {
        fontSize: 20,
    }

})

export default Questions;