import {Modal, StyleSheet, Text} from "react-native";
import CustomInput from "../Common/CustomInput/CustomInput";
import CustomButton from "../Common/CustomButton/CustomButton";
import {View} from "react-native";
import {Formik} from 'formik'
import * as yup from 'yup'
import CloseButton from "../Common/Buttons/CloseButton";
import React from "react";
import CustomToast from "../CustomToast";

const ModalAddCategory = ({setVisibleModal, createCategory, visible}) => {

    const validationSchema = yup.object().shape(
        {
            name: yup.string().typeError('Должно быть строкой').required('Обязательно для заполнения'),
        }
    )


    return (
        <Modal visible={visible}
               transparent={true}
               onRequestClose={() => setVisibleModal(false)}
               animationType={'fade'}
        >
            <View style={styles.container}>
                <CustomToast/>
                <View style={styles.wrapper}>
                    <CloseButton color={'#393939'} onPress={() => setVisibleModal(false)}/>
                    <Formik
                        initialValues={{
                            name: '',
                        }}
                        validateOnBlur
                        onSubmit={(values, action) => {
                            createCategory(values.name)
                            action.resetForm() /*чистка формы*/
                            setVisibleModal(isVisible => !isVisible)
                        }}
                        validationSchema={validationSchema}
                    >
                        {({
                              values, errors, touched, dirty,
                              handleChange, handleBlur,
                              handleSubmit,
                          }) => (
                            <View>
                                <CustomInput
                                    placeholder={'Введите название категории'}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                />
                                {touched.name && errors.name && <Text style={styles.error}> {errors.name}</Text>}
                                <CustomButton
                                    text={'Добавить категорию'}
                                    onPress={handleSubmit}
                                />
                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    wrapper: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 5
    },
    error: {
        color: 'red',
        marginLeft: 10,
        marginTop: 5
    },
})

export default ModalAddCategory;