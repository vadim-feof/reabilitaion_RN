import React from 'react';
import {Collapse, CollapseBody, CollapseHeader} from "accordion-collapse-react-native";
import {Alert, StyleSheet, Text, Vibration} from "react-native";
import {AntDesign} from "@expo/vector-icons";

const QuestionItem = ({questionItem, deleteQuestion, idCategory}) => {
    const openAlert = () => {
        Vibration.vibrate(80)
        Alert.alert(
            'Выберите действие',
            '',
            [
                {
                    text: 'Отмена',
                },
                {
                    text: 'Удалить вопрос',
                    onPress: () => deleteQuestion(idCategory,questionItem._id)
                },
            ]
        )
    }

    return (
        <Collapse handleLongPress={openAlert}>
            <CollapseHeader style={styles.header}>
                <Text style={styles.text}>{questionItem.question}</Text>
                <AntDesign name="down" size={24} color="black" style={{marginRight: 25}}/>
            </CollapseHeader>

            <CollapseBody style={styles.body}>
                <Text style={styles.textAnswer}>{questionItem.answer}</Text>
            </CollapseBody>
        </Collapse>
    );
};

const styles = StyleSheet.create({
    header: {
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
    body: {
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
export default QuestionItem;