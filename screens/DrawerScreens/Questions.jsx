import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Modal} from "react-native";
import {Collapse, CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import {AntDesign} from "@expo/vector-icons";
import {useQuestions} from "../../context/QuestionsContext";
import QuestionCategoryList from "../../components/Lists/QuestionCategoryList/QuestionCategoryList";
import AddButton from "../../components/Common/Buttons/AddButton/AddButton";
import ModalAddCategory from "../../components/ModalWindows/ModalAddCategory";
import {useAuth} from "../../context/AuthContext";
import {checkAdminRole} from "../../utils/checkAdminRole";

// TODO: добавить рефреш и валидаицю полей
const Questions = ({navigation, route}) => {

    const {category, fetchCategory, createCategory, addQuestion, deleteQuestion, deleteCategory,
        isLoading} = useQuestions()

    const [visibleModal, setVisibleModal] = useState(false)

    const {user} = useAuth()

    useEffect(async () => {
        await fetchCategory()
    }, [])

    useLayoutEffect(() => {
        if (checkAdminRole(user.roles)) {
            navigation.setOptions({
                headerRight: ({tintColor}) => <AddButton
                    color={tintColor}
                    navigate={() => setVisibleModal(true)}
                />
            });
        }
        else {
            navigation.setOptions({
                headerRight: null
            });
        }
    }, [navigation, user.roles]);

    return (
        <View style={styles.container}>
            <QuestionCategoryList
                adminAccess={checkAdminRole(user.roles)}
                refresh={fetchCategory}
                isLoading={isLoading}
                category={category}
                deleteCategory={deleteCategory}
                addQuestion={addQuestion}
                deleteQuestion={deleteQuestion}
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