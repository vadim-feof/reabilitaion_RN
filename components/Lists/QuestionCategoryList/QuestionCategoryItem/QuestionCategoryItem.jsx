import React, {useState} from 'react';
import {Collapse, CollapseBody, CollapseHeader} from "accordion-collapse-react-native";
import {Alert, FlatList, StyleSheet, Text, View, Vibration, Modal, Platform} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import QuestionList from "./QuestionList/QuestionList";
import {TouchableHighlight} from "react-native";
import ModalAddCategory from "../../../ModalWindows/ModalAddCategory";
import ModalAddQuestions from "../../../ModalWindows/ModalAddQuestions";

const QuestionCategoryItem = ({adminAccess, categoryItem, deleteCategory, addQuestion, deleteQuestion}) => {

    const [visibleModal, setVisibleModal] = useState(false)

    const openAlert = () => {
        if (!adminAccess)
            return

        Vibration.vibrate(80)
        Alert.alert(
            'Выберите действие',
            '',
            [
                {
                    text: 'Отмена',
                },
                {
                    text: 'Удалить категорию',
                    onPress: confirmDelete
                },
                {
                    text: 'Добавить вопрос',
                    onPress: () => setVisibleModal(isVisible => !isVisible)
                },

            ]
        )
    }

    const confirmDelete = () => {
        Alert.alert(
            'Действительно удалить?',
            '',
            [
                {
                    text: 'Отмена',
                },
                {
                    text: 'Удалить категорию',
                    onPress: () => deleteCategory(categoryItem._id)
                },
            ]
        )
    }

    return (
        <>
            <ModalAddQuestions
                setVisibleModal={setVisibleModal}
                addQuestion={addQuestion}
                idCategory={categoryItem._id}
                visible={visibleModal}
            />
            <Collapse handleLongPress={openAlert}>
                <CollapseHeader>
                    <View style={styles.header}>
                        <Text style={styles.text}>{categoryItem.name}</Text>
                        <AntDesign name="down" size={24} color="black"/>
                    </View>
                </CollapseHeader>


                <CollapseBody>
                    <QuestionList
                        adminAccess={adminAccess}
                        questionArray={categoryItem.questionArray}
                        deleteQuestion={deleteQuestion}
                        idCategory={categoryItem._id}
                    />
                </CollapseBody>
            </Collapse>
        </>
    );
};
const styles = StyleSheet.create({
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
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})
export default QuestionCategoryItem;