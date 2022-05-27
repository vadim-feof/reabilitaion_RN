import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Modal} from "react-native";
import {Collapse, CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import {AntDesign} from "@expo/vector-icons";
import {useQuestions} from "../../context/QuestionsContext";
import QuestionCategoryList from "../../components/QuestionCategoryList/QuestionCategoryList";
import AddButton from "../../components/Buttons/AddButton/AddButton";
import ModalAddCategory from "../../components/ModalWindows/ModalAddCategory";

// TODO: сделать модалку не на весь экран
const Questions = ({navigation, route}) => {

    /*const [questions, setQuestions] = useState([
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

    ])*/

    const {category, fetchCategory, createCategory, addQuestion, deleteQuestion, deleteCategory,
        isLoading} = useQuestions()

    const [visibleModal, setVisibleModal] = useState(false)

    useEffect(async () => {
        await fetchCategory()
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => <AddButton
                color={tintColor}
                navigate={() => setVisibleModal(true)}
            />
        });
    }, [navigation]);

    if (category.length === 0)
        return <Text>Загрузка...</Text>

    return (
        <View style={styles.container}>
            <QuestionCategoryList
                category={category}
            />
            <Modal visible={visibleModal}
                   transparent={true}
            >
                <ModalAddCategory
                    setVisibleModal={setVisibleModal}
                    createCategory={createCategory}
                />
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})

export default Questions;